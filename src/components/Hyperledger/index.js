import React from "react";
import "./style.css";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import NavBar from "../NavBar";
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

  function Hyperledger() {
    const classes = useStyles();
    const shareUrl = 'https://edunode.org/hyperledger';
    const title = 'Hyperledger';
   
    return (
      <>
      <Helmet>
            <meta charSet="utf-8" />
       
          </Helmet>
        <NavBar />
        <div className="resources">
          <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Hyperledger training for businesses (coming soon)
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                ></Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        href="https://wiki.hyperledger.org/"
                      >
                        Learn more
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
     
          </main>
  
          
  
          <br></br>
          <br></br>
        </div>
      </>
    );
  }
  
  export default Hyperledger;
