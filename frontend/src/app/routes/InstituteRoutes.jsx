import { Routes, Route } from 'react-router-dom';
import InstituteLayout from '../layouts/InstituteLayout';
import InstituteDashboard from '../../pages/institute/InstituteDashboard';

/**
 * InstituteRoutes - Nested routing for Institute Admin role
 * Handles all routes under /institute/*
 * 
 * Uses InstituteLayout with Outlet for nested routing structure
 * This structure allows for easy addition of more nested routes in the future
 * Example: /institute/dashboard, /institute/students, /institute/exams, etc.
 */
function InstituteRoutes() {
  return (
    <Routes>
      <Route element={<InstituteLayout />}>
        {/* Institute Admin Dashboard */}
        <Route path="dashboard" element={<InstituteDashboard />} />
        
        {/* Default route - shows dashboard when accessing /institute */}
        <Route index element={<InstituteDashboard />} />
      </Route>
    </Routes>
  );
}

export default InstituteRoutes;
