/**
 * @confidential
 * @fileoverview Reusable Card component for consistent UI containers
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * Reusable Card component
 * @description Provides consistent styled container for content
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to render
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Enable hover effects
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Card component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const Card = ({ children, className = '', hover = false, onClick }) => {
  const { isDark } = useTheme();

  const baseClasses = `backdrop-blur-sm rounded-xl border transition-all duration-300 ${
    isDark
      ? 'bg-slate-800/50 border-slate-700'
      : 'bg-white border-gray-200 shadow-sm'
  }`;
  const hoverClasses = hover
    ? isDark
      ? 'hover:border-slate-600 hover:shadow-lg'
      : 'hover:border-gray-300 hover:shadow-md'
    : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${cursorClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
