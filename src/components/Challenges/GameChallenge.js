import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Countdown from 'react-countdown';
import Navbar from '../Dashboard/Navbar1';
import ChallengeRunner from './ChallengeRunner';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dev from './gameChallenge/developer.png';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share';

const API = 'https://edunode.herokuapp.com/api/gamechallenge';
const GAME_MINUTES = 20;

const renderer = ({ hours, minutes, seconds, completed }) =>
  completed ? (
    <span>Time is up!!</span>
  ) : (
    <span>
      {hours}:{minutes}:{seconds}
    </span>
  );

// Multiplayer game challenge: everyone who opens the same
// /<gamePath>/<randomNumber> link races; the first passing submit wins.
// Backend session state is keyed only by gameNumber, so it works for
// any challenge without server changes.
function GameChallenge({ config }) {
  const { randomNumber } = useParams();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(true);
  const [modalFinishVisible, setModalFinishVisible] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [winnerEmail, setWinnerEmail] = useState('');
  const [readyClicked, setReadyClicked] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const shareUrl = `https://edunode.org/${config.gamePath}/${randomNumber}/`;
  const shareTitle = `${config.title} — Game Challenge on EduNode!`;

  // Poll until the game session is marked started on the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/start/${randomNumber}`);
        setChallengeStarted(response.data);
        setModalVisible(!response.data);
        if (response.data && !startTime) setStartTime(Date.now());
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll for a winner until the finish dialog is closed
  useEffect(() => {
    const fetchGameChallenge = async () => {
      try {
        const response = await axios.get(`${API}/finish/${randomNumber}`);
        const data = response.data;
        if (data && data.challengeFinished) {
          setModalFinishVisible(true);
          setWinnerEmail(data.winner);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchGameChallenge();
    const intervalId = setInterval(() => {
      if (!modalFinishVisible) fetchGameChallenge();
    }, 15000);
    return () => clearInterval(intervalId);
  }, [randomNumber, modalFinishVisible]);

  const handleReadyClick = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.email) {
      alert('Please log in to start a game challenge.');
      return;
    }
    setReadyClicked(true);
    try {
      const response = await axios.post(`${API}/ready`, {
        gameNumber: randomNumber,
        localEmail: user.email,
      });
      setModalVisible(!response.data);
      setChallengeStarted(response.data);
      if (response.data) setStartTime(Date.now());
    } catch (error) {
      console.error('Error:', error);
      setReadyClicked(false);
    }
  };

  const handlePass = async (grade) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.email) return;
    try {
      await axios.post(`${API}/submit`, {
        localEmail: user.email,
        challengeFinished: true,
        grade,
        gameNumber: randomNumber,
      });
      setWinnerEmail(user.email);
      setModalFinishVisible(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const shareButtons = [
    [TwitterShareButton, TwitterIcon, { title: shareTitle }],
    [FacebookShareButton, FacebookIcon, { quote: shareTitle }],
    [LinkedinShareButton, LinkedinIcon, {}],
    [TelegramShareButton, TelegramIcon, { title: shareTitle }],
    [WhatsappShareButton, WhatsappIcon, { title: shareTitle }],
    [RedditShareButton, RedditIcon, { title: shareTitle }],
    [EmailShareButton, EmailIcon, { subject: shareTitle, body: shareUrl }],
  ];

  return (
    <div className="page-container">
      <Navbar />
      {challengeStarted && startTime && (
        <>
          time left :{' '}
          <Countdown
            date={startTime + GAME_MINUTES * 60 * 1000}
            renderer={renderer}
          />
        </>
      )}

      <ChallengeRunner config={config} onPass={handlePass} />

      <Dialog open={modalVisible} aria-labelledby="game-dialog-title">
        <DialogTitle id="game-dialog-title">{config.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Challenge Link : {shareUrl}
          </DialogContentText>
          <DialogContentText>
            (Please copy this link and send it to your friend in order to start
            the challenge!)
          </DialogContentText>
          <DialogContentText>
            This challenge will last {GAME_MINUTES} minutes — the first to
            finish wins!
          </DialogContentText>
          <DialogContentText>Are you ready to start the game?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReadyClick} autoFocus disabled={readyClicked}>
            Ready
          </Button>
          <Button onClick={() => navigate('/challenges')}>No</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalFinishVisible} aria-labelledby="finish-dialog-title">
        <DialogTitle id="finish-dialog-title">
          Challenge finished — {winnerEmail} has won the game!
        </DialogTitle>
        <DialogContent>
          <img src={dev} alt="Achievement" />
          <DialogContentText>Share this achievement:</DialogContentText>
          <div className="Demo__container">
            {shareButtons.map(([ShareBtn, Icon, extra], i) => (
              <div className="Demo__some-network" key={i}>
                <ShareBtn url={shareUrl} {...extra}>
                  <Icon size={32} round />
                </ShareBtn>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/challengeGame/leaderBoard')}>
            OK!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(GameChallenge);
