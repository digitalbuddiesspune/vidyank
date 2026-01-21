import { NavLink } from 'react-router-dom';
import { sidebarConfig } from '../../config/sidebarConfig';

/**
 * Sidebar Component
 * Reusable sidebar with logo, menu items, and active route highlighting
 * Uses role-based configuration from sidebarConfig
 * 
 * @param {string} role - Role identifier (e.g., 'SUPER_ADMIN', 'TEACHER', 'STUDENT')
 */
function Sidebar({ role }) {
  // Get menu items from config based on role
  // If role is undefined or not found in config, show empty menu
  const menuItems = role && sidebarConfig[role] ? sidebarConfig[role] : [];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 text-white transition-transform hidden lg:block">
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800 px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold">ExamPlatform</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500">
              No menu items available
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
