import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore.jsx';
import { getLoginUrl } from '../../config/roleMappings';

/**
 * AuthGuard Component
 * Protects routes by checking if user is authenticated
 * 
 * If user is NOT authenticated:
 * - Redirects to the role-specific login page
 * 
 * @param {string} requiredRole - Role required to access the route
 * @param {React.ReactNode} children - Child components to render if authenticated
 */
function AuthGuard({ requiredRole, children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to role-specific login page
    if (!isAuthenticated) {
      const loginUrl = getLoginUrl(requiredRole);
      navigate(loginUrl, { replace: true });
    }
  }, [isAuthenticated, requiredRole, navigate]);

  // If not authenticated, don't render children (will redirect via useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // User is authenticated, render protected content
  return children;
}

export default AuthGuard;
