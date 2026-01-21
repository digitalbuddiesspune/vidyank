import { Routes, Route } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import SuperAdminDashboard from '../../pages/superadmin/SuperAdminDashboard';

/**
 * SuperAdminRoutes - Nested routing for Super Admin role
 * Handles all routes under /superadmin/*
 * 
 * Uses SuperAdminLayout with Outlet for nested routing structure
 * This structure allows for easy addition of more nested routes in the future
 * Example: /superadmin/dashboard, /superadmin/users, /superadmin/settings, etc.
 */
function SuperAdminRoutes() {
  return (
    <Routes>
      <Route element={<SuperAdminLayout />}>
        {/* Super Admin Dashboard */}
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        
        {/* Default route - shows dashboard when accessing /superadmin */}
        <Route index element={<SuperAdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default SuperAdminRoutes;
