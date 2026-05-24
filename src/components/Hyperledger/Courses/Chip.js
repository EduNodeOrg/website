import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Chip
        icon={<DoneIcon />}
        label="Course Completed"
        // onDelete={handleDelete}
        color="primary"
      />
    </div>
  );
}
