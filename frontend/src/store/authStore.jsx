import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Auth Context
 * Manages authentication state for the application
 * Handles JWT token and user data persistence
 */
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Provides authentication state and methods to child components
 */
export function AuthProvider({ children }) {
  // Initialize state from localStorage if available
  const [authState, setAuthState] = useState(() => {
    const storedAuth = localStorage.getItem('authState');
    const storedToken = localStorage.getItem('token');
    
    if (storedAuth && storedToken) {
      try {
        const parsed = JSON.parse(storedAuth);
        return {
          isAuthenticated: true,
          token: storedToken,
          user: parsed.user,
          role: parsed.role,
        };
      } catch (error) {
        // If parsing fails, clear storage
        localStorage.removeItem('authState');
        localStorage.removeItem('token');
      }
    }
    
    return {
      isAuthenticated: false,
      token: null,
      user: null,
      role: null,
    };
  });

  /**
   * Login function
   * Saves authentication data to state and localStorage
   * 
   * @param {Object} userData - User data from backend response
   * @param {string} token - JWT token from backend
   */
  const login = (userData, token) => {
    const authData = {
      isAuthenticated: true,
      token: token,
      user: userData,
      role: userData.role,
    };
    
    setAuthState(authData);
    
    // Save to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('authState', JSON.stringify({
      user: userData,
      role: userData.role,
    }));
  };

  /**
   * Logout function
   * Clears authentication state and localStorage
   */
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
      role: null,
    });
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('authState');
  };

  const value = {
    ...authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * Custom hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
