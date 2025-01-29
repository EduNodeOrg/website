export const hasRole = (userRoles, requiredRole) => {
  return userRoles?.includes(requiredRole);
};

export const hasAnyRole = (userRoles, allowedRoles) => {
  return userRoles?.some(role => allowedRoles.includes(role));
}; 