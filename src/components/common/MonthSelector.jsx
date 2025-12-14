/**
 * @confidential
 * @fileoverview Month selector dropdown component
 * @author Aravind Sekar
 * @created 14-12-2025
 */

import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * MonthSelector component
 * @description Dropdown to select a specific month for viewing data
 * @param {Object} props - Component props
 * @param {Array<string>} props.availableMonths - Array of available month strings
 * @param {string} props.selectedMonth - Currently selected month
 * @param {Function} props.onMonthChange - Month selection change handler
 * @returns {JSX.Element} MonthSelector component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const MonthSelector = ({ availableMonths, selectedMonth, onMonthChange }) => {
  const { isDark } = useTheme();

  return (
    <div className='flex items-center gap-3 mb-4'>
      <label
        className={`text-sm font-medium whitespace-nowrap ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}
      >
        Select Month:
      </label>
      <select
        value={selectedMonth || ''}
        onChange={e => onMonthChange(e.target.value)}
        className={`px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
          isDark
            ? 'bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-700'
            : 'bg-white border-gray-300 text-slate-900 hover:bg-gray-50'
        }`}
      >
        <option value=''>Latest Month</option>
        {availableMonths.map(month => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
