import { Routes, Route } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import Dashboard from '../../pages/student/Dashboard';
import Exams from '../../pages/student/Exams';
import Practice from '../../pages/student/Practice';
import Results from '../../pages/student/Results';
import Progress from '../../pages/student/Progress';
import Profile from '../../pages/student/Profile';

/**
 * StudentRoutes - Nested routing for Student role
 * Handles all routes under /student/*
 * 
 * Uses StudentLayout with Outlet for nested routing structure
 */
function StudentRoutes() {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        {/* Student Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exams" element={<Exams />} />
        <Route path="practice" element={<Practice />} />
        <Route path="results" element={<Results />} />
        <Route path="progress" element={<Progress />} />
        <Route path="profile" element={<Profile />} />
        
        {/* Default route - shows dashboard */}
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default StudentRoutes;
