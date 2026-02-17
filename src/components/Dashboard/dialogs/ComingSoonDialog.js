import React from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ScheduleIcon from '@mui/icons-material/Schedule';
import NotificationsIcon from '@mui/icons-material/Notifications';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
    >
      <Typography variant="h4" component="div" sx={{ 
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          sx={{
            color: '#b8c5d6',
            '&:hover': {
              color: '#7b2ff7',
            },
          }}
        >
          ✕
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(10, 14, 39, 0.9) 100%)',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(10, 14, 39, 0.9) 100%)',
  },
}))(MuiDialogActions);

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
    border: '1px solid rgba(123, 47, 247, 0.3)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    minWidth: '400px',
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  color: '#b8c5d6',
}));

const ComingSoonDialog = ({ open, onClose, course }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle onClose={onClose}>
        Coming Soon! 🚀
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" sx={{ 
            color: '#ffffff', 
            mb: 3,
            fontWeight: 'bold',
          }}>
            "{course?.title || 'This Course'}"
          </Typography>
          
          <Typography variant="body1" sx={{ 
            color: '#b8c5d6', 
            mb: 3,
            lineHeight: 1.6,
          }}>
            We're working hard to bring you this amazing course! 
            Get ready to dive into cutting-edge Web3 content and hands-on learning experiences.
          </Typography>

          <IconBox>
            <ScheduleIcon sx={{ mr: 1, color: '#7b2ff7' }} />
            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
              Estimated release: Coming soon
            </Typography>
          </IconBox>

          <IconBox>
            <NotificationsIcon sx={{ mr: 1, color: '#00d4ff' }} />
            <Typography variant="body2" sx={{ color: '#b8c5d6' }}>
              Stay tuned for updates
            </Typography>
          </IconBox>

          <Box sx={{ 
            mt: 3,
            p: 2,
            background: 'rgba(123, 47, 247, 0.1)',
            border: '1px solid rgba(123, 47, 247, 0.3)',
            borderRadius: '8px',
          }}>
            <Typography variant="body2" sx={{ 
              color: '#00d4ff',
              fontStyle: 'italic',
            }}>
              💡 Pro tip: Follow our social media channels to be the first to know when this course launches!
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #7b2ff7, #00d4ff)',
            color: 'white',
            fontWeight: 'bold',
            px: 3,
            '&:hover': {
              background: 'linear-gradient(45deg, #00d4ff, #7b2ff7)',
            },
          }}
        >
          Got it!
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ComingSoonDialog;
