import React, { useRef, useState, useEffect } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { connect } from "react-redux";
import { clearErrors } from "../../../actions/errorActions";
import { verifyCode } from "../../../actions/authActions";
import { reduxForm } from "redux-form";
import albedo from '@albedo-link/intent'
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { isConnected, getPublicKey } from "@stellar/freighter-api";
import axios from "axios";
import html2canvas from 'html2canvas';
import dep from "./9.png"
import growth from './growth.png';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Modal from 'react-modal';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};


function IconContainer(props) {
  const { value, ...other } = props;
  const ratingLabel = customIcons[value].label;

  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};



function Ediploma(props) {
  const certificateWrapper = useRef(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [Name, setName] = useState(props.user && props.user.name ? props.user.name : '');
  const [Feedback, setFeedback] = useState('');
  const [certificateCid, setCertificateCid] = useState(null);
  const loggedInUserEmail = props.auth.user.email ? props.auth.user.email : '';
  const courseId = '644bcdd1e1fec0f4f55a7447';
  const [showPopup, setShowPopup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Automatically generate certificate when component mounts
    if (Name && !certificateCid) {
      generateCertificate();
    }
  }, [Name]);

  async function generateCertificate() {
    try {
      setIsGenerating(true);
      const base64Image = await captureCertificate();
      await sendImageToServer(base64Image, props);
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  }

  async function captureCertificate() {
    const canvas = await html2canvas(certificateWrapper.current);
    return canvas.toDataURL('image/png');
  }

  async function sendImageToServer(base64Image, props) {
    try {
      if (!Name || Name.trim() === '') {
        console.error('Name is required but was empty');
        return;
      }

      const payload = {
        name: Name.trim(),
        email: props.auth.user.email || null,
        pkey: "GABC1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCD"
      };

      console.log('Sending request with payload:', JSON.stringify(payload, null, 2));

      const response = await axios.post(
        "https://edunode.herokuapp.com/api/certificates/diploma9",
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.cid) {
        setCertificateCid(response.data.cid);
      }

      return response.data;
    } catch (error) {
      console.error('Error sending image to server:', error);
      throw error;
    }
  }

  async function handleConfirmDownload(e) {
    e.preventDefault();
    if (isGenerating) return; // Prevent double click
    setIsGenerating(true);
    
    try {
      // 1. Generate the certificate image
      const base64Image = await captureCertificate();
      
      // 2. Send certificate data to the server
      const certificateData = await sendImageToServer(base64Image, props);
      console.log('Certificate created:', certificateData);
      
      // 3. Export the certificate as PNG for download with .png extension
      exportComponentAsPNG(certificateWrapper, {
        html2CanvasOptions: { backgroundColor: `url(${dep})` },
        fileName: `certificate-${Name.replace(/\s+/g, '-').toLowerCase()}.png`,
      });

      // 4. Submit feedback if provided
      if (ratingValue || Feedback) {
        const formData = {
          rate: ratingValue,
          text: Feedback,
          email: loggedInUserEmail,
        };
        
        try {
          const response = await fetch(`https://edunode.herokuapp.com/api/cours/cours/${courseId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Failed to submit feedback');
          }
          
          console.log('Feedback submitted successfully');
        } catch (error) {
          console.error('Error submitting feedback:', error);
          // Don't block the user flow if feedback submission fails
        }
      }

      // 5. Increment trophy count
      try {
        const trophyResponse = await fetch('https://edunode.herokuapp.com/api/certificates/increment-trophy', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: loggedInUserEmail }),
        });

        if (!trophyResponse.ok) {
          throw new Error('Failed to update trophy count');
        }
        
        const result = await trophyResponse.json();
        console.log('Trophy count updated:', result);
      } catch (error) {
        console.error('Error updating trophy count:', error);
        // Don't block the user flow if trophy update fails
      }

      // 6. Show success popup
      setShowPopup(true);

    } catch (error) {
      console.error('Error generating certificate:', error);
      // You might want to show an error message to the user here
      alert('Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };



  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="App">
      <div className="Meta">
        <h1>How did you find our Course </h1>
        <p>Your feedback is very appreciated </p>
        <StyledRating
          name="highlight-selected-only"
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
        />
        <p>Rating: {ratingValue}</p>
        <br></br>
        <input
          type="text"
          placeholder='Feedback'
          value={Feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        {!props.auth.user.name && (
          <p>Please update your name in the profile page so we can provide you with certificate !</p>
        )}
        
        
        <button onClick={handleConfirmDownload} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Confirm and Download'}
        </button>
      </div>
      <div id="downloadWrapper">

        <div id="certificateWrapper" ref={certificateWrapper}>
          <p>{Name}</p>
          {certificateCid ? (
            <img 
              src={`https://ipfs.io/ipfs/${certificateCid}`} 
              alt="eCertificate" 
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
          ) : (
            <img 
              src="https://i.imgur.com/MxzEwin.png" 
              alt="eCertificate" 
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
          )}
          {certificateCid && (
            <div className="certificate-cid">
              <p>Certificate ID: {certificateCid}</p>
              <a 
                href={`https://ipfs.io/ipfs/${certificateCid}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View on IPFS
              </a>
            </div>
          )}
          {isGenerating && <div className="loading">Generating certificate...</div>}
        </div>
      </div>


      <Modal
  isOpen={showPopup}
  onRequestClose={handleClosePopup}
  contentLabel="Congratulations"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      width: '400px',
      height: '400px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '8px'
    }
  }}
>
  <h2 style={{ marginBottom: '20px' }}>Congratulations!</h2>
  <p style={{ marginBottom: '20px', textAlign: 'center' }}>
    Thank you for finishing the course an claimed this trophy.
  </p>
  <img
    src={growth}
    alt="Trophy"
    style={{ width: '150px', marginBottom: '20px' }}
  />
  <button onClick={handleClosePopup}>Close</button>
</Modal>
    </div>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

Ediploma = connect(
  mapStateToProps, { verifyCode, clearErrors }
)(Ediploma);

export default Ediploma = reduxForm({
  form: "",
  fields: [""],
  clearErrors,
  verifyCode
})(Ediploma);