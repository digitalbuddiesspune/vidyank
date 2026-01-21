import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore.jsx';

/**
 * Navbar Component
 * Reusable navbar with page title, user profile, and logout button
 * 
 * @param {string} roleName - Name of the role (e.g., 'Super Admin', 'Teacher')
 */
function Navbar({ roleName = 'User' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Extract page title from pathname
  const getPageTitle = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length === 1) {
      return 'Dashboard';
    }
    
    // Get the last segment and capitalize it
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const pageTitle = getPageTitle();

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Page Title */}
        <div>
          <h1 className="text-lg lg:text-xl font-semibold text-gray-800">{pageTitle}</h1>
        </div>

        {/* Right Section - User Profile & Logout */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* User Profile Placeholder */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-700">{roleName}</p>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-xs lg:text-sm">
                {roleName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            className="px-3 py-2 lg:px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => {
              // Get the base path from current location to redirect to correct login
              const basePath = location.pathname.split('/')[1];
              logout();
              // Redirect to role-based login page
              navigate(`/${basePath}`);
            }}
          >
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
