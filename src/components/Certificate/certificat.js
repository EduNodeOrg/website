import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { useLocation, useParams } from 'react-router-dom';
import Certificate from './index';
import QRCode from 'qrcode';
import {
  FacebookShareCount,
  RedditShareCount,
  TumblrShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
} from "react-share";
import axios from 'axios';
import { Helmet } from 'react-helmet-async'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ModernNavbar from '../Dashboard/layout/ModernNavbar';

// Helper function to truncate long strings
const truncateString = (str, maxLength = 30) => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

// Helper function to copy to clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // You could add a toast notification here
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

// Modern styled components matching dashboard theme
const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(123, 47, 247, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
}));

const CertificateDisplayCard = styled(Card)(({ theme }) => ({
  background: 'rgba(26, 31, 58, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(123, 47, 247, 0.3)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: '0 auto',
}));

const CertificateTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const CertificateText = styled(Typography)(({ theme }) => ({
  color: '#b8c5d6',
  marginBottom: theme.spacing(2),
  fontSize: '1.1rem',
}));

const ShareButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
  color: '#ffffff',
  fontWeight: 'bold',
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(123, 47, 247, 0.4)',
  },
}));

const FloatingParticle = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  width: '4px',
  height: '4px',
  background: 'rgba(123, 47, 247, 0.6)',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(123, 47, 247, 0.8)',
  pointerEvents: 'none',
  zIndex: 0,
}));

const TruncatedTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  flexWrap: 'wrap',
}));

const TruncatedText = styled(Typography)(({ theme }) => ({
  color: '#b8c5d6',
  fontFamily: 'monospace',
  fontSize: '0.9rem',
  wordBreak: 'break-all',
  flex: 1,
  minWidth: 0,
}));

const CopyButton = styled(IconButton)(({ theme }) => ({
  color: '#00d4ff',
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    color: '#ffffff',
  },
}));

const metaDecorator = require("./metaDecorator.json");

