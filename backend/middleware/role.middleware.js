/**
 * Role-based Access Control Middleware
 * Checks if user's role matches required role(s)
 * Must be used after auth.middleware (protect)
 * 
 * @param {...string} roles - Allowed roles for the route
 * @returns {Function} - Express middleware function
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user exists (should be set by auth.middleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, please login',
      });
    }

    // Check if user's role is in the allowed roles array
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }

    next();
  };
};
