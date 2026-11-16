// Client-side certificate PDFs. Masterclass/pro-course completion records are
// generated locally (progress lives in the browser) — they are completion
// records, not server-verifiable credentials like the backend-issued diplomas.
import { jsPDF } from 'jspdf';

const NAVY = [11, 18, 32];
const PANEL = [18, 30, 48];
const ACCENT = [119, 217, 187];
const TEXT = [238, 244, 252];
const MUTED = [169, 183, 203];

const PAGE_W = 297;
const PAGE_H = 210;

function basePage(doc) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(1.2);
  doc.rect(10, 10, PAGE_W - 20, PAGE_H - 20);
  doc.setLineWidth(0.3);
  doc.rect(13, 13, PAGE_W - 26, PAGE_H - 26);
}

function wordmark(doc, y) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...ACCENT);
  doc.text('EDUNODE', PAGE_W / 2, y, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text('edunode.org', PAGE_W / 2, y + 7, { align: 'center' });
}

function centeredLines(doc, text, y, maxWidth) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, PAGE_W / 2, y, { align: 'center' });
  return y + lines.length * (doc.getFontSize() * 0.45);
}

export function downloadCompletionCertificate({ name, courseTitle, detail, slug }) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  basePage(doc);
  wordmark(doc, 34);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(27);
  doc.setTextColor(...TEXT);
  doc.text('Certificate of Completion', PAGE_W / 2, 58, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  doc.text('This certifies that', PAGE_W / 2, 76, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...ACCENT);
  const afterName = centeredLines(doc, name || 'EduNode Learner', 90, 220);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  doc.text('has completed the masterclass', PAGE_W / 2, afterName + 10, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...TEXT);
  const afterCourse = centeredLines(doc, courseTitle, afterName + 20, 230);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  if (detail) doc.text(detail, PAGE_W / 2, afterCourse + 8, { align: 'center' });

  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = `EN-${(crypto.randomUUID ? crypto.randomUUID() : String(Date.now())).slice(0, 8).toUpperCase()}`;

  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.text(`Date: ${date}`, 45, 178);
  doc.text(`Certificate ID: ${certId}`, 45, 186);
  doc.setDrawColor(...ACCENT);
  doc.line(190, 184, 252, 184);
  doc.setTextColor(...MUTED);
  doc.text('Olvis Gil, Founder', 221, 190, { align: 'center' });

  doc.setFontSize(8);
  doc.text('Certificate of completion based on the learner\u2019s recorded progress at edunode.org.', PAGE_W / 2, 198, { align: 'center' });

  doc.save(`edunode-${slug || 'course'}-certificate.pdf`);
}

async function imageToDataUrl(url) {
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function downloadIssuedCertificate({ certificateNumber, imageUrl, verificationUrl, qrDataUrl }) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  basePage(doc);
  wordmark(doc, 30);

  let embedded = false;
  if (imageUrl) {
    try {
      const dataUrl = await imageToDataUrl(imageUrl);
      const props = doc.getImageProperties(dataUrl);
      const ratio = props.width / props.height;
      let w = 150;
      let h = w / ratio;
      if (h > 125) { h = 125; w = h * ratio; }
      doc.addImage(dataUrl, props.fileType || 'JPEG', 22, (PAGE_H - h) / 2, w, h);
      embedded = true;
    } catch {
      embedded = false;
    }
  }

  const x = embedded ? 185 : PAGE_W / 2;
  const align = embedded ? 'center' : 'center';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(embedded ? 20 : 26);
  doc.setTextColor(...TEXT);
  doc.text('EduNode Certificate', x, 70, { align });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  doc.text(`Certificate #${certificateNumber}`, x, 84, { align });
  doc.setFontSize(9);
  const lines = doc.splitTextToSize(`Verify this credential at ${verificationUrl}`, embedded ? 95 : 200);
  doc.text(lines, x, 96, { align });

  if (qrDataUrl) {
    try { doc.addImage(qrDataUrl, 'PNG', x - 16, 118, 32, 32); } catch { /* non-critical */ }
  }

  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('Issued by EduNode — blockchain-anchored credential on Stellar.', PAGE_W / 2, 198, { align: 'center' });

  doc.save(`edunode-certificate-${certificateNumber}.pdf`);
}