function Certificat() {
  const { certificateNumber } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [qrCode, setQRCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = "E-certification "
  const stellarLab = "https://horizon-futurenet.stellar.org/accounts/?sponsor=GC4MEJJJMNIBIDZSJOZOPVUQQUKR3AARFLPFYKUFXU2D7PHWJP5S4AEI"
  const shareUrl = `https://edunode.org/certificates/${certificateNumber}`;
  const theme = useTheme();
  
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://edunode.herokuapp.com/api/certificates/cert/${certificateNumber}`, {
          timeout: 10000 // 10 second timeout
        });
        
        if (!response.data) {
          throw new Error('No certificate data received');
        }
        
        setCertificate(response.data);
        
        // Generate QR code
        try {
          const qrCodeDataURL = await QRCode.toDataURL(shareUrl);
          setQRCode(qrCodeDataURL);
        } catch (qrError) {
          console.error('Error generating QR code:', qrError);
          // Continue without QR code if generation fails
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
        setError(error.response?.data?.message || 'Failed to load certificate. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (certificateNumber) {
      fetchCertificate();
    } else {
      setError('No certificate number provided');
      setLoading(false);
    }
  }, [certificateNumber, shareUrl]);

  if (loading) {
    return (
      <DashboardContainer>
        <ModernNavbar />
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '4rem 0' }}
          >
            <CircularProgress sx={{ color: '#7b2ff7', mb: 2 }} />
            <CertificateText>Loading your certificate...</CertificateText>
          </motion.div>
        </ContentContainer>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <ModernNavbar />
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '4rem 0' }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 60, color: '#ff4444', mb: 2 }} />
            <CertificateTitle variant="h3">Error Loading Certificate</CertificateTitle>
            <CertificateText>{error}</CertificateText>
            <ShareButton 
              onClick={() => window.location.reload()}
              sx={{ mt: 2 }}
            >
              Try Again
            </ShareButton>
            <CertificateText sx={{ mt: 2 }}>
              If problem persists, please contact support.
            </CertificateText>
          </motion.div>
        </ContentContainer>
      </DashboardContainer>
    );
  }
  
  if (!certificate) {
    return (
      <DashboardContainer>
        <ModernNavbar />
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '4rem 0' }}
          >
            <CertificateText>No certificate data available.</CertificateText>
          </motion.div>
        </ContentContainer>
      </DashboardContainer>
    );
  }
  
  const { cid, distributorPublicKey, issuerPublicKey } = certificate;
  const ciid = cid ? `https://${cid}.ipfs.w3s.link/newdiplomav2.jpg` : '';
  
  return (
    <DashboardContainer>
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <ModernNavbar />

      <MetaTags>
        <meta property="og:image" content={ciid} />
      </MetaTags>

      <Helmet>
        <title>E-Certification</title>
        <meta name="description" content='E-certification' />
        <meta property="og:image" content={ciid} />
        <meta
          property="og:url"
          content={metaDecorator.hostname + window.location.pathname + window.location.search}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metaDecorator.twitterUsername} />
        <link rel="canonical" href={shareUrl} />
      </Helmet>

      <ContentContainer maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CertificateTitle variant="h2" component="h1">
            Certificate Verification
          </CertificateTitle>

          <CertificateDisplayCard>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              gap: 4, 
              alignItems: 'flex-start',
              minHeight: 300
            }}>
              {/* Certificate Information */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <CertificateText variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Certificate Information:
                </CertificateText>
                <CertificateText>
                  Certificate #: {certificateNumber}
                </CertificateText>
                
                <TruncatedTextContainer>
                  <CertificateText sx={{ fontWeight: 'bold' }}>
                    Distributor Public Key:
                  </CertificateText>
                  <TruncatedText>
                    {truncateString(distributorPublicKey, 40)}
                  </TruncatedText>
                  <Tooltip title="Copy full key">
                    <CopyButton 
                      size="small"
                      onClick={() => copyToClipboard(distributorPublicKey)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </CopyButton>
                  </Tooltip>
                </TruncatedTextContainer>

                <TruncatedTextContainer>
                  <CertificateText sx={{ fontWeight: 'bold' }}>
                    Issuer Public Key:
                  </CertificateText>
                  <TruncatedText>
                    {truncateString(issuerPublicKey, 40)}
                  </TruncatedText>
                  <Tooltip title="Copy full key">
                    <CopyButton 
                      size="small"
                      onClick={() => copyToClipboard(issuerPublicKey)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </CopyButton>
                  </Tooltip>
                </TruncatedTextContainer>

                <TruncatedTextContainer>
                  <CertificateText sx={{ fontWeight: 'bold' }}>
                    IPFS CID:
                  </CertificateText>
                  <TruncatedText>
                    {truncateString(cid, 50)}
                  </TruncatedText>
                  <Tooltip title="Copy full CID">
                    <CopyButton 
                      size="small"
                      onClick={() => copyToClipboard(cid)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </CopyButton>
                  </Tooltip>
                  <Box
                    component="a"
                    href={`https://copper-deliberate-hippopotamus-402.mypinata.cloud/ipfs/${cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      color: '#00d4ff', 
                      textDecoration: 'none', 
                      '&:hover': { textDecoration: 'underline' },
                      fontSize: '0.8rem',
                      ml: 1
                    }}
                  >
                    View Full
                  </Box>
                </TruncatedTextContainer>
                
                <ShareButton 
                  href={`https://horizon-futurenet.stellar.org/accounts/?sponsor=${issuerPublicKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
                >
                  Verify on Stellar Laboratory
                </ShareButton>
              </Box>

              {/* QR Code */}
              <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
                <CertificateText variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  QR Code
                </CertificateText>
                <Box
                  component="img"
                  src={qrCode}
                  alt="Certificate QR Code"
                  sx={{ 
                    width: 200, 
                    height: 'auto',
                    minWidth: 200,
                    border: '2px solid rgba(123, 47, 247, 0.3)',
                    borderRadius: 2,
                    padding: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </Box>
            </Box>
          </CertificateDisplayCard>

          {/* Share Section */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <CertificateTitle variant="h4" component="h2" sx={{ mb: 3 }}>
              Share Your Certification
            </CertificateTitle>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
              <FacebookShareButton url={shareUrl} quote={title}>
                <ShareButton startIcon={<FacebookIcon size={24} />}>Facebook</ShareButton>
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <ShareButton startIcon={<TwitterIcon size={24} />}>Twitter</ShareButton>
              </TwitterShareButton>

              <TelegramShareButton url={shareUrl} title={title}>
                <ShareButton startIcon={<TelegramIcon size={24} />}>Telegram</ShareButton>
              </TelegramShareButton>

              <WhatsappShareButton url={shareUrl} title={title}>
                <ShareButton startIcon={<WhatsappIcon size={24} />}>WhatsApp</ShareButton>
              </WhatsappShareButton>

              <LinkedinShareButton url={shareUrl}>
                <ShareButton startIcon={<LinkedinIcon size={24} />}>LinkedIn</ShareButton>
              </LinkedinShareButton>

              <RedditShareButton url={shareUrl} title={title}>
                <ShareButton startIcon={<RedditIcon size={24} />}>Reddit</ShareButton>
              </RedditShareButton>

              <EmailShareButton url={shareUrl} subject={title} body="Check out my certificate!">
                <ShareButton startIcon={<EmailIcon size={24} />}>Email</ShareButton>
              </EmailShareButton>
            </Box>
          </Box>

          {/* Certificate Image */}
          {cid && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <CertificateTitle variant="h5" component="h3" sx={{ mb: 2 }}>
                Certificate Image
              </CertificateTitle>
              <Box
                component="img"
                src={`https://copper-deliberate-hippopotamus-402.mypinata.cloud/ipfs/${cid}`}
                alt="Certificate"
                sx={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  maxHeight: 600,
                  border: '2px solid rgba(123, 47, 247, 0.3)',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              />
            </Box>
          )}
        </motion.div>
      </ContentContainer>
    </DashboardContainer>
  );
};

export default Certificat;
