import { Routes, Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import TeacherDashboard from '../../pages/teacher/TeacherDashboard';

/**
 * TeacherRoutes - Nested routing for Teacher role
 * Handles all routes under /teacher/*
 * 
 * Uses TeacherLayout with Outlet for nested routing structure
 * This structure allows for easy addition of more nested routes in the future
 * Example: /teacher/dashboard, /teacher/exams, /teacher/students, etc.
 */
function TeacherRoutes() {
  return (
    <Routes>
      <Route element={<TeacherLayout />}>
        {/* Teacher Dashboard */}
        <Route path="dashboard" element={<TeacherDashboard />} />
        
        {/* Default route - shows dashboard when accessing /teacher */}
        <Route index element={<TeacherDashboard />} />
      </Route>
    </Routes>
  );
}

export default TeacherRoutes;
