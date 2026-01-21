import { Routes, Route } from 'react-router-dom';
import ParentLayout from '../layouts/ParentLayout';
import ParentDashboard from '../../pages/parent/ParentDashboard';

/**
 * ParentRoutes - Nested routing for Parent role
 * Handles all routes under /parent/*
 * 
 * Uses ParentLayout with Outlet for nested routing structure
 * This structure allows for easy addition of more nested routes in the future
 * Example: /parent/dashboard, /parent/children, /parent/reports, etc.
 */
function ParentRoutes() {
  return (
    <Routes>
      <Route element={<ParentLayout />}>
        {/* Parent Dashboard */}
        <Route path="dashboard" element={<ParentDashboard />} />
        
        {/* Default route - shows dashboard when accessing /parent */}
        <Route index element={<ParentDashboard />} />
      </Route>
    </Routes>
  );
}

export default ParentRoutes;
