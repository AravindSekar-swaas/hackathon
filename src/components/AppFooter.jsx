/**
 * @confidential
 * @fileoverview Application footer component
 * @author Aravind Sekar
 * @created 14-12-2025
 */

import { useTheme } from '../context/ThemeContext.jsx';

/**
 * AppFooter component
 * @description Application footer with metadata
 * @param {Object} props - Component props
 * @param {Object} props.metadata - Metadata object with dataRange and lastUpdated
 * @returns {JSX.Element} AppFooter component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const AppFooter = ({ metadata }) => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`py-4 px-8 mt-12 backdrop-blur-sm border-t transition-colors duration-300 ${
        isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-gray-200'
      }`}
    >
      <div className='max-w-7xl mx-auto text-center'>
        <p className={`text-xs transition-colors ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
          Data Range: {metadata.dataRange} | Last Updated: {metadata.lastUpdated}
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
