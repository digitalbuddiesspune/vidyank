import { Routes, Route } from 'react-router-dom';
import InstituteLayout from '../layouts/InstituteLayout';
import Dashboard from '../../pages/institute/Dashboard';
import Students from '../../pages/institute/Students';
import Teachers from '../../pages/institute/Teachers';
import Parents from '../../pages/institute/Parents';
import Batches from '../../pages/institute/Batches';
import Exams from '../../pages/institute/Exams';
import Questions from '../../pages/institute/Questions';
import Results from '../../pages/institute/Results';
import Attendance from '../../pages/institute/Attendance';
import Subscription from '../../pages/institute/Subscription';

/**
 * InstituteRoutes - Nested routing for Institute Admin role
 * Handles all routes under /institute/*
 * 
 * Uses InstituteLayout with Outlet for nested routing structure
 */
function InstituteRoutes() {
  return (
    <Routes>
      <Route element={<InstituteLayout />}>
        {/* Institute Admin Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="parents" element={<Parents />} />
        <Route path="batches" element={<Batches />} />
        <Route path="exams" element={<Exams />} />
        <Route path="questions" element={<Questions />} />
        <Route path="results" element={<Results />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="subscription" element={<Subscription />} />
        
        {/* Default route - shows dashboard */}
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default InstituteRoutes;
