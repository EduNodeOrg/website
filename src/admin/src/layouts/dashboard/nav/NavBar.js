import React from 'react';
import { Box, List } from '@mui/material';
import Iconify from '../../components/Iconify';
import NavItem from './NavItem';

function NavBar({ user = {} }) {
  return (
    <Box component="nav">
      <List disablePadding>
        <NavItem
          key="new-post"
          title="New Post"
          path="/dashboard/newpost"
          icon={<Iconify icon="eva:file-add-fill" />}
          visibleTo={['admin', 'teacher', 'student']}
        />
      </List>
    </Box>
  );
}

export default NavBar; 