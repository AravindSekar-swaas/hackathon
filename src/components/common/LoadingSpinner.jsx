/**
 * @confidential
 * @fileoverview Loading spinner component
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { UI_TEXT, CSS_CLASSES } from '../../constants/uiConstants.js';

/**
 * LoadingSpinner component
 * @description Displays animated loading indicator
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message text
 * @returns {JSX.Element} LoadingSpinner component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const LoadingSpinner = ({ message = UI_TEXT.LOADING }) => {
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <div className='relative w-16 h-16'>
        <div className='absolute inset-0 border-4 border-slate-700 rounded-full'></div>
        <div className='absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin'></div>
      </div>
      <p className={`mt-4 text-sm ${CSS_CLASSES.TEXT_SECONDARY}`}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
