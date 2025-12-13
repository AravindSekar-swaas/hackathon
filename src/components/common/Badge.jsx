/**
 * @confidential
 * @fileoverview Reusable Badge component for labels and tags
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { CSS_CLASSES } from '../../constants/uiConstants.js';

const BADGE_VARIANTS = {
  success: CSS_CLASSES.BADGE_SUCCESS,
  warning: CSS_CLASSES.BADGE_WARNING,
  danger: CSS_CLASSES.BADGE_DANGER,
  info: CSS_CLASSES.BADGE_INFO
};

/**
 * Badge component
 * @description Displays colored badge for labels and status
 * @param {Object} props - Component props
 * @param {string} props.children - Badge text content
 * @param {string} props.variant - Color variant: 'success', 'warning', 'danger', 'info'
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Badge component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const Badge = ({ children, variant = 'info', className = '' }) => {
  const variantClass = BADGE_VARIANTS[variant] || BADGE_VARIANTS.info;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variantClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
