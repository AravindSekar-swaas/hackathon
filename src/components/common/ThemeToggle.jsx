/**
 * @confidential
 * @fileoverview Theme toggle button component
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * ThemeToggle component
 * @description Button to switch between light and dark themes
 * @returns {JSX.Element} ThemeToggle component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-slate-700 hover:bg-slate-600'
      aria-label='Toggle theme'
    >
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-transform duration-300 flex items-center justify-center ${
          theme === 'dark'
            ? 'translate-x-0 bg-slate-900'
            : 'translate-x-7 bg-yellow-400'
        }`}
      >
        {theme === 'dark' ? (
          <span className='text-xs'>🌙</span>
        ) : (
          <span className='text-xs'>☀️</span>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;

