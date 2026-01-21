import { Routes, Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import Dashboard from '../../pages/teacher/Dashboard';
import Subjects from '../../pages/teacher/Subjects';
import Questions from '../../pages/teacher/Questions';
import Exams from '../../pages/teacher/Exams';
import Attendance from '../../pages/teacher/Attendance';
import Performance from '../../pages/teacher/Performance';

/**
 * TeacherRoutes - Nested routing for Teacher role
 * Handles all routes under /teacher/*
 * 
 * Uses TeacherLayout with Outlet for nested routing structure
 */
function TeacherRoutes() {
  return (
    <Routes>
      <Route element={<TeacherLayout />}>
        {/* Teacher Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="questions" element={<Questions />} />
        <Route path="exams" element={<Exams />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="performance" element={<Performance />} />
        
        {/* Default route - shows dashboard */}
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default TeacherRoutes;
