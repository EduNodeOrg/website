// Membership helpers — mirror the tier detection used in
// src/components/Account/MembershipManagement.js so Pro access
// checks stay consistent across the app.

export const getMembershipTier = (user) => {
  if (!user) return 'Free';
  return (
    user.membership ||
    (user.subscription && user.subscription.tier) ||
    user.tier ||
    user.plan ||
    (user.isPro ? 'Pro' : null) ||
    (user.isEnterprise ? 'Enterprise' : null) ||
    'Free'
  );
};

// Pro and Enterprise both unlock Pro course content.
export const hasProAccess = (user) => {
  const tier = getMembershipTier(user);
  return tier === 'Pro' || tier === 'Enterprise';
};

// A user can open a course when it's free or they have Pro access.
export const canAccessCourse = (user, course) =>
  Boolean(course) && (!course.proOnly || hasProAccess(user));
