import React from 'react';
import { Helmet } from 'react-helmet-async';
import TopicPage from './TopicPage';

const shareUrl = 'https://edunode.org/ai';
const title = 'Learn AI: Master the Assistants Reshaping Work';
const description = 'Your AI learning hub: hands-on masterclasses for ChatGPT, Claude, Gemini, DeepSeek, Kimi, GLM, Devin, and Jev AI — plus prompting fundamentals and workflow guides.';
const image = 'https://edunode.org/og/ai.png';
const accent = 'linear-gradient(135deg, #141414 0%, #0f5a52 55%, #10a37f 100%)';

const sections = [
  {
    heading: 'AI assistant masterclasses',
    blurb: 'A structured 10-lesson path for each assistant — first two lessons free.',
    links: [
      { href: '/masterclasses/chatgpt-essentials', title: 'ChatGPT Essentials', desc: 'OpenAI’s flagship assistant: setup, prompting, custom GPTs, and real workflows.' },
      { href: '/masterclasses/claude-mastery', title: 'Claude Mastery', desc: 'Anthropic’s assistant for long documents, careful analysis, and coding help.' },
      { href: '/masterclasses/gemini-essentials', title: 'Gemini Essentials', desc: 'Google’s AI: multimodal skills, Workspace integration, and research workflows.' },
      { href: '/masterclasses/deepseek-practice', title: 'DeepSeek in Practice', desc: 'The open-weights reasoning model: prompting, reasoning mode, and API basics.' },
      { href: '/masterclasses/kimi-in-practice', title: 'Kimi in Practice', desc: 'Moonshot’s long-context assistant for documents, research, and agents.' },
      { href: '/masterclasses/glm-in-practice', title: 'GLM in Practice', desc: 'Zhipu AI’s ChatGLM family — bilingual strengths and everyday use.' },
      { href: '/masterclasses/devin-for-developers', title: 'Devin for Developers', desc: 'Cognition’s autonomous engineer: scoping tasks, reviewing output, shipping faster.' },
      { href: '/masterclasses/jev-system-one-models', title: 'Jev & System One Models', desc: 'TypeSafe AI’s decision models — typed, calibrated outputs for automation inside your code.' },
      { href: '/masterclasses/ai-workflow-automation', title: 'AI Workflow Automation with n8n', desc: 'Connect assistants to real automations: triggers, branches, human review.' },
    ],
  },
  {
    heading: 'Foundations that transfer',
    blurb: 'Skills that work across every assistant you will ever use.',
    links: [
      { href: '/masterclasses/zero-knowledge-proofs', title: 'Zero-Knowledge Proofs', desc: 'The cryptography behind private verification — where AI and Web3 meet.' },
      { href: '/blog/ai-and-blockchain', title: 'AI and Blockchain', desc: 'How artificial intelligence meets Web3 — data, agents, and on-chain automation.' },
      { href: '/masterclasses/python-automation', title: 'Python Automation', desc: 'The programming skill that makes every AI tool more useful.' },
    ],
  },
];

const faqs = [
  {
    q: 'Which AI assistant should I learn first?',
    a: 'Start with the one your team or workflow already uses — ChatGPT for breadth, Claude for documents and code, Gemini inside Google Workspace, DeepSeek or Kimi for open models and long contexts. The prompting fundamentals in each class transfer between all of them.',
  },
  {
    q: 'Do I need to pay for these AI tools?',
    a: 'Every class teaches with free tiers where they exist. Some advanced features (API access, larger contexts, agents) may require paid plans from the providers — the lessons note exactly where.',
  },
  {
    q: 'Do I need programming experience?',
    a: 'No for the assistant classes — they teach usage and workflows. Devin for Developers assumes you can read code since it reviews AI-generated changes.',
  },
];

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  description,
  url: shareUrl,
  isPartOf: { '@type': 'WebSite', name: 'EduNode', url: 'https://edunode.org' },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Ai() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={shareUrl} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>
      <TopicPage
        accent={accent}
        eyebrow="EduNode Topic Hub"
        title="Learn AI: Master the Assistants Reshaping Work"
        lead="ChatGPT, Claude, Gemini, DeepSeek, Kimi, GLM, Devin, Jev AI — a masterclass for each, teaching prompting, features, and real workflows from first prompt to power user."
        sections={sections}
        faqs={faqs}
      />
    </>
  );
}
