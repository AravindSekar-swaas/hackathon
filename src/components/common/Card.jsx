/**
 * @confidential
 * @fileoverview Reusable Card component for consistent UI containers
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { CSS_CLASSES } from '../../constants/uiConstants.js';

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
  const baseClasses = CSS_CLASSES.CARD;
  const hoverClasses = hover ? CSS_CLASSES.CARD_HOVER : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${cursorClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
