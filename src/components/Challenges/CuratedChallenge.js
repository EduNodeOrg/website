import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../Dashboard/Navbar1';
import ChallengeRunner from './ChallengeRunner';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

// Fixed-route curated challenge: no backend, no timer. On a passing
// grade it navigates to /challenges/<slug>/done.
export default function CuratedChallenge({ config }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const handlePass = () => {
    setProgress(100);
    navigate(`/challenges/${config.slug}/done`);
  };

  return (
    <div className="page-container">
      <Navbar />
      <LinearProgressWithLabel value={progress} />
      <ChallengeRunner config={config} onPass={handlePass} />
    </div>
  );
}
