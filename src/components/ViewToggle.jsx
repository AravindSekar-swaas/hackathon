/**
 * @confidential
 * @fileoverview View mode toggle component
 * @author Aravind Sekar
 * @created 14-12-2025
 */

import { useTheme } from '../context/ThemeContext.jsx';

/**
 * ViewToggle component
 * @description Toggle buttons for switching between single and compare views
 * @param {Object} props - Component props
 * @param {string} props.viewMode - Current view mode ('single' | 'compare')
 * @param {Function} props.onViewChange - Callback when view mode changes
 * @returns {JSX.Element} ViewToggle component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const ViewToggle = ({ viewMode, onViewChange }) => {
  const { isDark } = useTheme();

  /**
   * Gets button style classes
   * @description Returns appropriate classes based on active state
   * @param {boolean} isActive - Whether button is active
   * @returns {string} CSS classes
   * @author Aravind Sekar
   * @created 14-12-2025
   * @confidential
   */
  const getButtonClasses = isActive => {
    if (isActive) {
      return 'bg-teal-600 text-white';
    }
    return isDark
      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
      : 'bg-gray-200 text-slate-700 hover:bg-gray-300';
  };

  return (
    <div className='flex items-center gap-3'>
      <button
        onClick={() => onViewChange('single')}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${getButtonClasses(
          viewMode === 'single'
        )}`}
      >
        Single View
      </button>
      <button
        onClick={() => onViewChange('compare')}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${getButtonClasses(
          viewMode === 'compare'
        )}`}
      >
        ⚖️ Compare
      </button>
    </div>
  );
};

export default ViewToggle;
