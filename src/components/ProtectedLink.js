import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { hasAnyRole } from '../utils/auth';
import { Nav } from 'react-bootstrap';

const ProtectedLink = ({ roles, href, children }) => {
  const { user } = useAuth();
  
  return hasAnyRole(user?.roles, roles) ? (
    <Nav.Link href={href}>{children}</Nav.Link>
  ) : null;
};

export default ProtectedLink; 