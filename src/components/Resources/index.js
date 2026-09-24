import React from "react";
import "./style.css";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardContent } from '@mui/material';
import { CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import NavBar from "../NavBar";
import kicon from "./keybaseicon.png"
import { Helmet } from 'react-helmet';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
});

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
  '& .MuiTypography-h4': {
    color: '#ffffff',
    fontWeight: 600,
  },
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
}));


function Resources() {
  const shareUrl = 'https://edunode.org/resources';
  const title = 'Resources';
 
  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href={shareUrl} />
          <meta
            name="title"
            content="What are NFTs and how to mint them using the Stellar Network"
          />
          <meta
            name="description"
            content="Have you ever of NFTs? I would say probably, it is right now all over the internet"
          />
        </Helmet>
      <NavBar />
      <PageContainer>
        <main>
          <Box sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
            <Container maxWidth="sm">
              <SectionTitle variant="h3">
                Developer Resources
              </SectionTitle>
              <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 4 }}>
                Community tools, documentation, and learning resources for Web3 and Stellar developers.
              </Typography>
              <Button
                variant="contained"
                href="https://www.stellar.org/developers"
                target="_blank"
                rel="noopener"
                sx={{
                  background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  px: 4,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
                  },
                }}
              >
                Learn more
              </Button>
            </Container>
          </Box>
          <Container sx={{ pt: 4, pb: 8 }} maxWidth="lg">
            {/* End heo unit */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellarlogo1.png')}
                    title="Dev Google Group"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                      API Reference
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      Horizon is the client-facing API server for the
                      Stellar ecosystem. It acts as the interface
                      between Stellar Core and applications that want
                      to access the Stellar network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href="https://www.stellar.org/developers/reference/"
                      target="_blank"
                      rel="noopener"
                      sx={{ color: '#00d4ff' }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/googlegroups1.png')}
                    title="Dev Google Group"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Dev Google Group
                    </Typography>
                    <Typography>
                      This group is here to discuss Core Advancement
                      Proposals (CAPs) and Stellar Ecosystem Proposals
                      (SEPs), and to talk about development of
                      stellar-core, Horizon, and the rest of the
                      Stellar platform.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://groups.google.com/forum/#!forum/stellar-dev"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/ser.png')}
                    title="Stellar StackExchange"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar StackExchange
                    </Typography>
                    <Typography>
                      Stellar Stack Exchange is a question and answer
                      site for developers and users of Stellar and the
                      Stellar Distributed Exchange.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellar.stackexchange.com/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/gtr.png')}
                    title="GalacticTalk"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      GalacticTalk
                    </Typography>
                    <Typography>
                      We are a community of Stellar users, developers
                      and traders. Join us in our mission of spreading
                      financial inclusion globally.
                    </Typography>
                    <br></br>
                    <a href="https://keybase.io/team/galactictalk">
                      <img src={kicon} height={25} width={25} alt="Keybase icon" />
                    </a>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://groups.google.com/forum/#!forum/stellar-dev"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellarlogo1.png')}
                    title=" Dev Guides"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Dev Guides
                    </Typography>
                    <Typography>
                      These guides are designed to help you learn more
                      about the technical aspects of integrating
                      Stellar into your application or service, from
                      the very basics to more detailed topics like
                      submitting transactions at a high rate with
                      channels.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://www.stellar.org/developers/guides/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stexr.png')}
                    title="Stellar.Expert"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar.Expert
                    </Typography>
                    <Typography>
                      Ledger explorer and analytics platform for
                      Stellar Network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellar.expert/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellarterm1.png')}
                    title="StellarTerm"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      StellarTerm
                    </Typography>
                    <Typography>
                      Open source client for the Stellar network.
                      Send, receive, and trade assets on the Stellar
                      network
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellarterm.com/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellarlogo1.png')}
                    title="Stellar Laboratory"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Laboratory
                    </Typography>
                    <Typography>
                      The laboratory can build transactions, sign
                      them, and submit them to the network. It can
                      also make requests to any of the Horizon
                      endpoints.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://www.stellar.org/laboratory"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellarguard.PNG')}
                    title="StellarGuard"
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      StellarGuard
                    </Typography>
                    <Typography>
                      Security for your Stellar account
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellarguard.me/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/albedo.png')}
                    title="Albedo"
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Albedo
                    </Typography>
                    <Typography>
                      Single access point to Stellar universe
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://albedo.link/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellarquest.jpg')}
                    title="Stellar Quest"
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Quest
                    </Typography>
                    <Typography>
                      Learn Stellar, win prizes!
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://quest.stellar.org/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/rabet.jpeg')}
                    title="rabet"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Rabet
                    </Typography>
                    <Typography>
                      A Bridge Between Web3 And The Stellar Network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://rabet.io/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-go-cli.png')}
                    title="Stellar Go CLI"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Go CLI
                    </Typography>
                    <Typography>
                      A command-line interface for interacting with
                      the Stellar network, written in Go.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://github.com/stellar-go-cli/stellar-go-cli"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-wallets-kit.png')}
                    title="Stellar Wallets Kit"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Wallets Kit
                    </Typography>
                    <Typography>
                      A kit to handle all Stellar wallets at once
                      with a simple API.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellarwalletskit.dev/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/freighter.png')}
                    title="Freighter"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Freighter
                    </Typography>
                    <Typography>
                      A non-custodial Stellar wallet extension for
                      your browser.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://freighter.app/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/openzeppelin-stellar.jpg')}
                    title="OpenZeppelin for Stellar"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      OpenZeppelin for Stellar
                    </Typography>
                    <Typography>
                      Secure, audited smart contract libraries and
                      tools for building on Stellar and Soroban.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://www.openzeppelin.com/networks/stellar"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/xbull.png')}
                    title="xBull Wallet"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      xBull Wallet
                    </Typography>
                    <Typography>
                      A powerful Stellar wallet for web and mobile.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://wallet.xbull.app/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-disbursement-platform.png')}
                    title="Stellar Disbursement Platform"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Disbursement Platform
                    </Typography>
                    <Typography>
                      A platform for organizations to send bulk
                      payments and mass disbursements on Stellar.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellar.org/products-and-tools/disbursement-platform"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>
            </Grid>
          </Container>

          <Container sx={{ pt: 8, pb: 8 }} maxWidth="lg">
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
              Public Good Projects
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/solang.png')}
                    title="Hyperledger Solang"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Hyperledger Solang
                    </Typography>
                    <Typography>
                      A Solidity compiler targeting Soroban, Solana,
                      and Polkadot.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://solang.io/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/obsrvr-radar.png')}
                    title="OBSRVR Radar"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      OBSRVR Radar
                    </Typography>
                    <Typography>
                      Network monitoring and observability for the
                      Stellar network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://radar.withobsrvr.com"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/opengrants.png')}
                    title="OpenGrants"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      OpenGrants
                    </Typography>
                    <Typography>
                      An open platform and data standard for grants
                      in the Stellar ecosystem.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://opengrants.daostar.org/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/refractorspace.png')}
                    title="RefractorSpace"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      RefractorSpace
                    </Typography>
                    <Typography>
                      Transaction coordination and multisig signing
                      service for Stellar.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://refractor.space"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/scout.jpg')}
                    title="Scout"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Scout
                    </Typography>
                    <Typography>
                      Open-source static analysis tool for Soroban
                      smart contract security.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://www.coinfabrik.com/products/scout/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-net-sdk.png')}
                    title="Stellar .NET SDK"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar .NET SDK
                    </Typography>
                    <Typography>
                      A .NET SDK for building applications on the
                      Stellar network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://beans-bv.github.io/dotnet-stellar-sdk/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-hardware-wallet.png')}
                    title="Stellar Hardware Wallet Support"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Hardware Wallet Support
                    </Typography>
                    <Typography>
                      Ledger and Trezor hardware wallet support for
                      Stellar accounts.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://lightsail.network"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-registry.png')}
                    title="Stellar Registry"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Registry
                    </Typography>
                    <Typography>
                      A registry of verified smart contracts on
                      Stellar.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://rgstry.xyz"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-scaffold.png')}
                    title="Stellar Scaffold"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Scaffold
                    </Typography>
                    <Typography>
                      A CLI and toolkit for scaffolding Stellar dApps.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://scaffoldstellar.org/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-security-portal.png')}
                    title="Stellar Security Portal"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Security Portal
                    </Typography>
                    <Typography>
                      A hub of security resources and tools for
                      Soroban developers.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://sorobansecurity.com/"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellarchain.jpg')}
                    title="StellarChain"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      StellarChain
                    </Typography>
                    <Typography>
                      A fast and intuitive explorer for the Stellar
                      blockchain.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellarchain.io"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellarlight.png')}
                    title="Stellarlight"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellarlight
                    </Typography>
                    <Typography>
                      A discovery platform for projects in the Stellar
                      ecosystem.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellarlight.xyz"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/tansu.png')}
                    title="Tansu"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Tansu
                    </Typography>
                    <Typography>
                      Decentralized project governance on Stellar.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://tansu.dev"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/java-stellar-sdk.png')}
                    title="java-stellar-sdk"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      java-stellar-sdk
                    </Typography>
                    <Typography>
                      The Java SDK for building on the Stellar
                      network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://github.com/lightsail-network/java-stellar-sdk"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/kmp-stellar-sdk.png')}
                    title="kmp-stellar-sdk"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      kmp-stellar-sdk
                    </Typography>
                    <Typography>
                      Kotlin Multiplatform SDK for the Stellar
                      network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://github.com/Soneso/kmp-stellar-sdk"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/py-stellar-base.png')}
                    title="py-stellar-base"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      py-stellar-base
                    </Typography>
                    <Typography>
                      The Python SDK for building on the Stellar
                      network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellar-sdk.readthedocs.io"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/soropg.png')}
                    title="soropg"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      soropg
                    </Typography>
                    <Typography>
                      Soroban Playground — a browser IDE for Soroban
                      smart contracts.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://github.com/jamesbachini/Soroban-Playground"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-flutter-sdk.png')}
                    title="stellar-flutter-sdk"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      stellar-flutter-sdk
                    </Typography>
                    <Typography>
                      Flutter/Dart SDK for the Stellar network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://github.com/Soneso/stellar_flutter_sdk"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-ios-mac-sdk.png')}
                    title="stellar-ios-mac-sdk"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      stellar-ios-mac-sdk
                    </Typography>
                    <Typography>
                      iOS and macOS SDK for the Stellar network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://github.com/Soneso/stellar-ios-mac-sdk"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('../Resources/stellar-php-sdk.png')}
                    title="stellar-php-sdk"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      stellar-php-sdk
                    </Typography>
                    <Typography>
                      PHP SDK for the Stellar network.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://github.com/Soneso/stellar-php-sdk"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>
            </Grid>
          </Container>

        </main>

        

      </PageContainer>
    </>
  );
}

export default Resources;