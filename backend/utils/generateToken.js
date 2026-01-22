import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token
 * Creates a JSON Web Token for authenticated users
 * 
 * @param {string} userId - User's MongoDB _id
 * @returns {string} - JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};
