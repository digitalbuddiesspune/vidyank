import { Routes, Route } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import StudentDashboard from '../../pages/student/StudentDashboard';

/**
 * StudentRoutes - Nested routing for Student role
 * Handles all routes under /student/*
 * 
 * Uses StudentLayout with Outlet for nested routing structure
 * This structure allows for easy addition of more nested routes in the future
 * Example: /student/dashboard, /student/exams, /student/results, etc.
 */
function StudentRoutes() {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        {/* Student Dashboard */}
        <Route path="dashboard" element={<StudentDashboard />} />
        
        {/* Default route - shows dashboard when accessing /student */}
        <Route index element={<StudentDashboard />} />
      </Route>
    </Routes>
  );
}

export default StudentRoutes;
