import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Auth Context
 * Manages authentication state for the application
 */
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Provides authentication state and methods to child components
 */
export function AuthProvider({ children }) {
  // Initialize state from localStorage if available
  const [authState, setAuthState] = useState(() => {
    const stored = localStorage.getItem('authState');
    return stored
      ? JSON.parse(stored)
      : {
          isAuthenticated: false,
          role: null,
          user: null,
        };
  });

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  /**
   * Login function
   * Sets authentication state and role
   */
  const login = (role, userData = null) => {
    setAuthState({
      isAuthenticated: true,
      role: role,
      user: userData || { email: 'user@example.com' },
    });
  };

  /**
   * Logout function
   * Clears authentication state
   */
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      role: null,
      user: null,
    });
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
