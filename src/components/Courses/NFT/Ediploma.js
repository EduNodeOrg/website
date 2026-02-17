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
import dep from "./newediploma.png"
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
import Button from 'react-bootstrap/Button';

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
  const [certificateUrl, setCertificateUrl] = useState('');
  const loggedInUserEmail = props.auth.user.email ? props.auth.user.email : '';
  const courseId = '644bcdd1e1fec0f4f55a7447';
  const [showPopup, setShowPopup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch certificate when component mounts
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(
          `https://edunode.herokuapp.com/api/certificates/user/${props.auth.user.id}/course/${courseId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        if (response.data.certificateUrl) {
          setCertificateUrl(response.data.certificateUrl);
        }
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('Failed to load certificate');
      } finally {
        setIsLoading(false);
      }
    };

    if (props.auth.user.id) {
      fetchCertificate();
    }
  }, [props.auth.user.id]);

  const generateCertificate = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post(
        'https://edunode.herokuapp.com/api/certificates/generate',
        {
          userId: props.auth.user.id,
          courseId: courseId,
          userName: props.auth.user.name
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.certificateUrl) {
        setCertificateUrl(response.data.certificateUrl);
        setShowPopup(true);
      }
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError('Failed to generate certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (certificateUrl) {
      const link = document.createElement('a');
      link.href = certificateUrl;
      link.download = `certificate-${courseId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
        "https://edunode.herokuapp.com/api/certificates/diploma",
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending image to server:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  }

  async function getCertificateBase64() {
    const canvas = await html2canvas(certificateWrapper.current, {
      backgroundColor: `url(${dep})`,
    });
    const base64Image = canvas.toDataURL("image/png");
    return base64Image;
  }

  const handleConfirmDownload = async (e) => {
    e.preventDefault();
    if (isGenerating) return; // Prevent double click
    setIsGenerating(true);
    try {
      const base64Image = await getCertificateBase64();
      await sendImageToServer(base64Image, props);
      console.log(base64Image); // This will log the base64 string of the image in the console
      // TODO: Send the base64Image to your server using an API
      exportComponentAsPNG(certificateWrapper, {
        html2CanvasOptions: { backgroundColor: `url(${dep})`, },
      });
      setTimeout(function () {
        try {
         // window.location.href = "/";
        } catch (error) {
          console.log(error);
        }
      }, 2000);

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

        if (response.ok) {
          // Handle successful submission
        } else {
          // Handle submission error
        }
      } catch (error) {
        console.error(error);
        // Handle submission error
      }

      const email = loggedInUserEmail;

    fetch('https://edunode.herokuapp.com/api/certificates/increment-trophy', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to increment trophy');
        }
      })
      .then(data => {
        console.log(data.message); // Success message from the server
        // Perform any additional actions or display a success message on the frontend
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occurred during the request
      });
    } catch (error) {
      // If any error occurs, re-enable the button
      setIsGenerating(false);
      return;
    }
    setIsGenerating(false); // Optionally, keep it disabled if you want to prevent any further generation
  }

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading certificate...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : certificateUrl ? (
        <div className="certificate-container">
          <img 
            src={certificateUrl} 
            alt="Course Certificate" 
            style={{ maxWidth: '100%', border: '1px solid #ddd' }}
          />
          <div style={{ marginTop: '20px' }}>
            <Button 
              variant="primary" 
              onClick={handleDownload}
              disabled={!certificateUrl}
            >
              Download Certificate
            </Button>
          </div>
        </div>
      ) : (
        <div className="Meta">
          <h1>Congratulations on completing the course!</h1>
          <p>Click the button below to generate your certificate.</p>
          <Button 
            variant="primary" 
            onClick={generateCertificate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Certificate'}
          </Button>
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
      )}
      <div id="downloadWrapper">
        {certificateUrl ? (
          <div id="certificateWrapper" ref={certificateWrapper}>
            <img 
              src={`https://ipfs.io/ipfs/${certificateUrl}`} 
              alt="eCertificate" 
              style={{ maxWidth: '100%', height: 'auto' }}
              onError={(e) => {
                // Fallback to a different IPFS gateway if the first one fails
                e.target.src = `https://gateway.pinata.cloud/ipfs/${certificateUrl}`;
              }}
            />
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            {error || 'Certificate not found. Please complete the course to generate your certificate.'}
          </div>
        )}
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