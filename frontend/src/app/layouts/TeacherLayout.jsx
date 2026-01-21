import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';

/**
 * TeacherLayout - Layout component for Teacher routes
 * Uses Outlet to render nested child routes
 * Includes Sidebar and Navbar for professional dashboard UI
 */
function TeacherLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar - Fixed width on left with role-based menu */}
      <Sidebar role="TEACHER" />

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Navbar - Fixed at top */}
        <Navbar roleName="Teacher" />

        {/* Scrollable Content Area */}
        <main className="mt-16 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TeacherLayout;
