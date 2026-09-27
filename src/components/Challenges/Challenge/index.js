import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Button,
} from 'react-bootstrap';

import Navbar1 from '../../Dashboard/Navbar1';

import challengeImg from './c1.png';
import gameChallengeImg from '../gameChallenge/images/c1.png';
import sorobanImg from '../gameChallenge/images/ship2.png';

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%)',
  paddingBottom: theme.spacing(6),
}));

const Content = styled(Box)(({ theme }) => ({
  maxWidth: 900,
  margin: '0 auto',
  padding: theme.spacing(4, 2),
}));

const Title = styled(Typography)({
  background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  marginBottom: 8,
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#e2e8f0',
  fontWeight: 600,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(168,85,247,0.35)',
  borderRadius: 12,
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const CardText = styled(Typography)({
  color: '#cbd5f5',
  flexGrow: 1,
});

const CardActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexShrink: 0,
}));

const LeaderBoardCard = styled(Card)({
  cursor: 'pointer',
  borderStyle: 'dashed',
  '&:hover': {
    background: 'rgba(168,85,247,0.12)',
  },
});

const challengeDetailsId = '648c95d5d9b084b4ad3def41';

function ChallengeCard({ image, title, description, onStart }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    setOpen(false);
    navigate(onStart());
  };

  return (
    <Card>
      <ButtonBase sx={{ width: 96, height: 96, flexShrink: 0 }}>
        <img src={image} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto' }} />
      </ButtonBase>
      <CardText variant="subtitle1">
        {title}
        {description && (
          <Typography variant="body2" sx={{ color: '#94a3b8', marginTop: 0.5 }}>
            {description}
          </Typography>
        )}
      </CardText>
      <CardActions>
        <Button variant="outline-light" size="sm" onClick={() => setOpen(true)}>
          Select Challenge
        </Button>
        <Button
          variant="outline-light"
          size="sm"
          onClick={() => navigate(`/challengeDetails/${challengeDetailsId}`)}
        >
          Details
        </Button>
      </CardActions>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Start challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure that you want to take this challenge?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="secondary">Cancel</Button>
          <Button onClick={handleConfirm} variant="primary" autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default function Challenge() {
  const navigate = useNavigate();

  return (
    <PageRoot>
      <Navbar1 />
      <Content>
        <Title variant="h4">Challenges</Title>
        <Typography variant="body2" sx={{ color: '#94a3b8', marginBottom: 2 }}>
          Test your skills with curated challenges, or start a shareable game challenge and compete on the leaderboard.
        </Typography>

        <SectionTitle variant="h6">Curated Challenges</SectionTitle>
        <ChallengeCard
          image={challengeImg}
          title="The Intergalactic Space Agency"
          description="A hand-authored, fixed challenge — follow the clues and complete each step."
          onStart={() => '/challenges/101/'}
        />

        <SectionTitle variant="h6">Game Challenges</SectionTitle>
        <Typography variant="body2" sx={{ color: '#94a3b8', marginBottom: 2 }}>
          Each game generates a unique link you can share — play with friends and climb the leaderboard.
        </Typography>
        <ChallengeCard
          image={gameChallengeImg}
          title="The Intergalactic Space Agency (Game)"
          description="Randomized game session with a shareable link and scoring."
          onStart={() => `/challengeGame1/${Math.floor(Math.random() * 1000000)}/`}
        />
        <ChallengeCard
          image={sorobanImg}
          title="Soroban Hello World Challenge"
          description="Randomized game session — write and deploy your first Soroban contract."
          onStart={() => `/challengeGame2/${Math.floor(Math.random() * 10000)}/`}
        />
        <LeaderBoardCard onClick={() => navigate('/challengeGame/leaderBoard')}>
          <CardText variant="subtitle1">
            View the Game Challenges Leaderboard →
          </CardText>
        </LeaderBoardCard>
      </Content>
    </PageRoot>
  );
}
