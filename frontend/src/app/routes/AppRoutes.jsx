import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Role-based login pages
import SuperAdminLogin from '../../pages/auth/SuperAdminLogin';
import InstituteLogin from '../../pages/auth/InstituteLogin';
import TeacherLogin from '../../pages/auth/TeacherLogin';
import StudentLogin from '../../pages/auth/StudentLogin';
import ParentLogin from '../../pages/auth/ParentLogin';

// Login redirect component
import LoginRedirect from '../../components/common/LoginRedirect';

// Route guards
import AuthGuard from '../guards/AuthGuard';
import RoleGuard from '../guards/RoleGuard';

// Role-based route modules
import SuperAdminRoutes from './SuperAdminRoutes';
import InstituteRoutes from './InstituteRoutes';
import TeacherRoutes from './TeacherRoutes';
import StudentRoutes from './StudentRoutes';
import ParentRoutes from './ParentRoutes';

// Public pages
import PublicHome from '../../pages/public/PublicHome';
import Register from '../../pages/auth/Register';

/**
 * AppRoutes component - Main routing configuration
 * Defines all routes for the Online Examination & Practice Platform
 * Uses nested routing for role-based routes to support scalable SaaS architecture
 * Implements URL-based role login system
 */
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/register" element={<Register />} />
        
        {/* Role-based Login Routes */}
        {/* /superadmin shows login page, redirects to dashboard if already authenticated */}
        <Route
          path="/superadmin"
          element={
            <LoginRedirect role="SUPER_ADMIN" dashboardPath="/superadmin/dashboard">
              <SuperAdminLogin />
            </LoginRedirect>
          }
        />
        
        {/* /institute shows login page, redirects to dashboard if already authenticated */}
        <Route
          path="/institute"
          element={
            <LoginRedirect role="INSTITUTE_ADMIN" dashboardPath="/institute/dashboard">
              <InstituteLogin />
            </LoginRedirect>
          }
        />
        
        {/* /teacher shows login page, redirects to dashboard if already authenticated */}
        <Route
          path="/teacher"
          element={
            <LoginRedirect role="TEACHER" dashboardPath="/teacher/dashboard">
              <TeacherLogin />
            </LoginRedirect>
          }
        />
        
        {/* /student shows login page, redirects to dashboard if already authenticated */}
        <Route
          path="/student"
          element={
            <LoginRedirect role="STUDENT" dashboardPath="/student/dashboard">
              <StudentLogin />
            </LoginRedirect>
          }
        />
        
        {/* /parent shows login page, redirects to dashboard if already authenticated */}
        <Route
          path="/parent"
          element={
            <LoginRedirect role="PARENT" dashboardPath="/parent/dashboard">
              <ParentLogin />
            </LoginRedirect>
          }
        />
        
        {/* Role-based Nested Routes with Route Protection */}
        {/* 
          All routes under /superadmin/* are protected by:
          1. AuthGuard - Checks if user is authenticated, redirects to /superadmin if not
          2. RoleGuard - Checks if user role is SUPER_ADMIN, redirects to own dashboard if mismatch
        */}
        <Route
          path="/superadmin/*"
          element={
            <AuthGuard requiredRole="SUPER_ADMIN">
              <RoleGuard requiredRole="SUPER_ADMIN">
                <SuperAdminRoutes />
              </RoleGuard>
            </AuthGuard>
          }
        />
        
        {/* 
          All routes under /institute/* are protected by:
          1. AuthGuard - Checks if user is authenticated, redirects to /institute if not
          2. RoleGuard - Checks if user role is INSTITUTE_ADMIN, redirects to own dashboard if mismatch
        */}
        <Route
          path="/institute/*"
          element={
            <AuthGuard requiredRole="INSTITUTE_ADMIN">
              <RoleGuard requiredRole="INSTITUTE_ADMIN">
                <InstituteRoutes />
              </RoleGuard>
            </AuthGuard>
          }
        />
        
        {/* 
          All routes under /teacher/* are protected by:
          1. AuthGuard - Checks if user is authenticated, redirects to /teacher if not
          2. RoleGuard - Checks if user role is TEACHER, redirects to own dashboard if mismatch
        */}
        <Route
          path="/teacher/*"
          element={
            <AuthGuard requiredRole="TEACHER">
              <RoleGuard requiredRole="TEACHER">
                <TeacherRoutes />
              </RoleGuard>
            </AuthGuard>
          }
        />
        
        {/* 
          All routes under /student/* are protected by:
          1. AuthGuard - Checks if user is authenticated, redirects to /student if not
          2. RoleGuard - Checks if user role is STUDENT, redirects to own dashboard if mismatch
        */}
        <Route
          path="/student/*"
          element={
            <AuthGuard requiredRole="STUDENT">
              <RoleGuard requiredRole="STUDENT">
                <StudentRoutes />
              </RoleGuard>
            </AuthGuard>
          }
        />
        
        {/* 
          All routes under /parent/* are protected by:
          1. AuthGuard - Checks if user is authenticated, redirects to /parent if not
          2. RoleGuard - Checks if user role is PARENT, redirects to own dashboard if mismatch
        */}
        <Route
          path="/parent/*"
          element={
            <AuthGuard requiredRole="PARENT">
              <RoleGuard requiredRole="PARENT">
                <ParentRoutes />
              </RoleGuard>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
