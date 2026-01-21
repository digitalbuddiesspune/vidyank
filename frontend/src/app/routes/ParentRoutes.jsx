import { Routes, Route } from 'react-router-dom';
import ParentLayout from '../layouts/ParentLayout';
import Dashboard from '../../pages/parent/Dashboard';
import Results from '../../pages/parent/Results';
import Attendance from '../../pages/parent/Attendance';
import Progress from '../../pages/parent/Progress';
import Profile from '../../pages/parent/Profile';

/**
 * ParentRoutes - Nested routing for Parent role
 * Handles all routes under /parent/*
 * 
 * Uses ParentLayout with Outlet for nested routing structure
 */
function ParentRoutes() {
  return (
    <Routes>
      <Route element={<ParentLayout />}>
        {/* Parent Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="results" element={<Results />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="progress" element={<Progress />} />
        <Route path="profile" element={<Profile />} />
        
        {/* Default route - shows dashboard */}
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default ParentRoutes;
