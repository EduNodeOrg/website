import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import NavBar from "../NavBar";

import sa from "./stellarassets.png"
import ek from "./keybase_icon_132271.png"
import ec from "./economics.png"
import kelpword from "./img/kelpword.png"
import albedologo from "./albedologo.png"
import security from './cyber-security.png';
import nft from './newnft3.png';
import sc from "./smartcontract.png"
import amm from "./Articles/AMM/AMMs.png"
import suave from "./suave.gif"
import creator from "./Articles/Web3/creator.png"
import docker from "./docker1.png"
import ipfs from "./ipfss.png"
import postgres from "./postgres.png"
import zkpimg from "./Articles/zkp_diagram.png"

const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));

const GlassCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  color: '#b8c5d6',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(123, 47, 247, 0.2)',
  },
  '& .MuiTypography-h5': {
    color: '#ffffff',
    fontWeight: 600,
  },
});

const TagChip = styled(Chip)({
  marginRight: '6px',
  marginTop: '6px',
  color: '#00d4ff',
  borderColor: 'rgba(0, 212, 255, 0.4)',
  background: 'rgba(0, 212, 255, 0.08)',
  fontSize: '0.72rem',
  height: '22px',
});

const gradThumb = (c1, c2, label) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="320" height="240" fill="url(#g)"/><text x="160" y="134" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">${label}</text></svg>`
  )}`;

const featuredPost = {
  title: "A Go Developer's Guide to Stellar",
  date: '27/09/2026',
  description:
    'Payments, smart contracts, and a terminal: send XLM with go-stellar-sdk, script ops with stellar-go-cli, and invoke Soroban contracts from Go.',
  image: gradThumb('#0b3d5c', '#00add8', 'GO + XLM'),
  imageText: 'Stellar Go SDK',
  link: '/blog/build-stellar-apps-with-go',
  tags: ['Go', 'Stellar', 'SDK'],
};

const posts = [
  {
    title: 'AI and Blockchain: Where They Meet',
    date: '27/09/2026',
    description:
      'AI agents with wallets, content provenance, verifiable AI with ZK proofs — and the skills to build at the intersection.',
    image: gradThumb('#6B48FF', '#a06bff', 'AI × WEB3'),
    imageText: 'AI and Blockchain',
    link: '/blog/ai-and-blockchain',
    tags:['AI', 'Web3', 'Trends']
  },
  {
    title: 'What Is DeFi? A Beginner\'s Guide',
    date: '27/09/2026',
    description:
      'Decentralized finance explained: DEXs, AMMs, lending, stablecoins, yield — and how DeFi works on Stellar and Soroban.',
    image: gradThumb('#0a7d5c', '#00c389', 'DEFI'),
    imageText: 'What is DeFi',
    link: '/blog/what-is-defi',
    tags:['DeFi', 'Beginner']
  },
  {
    title: 'Crypto Wallet Security: Seed Phrases & Passkeys',
    date: '27/09/2026',
    description:
      'How not to lose your funds: seed phrase hygiene, passkeys, multi-sig, and the phishing attacks that drain wallets.',
    image: gradThumb('#7a0c0c', '#e63946', 'SECURITY'),
    imageText: 'Crypto Wallet Security',
    link: '/blog/crypto-wallet-security',
    tags:['Security', 'Wallet']
  },
  {
    title: 'How to Become a Blockchain Developer in 2026',
    date: '25/09/2026',
    description:
      'A complete step-by-step roadmap: programming fundamentals, smart contracts, dApps, security, and your first Web3 job.',
    image: gradThumb('#3a2a8f', '#6B48FF', 'ROADMAP'),
    imageText: 'Blockchain Developer Roadmap',
    link: '/blog/blockchain-developer-roadmap',
    tags:['Web3', 'Career']
  },
  {
    title: 'What Is a Stablecoin? USDC on Stellar Explained',
    date: '25/09/2026',
    description:
      'How fiat-backed, crypto-collateralized, and algorithmic stablecoins work — and why USDC on Stellar powers global payments.',
    image: gradThumb('#0a7d5c', '#00c389', 'USDC'),
    imageText: 'Stablecoins on Stellar',
    link: '/blog/what-is-a-stablecoin',
    tags:['Stablecoin', 'USDC', 'Stellar']
  },
  {
    title: 'Real-World Asset (RWA) Tokenization Explained',
    date: '25/09/2026',
    description:
      'How treasuries, real estate, and gold move on-chain — and why Stellar leads institutional asset tokenization.',
    image: gradThumb('#8a5a00', '#f0b429', 'RWA'),
    imageText: 'RWA Tokenization',
    link: '/blog/rwa-tokenization',
    tags:['RWA', 'Tokenization', 'Stellar']
  },
  {
    title: 'Top 10 Smart Contract Security Vulnerabilities',
    date: '25/09/2026',
    description:
      'Reentrancy, oracle manipulation, flash loans and more — the bug classes behind billions in exploits and how to prevent them.',
    image: gradThumb('#7a0c0c', '#e63946', 'SECURITY'),
    imageText: 'Smart Contract Security',
    link: '/blog/smart-contract-security-vulnerabilities',
    tags:['Security', 'Smart Contracts']
  },
  {
    title: 'Freighter Wallet: Setup & User Guide',
    date: '25/09/2026',
    description:
      'Set up Stellar\'s most popular wallet: install, back up your recovery phrase, add trustlines, and connect to Soroban dApps.',
    image: gradThumb('#0466c8', '#48cae4', 'FREIGHTER'),
    imageText: 'Freighter Wallet',
    link: '/blog/freighter-wallet',
    tags:['Freighter', 'Wallet', 'Stellar']
  },
  {
    title: 'Zero-Knowledge Proofs on the Stellar Network',
    date: '27/05/2026',
    description:
      'Explore Zero-Knowledge Proofs on Stellar for enhanced privacy, scalability, and interoperability in financial applications.',
    image: zkpimg,
    imageText: 'Zero-Knowledge Proofs',
    link: '/blog/zero-knowledge-proofs',
    tags:['ZKP', 'Privacy', 'Stellar']
  },
  {
    title: 'Learn about PostgreSQL',
    date: '09/05/2023',
    description:
      'Learn about PostgreSQL, and how to use it in Blockchain applications .',
    image:postgres,
    imageText: 'Learn about PostgreSQL, and how to use it in Blockchain applications',
    link: '/blog/postgresql',
    tags:['PostgreSQL']
  },
  {
    title: 'Learn about IPFS',
    date: '13/04/2023',
    description:
      'Learn about IPFS, what are the most popular applications, and how you can use it to store images .',
    image:ipfs,
    imageText: 'Learn about IPFS, what are the most popular applications, and how you can use it to store images',
    link: '/blog/ipfs',
    tags:['IPFS']
  },
  {
    title: 'Learn about Docker',
    date: '28/03/2023',
    description:
      'Learn about Docker, what are the most popular applications, and how you can apply it in Blockchain .',
    image: docker,
    imageText: 'Learn about Docker and how to apply it in Blockchain',
    link: '/blog/docker',
    tags:['Docker']
  },
  {
    title: 'The Web3 Revolution And The New Creator Economy',
    date: '12/08/2022',
    description:
      'Before we can actually understand what Web3.0 means, it is essential to understand what Web1.0 and Web2.0 are.',
    image: creator,
    imageText: 'Learn about Blockchain and how to apply it to your day-to-day business life',
    link: '/blog/the-web3-revolution',
    tags:['Web3']
  },
  {
    title: 'Learn about Blockchain',
    date: '17/05/2022',
    description:
      'Learn about Blockchain, what are the most popular applications, and how you can apply them to make your day-to-day activities easier.',
    image: suave,
    imageText: 'Learn about Blockchain and how to apply it to your day-to-day business life',
    link: '/blog/learn-about-blockchain',
    tags:['Blockchain']
  },
  {
    title: 'DeFi Explained: What is an Automated Market Maker?',
    date: '13/12/2021',
    description:
      'What are AMMs? Why are they useful? And how they are being used in decentralized finance.',
    image: amm,
    imageText: 'DeFi Explained: What is an Automated Market Maker?',
    link: '/blog/automated-market-maker',
    tags:['AMM']
  },
  {
    title: 'What are Smart Contracts?',
    date: '26/07/2021',
    description:
      'In the following blog post, we will talk about them, its early days, and how you can get started building SCs on Stellar.',
    image: sc,
    imageText: 'Smart Contracts',
    link: '/blog/smart-contracts',
    tags:['Smart Contracts']
  },
  {
    title: 'What are NFTs and how to mint them using the Stellar Network?',
    date: '09/06/2021',
    description:
      'Have you ever of NFTs? I would say probably, it is right now all over the internet',
    image: nft,
    imageText: 'NFTs on Stellar',
    link: '/blog/minting-nfts',
    tags:['NFT']
  },
  {
    title: 'How to keep your lumens safe.',
    date: '08/12/2020',
    description:
      'Trying to keep your lumens safe is one of the challenges that cryptocurrencies face right now and the Stellar Ecosystem is not the exception.',
    image: security,
    imageText: 'Tips and Security tools',
    link: '/blog/security-tools',
    tags:['Stellar']
  },
  {
    title: 'Identity verification with Albedo',
    date: '09/10/2020',
    description:
      'Albedo allows other Stellar apps to request transaction signing or identity verification without ever exposing your secret key.',
    image: albedologo,
    imageText: 'Albedo',
    link: '/blog/albedo',
    tags:['Albedo']
  },
  {
    title: 'Kelp: Setup your first trading bot',
    date: '03/09/2020',
    description:
      'Kelp is a free and open-source trading bot that supports the SDEX and 100+ centralized exchanges',
    image: kelpword,
    imageText: 'Kelp',
    link: '/blog/kelp',
    tags:['Kelp']
  },
  {
    title: 'Stellarnomics',
    date: '14/06/2020',
    description:
      'Monetary aspects of the Stellar Consensus Protocol and its steps towards decentralization',
    image: ec,
    imageText: 'Stellarnomics',
    link: '/blog/Stellarnomics',
    tags:['Stellarnomics','Stellar']
  },
  {
    title: 'What is Keybase?',
    date: '23/05/2020',
    description:
      'Keybase is the best privacy-focused messaging app with a native integration of the Stellar network.',
    image: ek,
    imageText: 'Keybase',
    link: '/blog/What-is-Keybase',
    tags:['Keybase']
  },
  {
    title: 'How to issue an asset on Stellar',
    date: '14/05/2020',
    description:
      'Here you will learn how to issue an asset on the Stellar Network using the Stellar Laboratory.',
    image: sa,
    imageText: 'Image Text',
    link: '/blog/How-to-issue',
    tags:['Stellar']
  },
];

function PostCard({ post }) {
  return (
    <GlassCard>
      <CardMedia
        sx={{ paddingTop: '56.25%' }}
        image={post.image}
        title={post.imageText}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography variant="caption" sx={{ color: '#7b8ba1' }}>
          {post.date}
        </Typography>
        <Typography sx={{ color: '#b8c5d6', mt: 1 }}>
          {post.description}
        </Typography>
        <Box>
          {post.tags.map(tag => (
            <TagChip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" href={post.link} sx={{ color: '#00d4ff' }}>
          Read More
        </Button>
      </CardActions>
    </GlassCard>
  );
}

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>EduNode Blog — Blockchain, Stellar & Web3 Articles</title>
        <link rel="canonical" href="https://edunode.org/blog" />
        <meta name="description" content="Articles and tutorials on blockchain, Stellar, Soroban, DeFi, and Web3 development from the EduNode team." />
        <meta property="og:title" content="EduNode Blog" />
        <meta property="og:description" content="Articles and tutorials on blockchain, Stellar, Soroban, DeFi, and Web3 development." />
        <meta property="og:url" content="https://edunode.org/blog" />
      </Helmet>
      <NavBar />
      <PageContainer>
        <main>
          <Box sx={{ pt: 8, pb: 4, textAlign: 'center' }}>
            <Container maxWidth="sm">
              <SectionTitle variant="h3">
                EduNode Blog
              </SectionTitle>
              <Typography variant="h6" sx={{ color: '#b8c5d6' }}>
                Articles and tutorials on blockchain, Stellar, DeFi, and Web3 development.
              </Typography>
            </Container>
          </Box>

          <Container sx={{ pb: 10 }} maxWidth="lg">
            {/* Featured article */}
            <GlassCard sx={{ mb: 6 }}>
              <Grid container>
                <Grid item xs={12} md={5}>
                  <CardMedia
                    sx={{ height: '100%', minHeight: { xs: 200, md: 280 } }}
                    image={featuredPost.image}
                    title={featuredPost.imageText}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="overline" sx={{ color: '#00d4ff', letterSpacing: 2 }}>
                      Featured — {featuredPost.date}
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ color: '#ffffff', fontWeight: 600, mt: 1 }}>
                      {featuredPost.title}
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6', mt: 2 }}>
                      {featuredPost.description}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {featuredPost.tags.map(tag => (
                        <TagChip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ px: 4, pb: 3 }}>
                    <Button href={featuredPost.link} variant="contained" sx={{ background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)', color: 'white' }}>
                      Read Article
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </GlassCard>

            {/* All articles */}
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.title}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </PageContainer>
    </>
  );
}
