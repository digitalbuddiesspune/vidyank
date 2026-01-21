import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore.jsx';

/**
 * LoginRedirect Component
 * Redirects authenticated users to their dashboard
 * 
 * @param {string} role - Expected role for this login page
 * @param {string} dashboardPath - Path to redirect to if authenticated
 */
function LoginRedirect({ role, dashboardPath, children }) {
  const { isAuthenticated, role: userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated and has the matching role, redirect to dashboard
    if (isAuthenticated && userRole === role) {
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, userRole, role, dashboardPath, navigate]);

  // If authenticated with matching role, don't render login form
  if (isAuthenticated && userRole === role) {
    return null; // Will redirect via useEffect
  }

  return children;
}

export default LoginRedirect;
