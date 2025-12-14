/**
 * @confidential
 * @fileoverview Application header component
 * @author Aravind Sekar
 * @created 15-12-2025
 */

import ThemeToggle from './common/ThemeToggle.jsx';
import ViewToggle from './ViewToggle.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { UI_TEXT } from '../constants/uiConstants.js';

/**
 * AppHeader component
 * @description Main application header with title and controls
 * @param {Object} props - Component props
 * @param {string} props.viewMode - Current view mode
 * @param {Function} props.onViewChange - View mode change handler
 * @returns {JSX.Element} AppHeader component
 * @author Aravind Sekar
 * @created 15-12-2025
 * @confidential
 */
const AppHeader = ({ viewMode, onViewChange }) => {
  const { isDark } = useTheme();

  return (
    <header
      className={`py-6 px-8 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-gray-200'
      }`}
    >
      <div className='max-w-7xl mx-auto text-center relative'>
        <div className='absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3'>
          <ViewToggle viewMode={viewMode} onViewChange={onViewChange} />
          <ThemeToggle />
        </div>
        <h1
          className={`text-2xl font-bold transition-colors ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          {UI_TEXT.APP_TITLE}
        </h1>
        <p
          className={`text-sm transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
        >
          {UI_TEXT.COMPANY_NAME}
        </p>
      </div>
    </header>
  );
};

export default AppHeader;

