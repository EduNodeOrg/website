import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";
import TextField from '@mui/material/TextField'
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: '10px', 
  },
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  cardDescription: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', // Add gradient for the overlay effect
  },
}));





export default function PostCard({ post }) {

  const classes = useStyles();
  return (



    <div >
      <Grid container spacing={5} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={15} key={post._id}>
          <Card className={classes.card}>
            {post.image && (
              <CardMedia
                className={classes.cardMedia}
                image={post.image}
                title={post.title}
              />
            )}
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <small className="text-muted">
            Tags: {post.tags.join(", ")}
          </small>
          <div className={classes.cardDescription}>
            <Typography
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></Typography>
            <div className={classes.overlay}></div>
          </div>
            

            </CardContent>
            
            <CardContent>
            <a href={post.link} className="card-link">
          <FontAwesomeIcon icon={faLink} className="mr-2" />
          {post.link}
        </a>
        <br></br>
            <small className="text-muted">
            Author: {post.email}
          </small>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href={`/postDetails/${post._id}`}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>










      {/** 
      <a href={`/postDetails/${post._id}`} target="_blank" rel="noopener noreferrer">
      <div className="card-body">
       <div className="card-label">Title:</div>
        <h5 className="card-title" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{post.title}</h5>
        <div className="card-label">Description:</div>
        <p className="card-text" dangerouslySetInnerHTML={{ __html: post.description }} ></p>
        <a href={post.link} className="card-link">
          <FontAwesomeIcon icon={faLink} className="mr-2" />
          {post.link}
        </a>
        <div className="card-label">Author:</div>
        <p className="card-text">{post.email}</p>
        <p className="card-text">
          <small className="text-muted">
            Tags: {post.tags.join(", ")}
          </small>
        </p>
        
      </div>
      </a>


      */}
    </div>
  );
}
