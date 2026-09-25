import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';

const FavoriteButton = ({ active, onToggle, sx = {} }) => (
  <Tooltip title={active ? 'Remove from favorites' : 'Add to favorites'}>
    <IconButton
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      sx={{
        color: active ? '#7b2ff7' : '#b8c5d6',
        '&:hover': {
          background: 'rgba(123, 47, 247, 0.9)',
          color: 'white',
        },
        ...sx,
      }}
    >
      {active ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  </Tooltip>
);

export default FavoriteButton;
