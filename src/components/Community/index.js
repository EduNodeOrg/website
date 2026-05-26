import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import NavBar from "../NavBar";
import kicon from "./keybaseicon.png";
import discord from "./discord.png";

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

const CommunityLink = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  marginRight: '8px',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.8,
  },
});

function Community() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://edunode.herokuapp.com/api/project/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <>
      <NavBar />
      <PageContainer>
        <main>
          <Box sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
            <Container maxWidth="sm">
              <SectionTitle variant="h3">
                Stellar Community Hub
              </SectionTitle>
              <Typography variant="h6" sx={{ color: '#b8c5d6', mb: 4 }}>
                Conferences, initiatives, Discord servers, podcasts, and meetups around the world.
              </Typography>
            </Container>
          </Box>

          <Container sx={{ pt: 4, pb: 8 }} maxWidth="lg">
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
              Community Initiatives
            </Typography>

            <Grid container spacing={4}>
              {/* Stellar Global */}
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia sx={{ paddingTop: '56.25%' }} image={require('../Resources/stellarglobal.png')} title="Stellar Global" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Stellar Global
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      A perfect source for the Stellar Network.
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <CommunityLink href="https://discord.gg/4FGf3UbuST" target="_blank" rel="noopener">
                        <img src={discord} height={25} width={25} alt="discord" />
                      </CommunityLink>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="https://stellarglobal.community" target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              {/* Stellar Developers Discord */}
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia sx={{ paddingTop: '56.25%' }} image={require('../Resources/stellar11.PNG')} title="Stellar Developers Discord" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Stellar Developers Discord
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      Stellar is an open financial network built for speed and efficiency.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="https://discord.gg/Y4AfXeneTA" target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                      Join Discord
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              {/* The Stellar Podcast */}
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia sx={{ paddingTop: '56.25%' }} image={require('../Resources/stellarpodcast.PNG')} title="The Stellar Podcast" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      The Stellar Podcast
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      Check out the Stellar Podcast.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="https://podcast.stellar.org/" target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                      Listen
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              {/* Public Node Discord */}
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardMedia sx={{ paddingTop: '56.25%' }} image={require('../Resources/publicnode1.PNG')} title="Public Node Discord" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Public Node Discord
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      Join the Public Node Discord server.
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <CommunityLink href="https://keybase.io/team/public_node" target="_blank" rel="noopener">
                        <img src={kicon} height={25} width={25} alt="keybase" />
                      </CommunityLink>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="https://discord.gg/zTfTmqtdm9" target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                      Join Discord
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              {/* EduNode Discord */}
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      EduNode Discord
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      Join the EduNode community to learn, share, and grow together in the Web3 space.
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <CommunityLink href="https://discord.gg/qBJYQYUK92" target="_blank" rel="noopener">
                        <img src={discord} height={25} width={25} alt="discord" />
                      </CommunityLink>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="https://discord.gg/qBJYQYUK92" target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                      Join Discord
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              {/* MozartPay Discord */}
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      MozartPay
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      A payment platform built on the Stellar network.
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <CommunityLink href="https://discord.gg/4VrBFvxr5B" target="_blank" rel="noopener">
                        <img src={discord} height={25} width={25} alt="discord" />
                      </CommunityLink>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="https://discord.gg/4VrBFvxr5B" target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                      Join Discord
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              {/* Lumenloop */}
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lumenloop
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      Exploring the Stellar ecosystem and building tools for the community.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="https://lumenloop.com" target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                      Visit
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              {/* Stellar Austria */}
              <Grid item xs={12} sm={6} md={4}>
                <GlassCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Stellar Austria
                    </Typography>
                    <Typography sx={{ color: '#b8c5d6' }}>
                      The Austrian Stellar community hub.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="https://linktr.ee/stellaraustria" target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                      Learn More
                    </Button>
                  </CardActions>
                </GlassCard>
              </Grid>

              {/* Dynamic Projects */}
              {projects.map(project => (
                <Grid item xs={12} sm={6} md={4} key={project._id}>
                  <GlassCard>
                    <CardMedia sx={{ paddingTop: '56.25%' }} image={project.image} title={project.title} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {project.title}
                      </Typography>
                      <Typography sx={{ color: '#b8c5d6' }}>{project.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" href={project.link} target="_blank" rel="noopener" sx={{ color: '#00d4ff' }}>
                        Learn More
                      </Button>
                    </CardActions>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 8, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 600, mb: 2 }}>
                Communities of enthusiasts around the world
              </Typography>
              <Typography variant="body1" sx={{ color: '#b8c5d6', mb: 3 }}>
                Would you like us to add your community? Feel free to contact us at{' '}
                <a href="mailto:hi@edunode.org" style={{ color: '#00d4ff', textDecoration: 'underline' }}>hi@edunode.org</a>.
              </Typography>
            </Box>
          </Container>
        </main>
      </PageContainer>
    </>
  );
}

export default Community;
