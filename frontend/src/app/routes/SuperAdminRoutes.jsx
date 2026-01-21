import { Routes, Route } from 'react-router-dom';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import Dashboard from '../../pages/superadmin/Dashboard';
import Institutes from '../../pages/superadmin/Institutes';
import Subscriptions from '../../pages/superadmin/Subscriptions';
import Payments from '../../pages/superadmin/Payments';
import Analytics from '../../pages/superadmin/Analytics';
import Settings from '../../pages/superadmin/Settings';

/**
 * SuperAdminRoutes - Nested routing for Super Admin role
 * Handles all routes under /superadmin/*
 * 
 * Uses SuperAdminLayout with Outlet for nested routing structure
 */
function SuperAdminRoutes() {
  return (
    <Routes>
      <Route element={<SuperAdminLayout />}>
        {/* Super Admin Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="institutes" element={<Institutes />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="payments" element={<Payments />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        
        {/* Default route - shows dashboard */}
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default SuperAdminRoutes;
