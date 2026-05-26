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
                    image={require('../Resources/kelp1.png')}
                    title="Kelp"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Kelp
                    </Typography>
                    <Typography>
                      Kelp is a free, customizable, open-source
                      trading bot for the Stellar universal
                      marketplace.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://kelpbot.io/"
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
                    image={require('../Resources/stellarbeat.png')}
                    title="Stellarbeat.io"
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellarbeat.io
                    </Typography>
                    <Typography>
                      Stellar Network Visibility
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://stellarbeat.io/"
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
                    image={require('../Resources/astrograph.png')}
                    title="Astrograph"
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Astrograph
                    </Typography>
                    <Typography>
                      GraphQL interface to Stellar blockchain
                    </Typography>
                    <a href="https://keybase.io/team/astrograph">
                      <img src={kicon} height={25} width={25} alt="Keybase icon" />
                    </a>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://astrograph.io/"
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
                    image={require('../Resources/stellarlogo1.png')}
                    title="awesomestellar"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Awesome Stellar
                    </Typography>
                    <Typography>
                      A curated list of Stellar applications, blog
                      posts, educational resources, tools, and more.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://www.awesomestellar.com/"
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
                    image={require('../Resources/lumenswap.jpeg')}
                    title="awesomestellar"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Lumenswap
                    </Typography>
                    <Typography>
                    Swap assets in the borderless world
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://lumenswap.io/"
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
            </Grid>
          </Container>

          <Container sx={{ pt: 8, pb: 8 }} maxWidth="md">
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
              Courses
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <br></br>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('./lumen.png')}
                    title="Dev Google Group"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Stellar Overview Course
                    </Typography>
                    <Typography>
                      Get started by learning more about the Stellar
                      network, how to store lumens, how to trade on
                      the Stellar decentralized exchange, and more.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://www.lumenauts.com/courses/stellar-overview-course"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <br></br>
                <GlassCard>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}
                    image={require('./coinbase2.png')}
                    title="Dev Google Group"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      Learn Stellar. Earn XLM.
                    </Typography>
                    <Typography>
                      Stellar is a platform that connects banks,
                      payment systems, and people. Learn how it works
                      and you’ll earn XLM.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: '#00d4ff' }}
                      href="https://www.coinbase.com/earn/stellar"
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