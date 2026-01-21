import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore.jsx';
import { getDashboardUrl } from '../../config/roleMappings';

/**
 * RoleGuard Component
 * Protects routes by checking if user's role matches the required role
 * 
 * If user's role does NOT match:
 * - Redirects to their own dashboard (prevents cross-role access)
 * 
 * @param {string} requiredRole - Role required to access the route
 * @param {React.ReactNode} children - Child components to render if role matches
 */
function RoleGuard({ requiredRole, children }) {
  const { role: userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user's role doesn't match the required role, redirect to their own dashboard
    if (userRole && userRole !== requiredRole) {
      const dashboardUrl = getDashboardUrl(userRole);
      navigate(dashboardUrl, { replace: true });
    }
  }, [userRole, requiredRole, navigate]);

  // If role doesn't match, don't render children (will redirect via useEffect)
  if (userRole && userRole !== requiredRole) {
    return null;
  }

  // Role matches, render protected content
  return children;
}

export default RoleGuard;
