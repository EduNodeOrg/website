import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Mozart from "../Projects/mozart.png";

export default function MediaCard() {
  return (
    <>
    <Card sx={{ maxWidth: 150 }}>
      <CardMedia
        sx={{ height: 100 }}
        image={Mozart}
        title="green iguana"
      />
      <CardContent>

      </CardContent>
      <CardActions>

      </CardActions>
    </Card>


    
    </>);
}
