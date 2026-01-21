/**
 * Role Mappings Configuration
 * Maps roles to their login URLs and dashboard URLs
 * Used by route guards for authentication and authorization
 */

export const roleMappings = {
  SUPER_ADMIN: {
    loginUrl: '/superadmin',
    dashboardUrl: '/superadmin/dashboard',
  },
  INSTITUTE_ADMIN: {
    loginUrl: '/institute',
    dashboardUrl: '/institute/dashboard',
  },
  TEACHER: {
    loginUrl: '/teacher',
    dashboardUrl: '/teacher/dashboard',
  },
  STUDENT: {
    loginUrl: '/student',
    dashboardUrl: '/student/dashboard',
  },
  PARENT: {
    loginUrl: '/parent',
    dashboardUrl: '/parent/dashboard',
  },
};

/**
 * Get login URL for a role
 * @param {string} role - Role identifier
 * @returns {string} Login URL for the role
 */
export function getLoginUrl(role) {
  return roleMappings[role]?.loginUrl || '/';
}

/**
 * Get dashboard URL for a role
 * @param {string} role - Role identifier
 * @returns {string} Dashboard URL for the role
 */
export function getDashboardUrl(role) {
  return roleMappings[role]?.dashboardUrl || '/';
}
