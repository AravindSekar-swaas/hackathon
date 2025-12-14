/**
 * @confidential
 * @fileoverview Theme context for managing light/dark mode
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEME_KEY = 'app-theme';

/**
 * Theme Provider Component
 * @description Provides theme context to entire application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ThemeProvider component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  /**
   * Toggles between light and dark theme
   * @description Switches theme and saves to localStorage
   * @returns {void}
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to use theme context
 * @description Provides access to theme state and toggle function
 * @returns {Object} Theme context value
 * @throws {Error} If used outside ThemeProvider
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
