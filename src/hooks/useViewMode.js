/**
 * @confidential
 * @fileoverview Custom hook for view mode management
 * @author Aravind Sekar
 * @created 14-12-2025
 */

import { useState } from 'react';

/**
 * Custom hook for managing view mode
 * @description Handles view mode state ('single' | 'compare')
 * @param {string} initialMode - Initial view mode
 * @returns {Object} View mode state and handlers
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
export const useViewMode = (initialMode = 'single') => {
  const [viewMode, setViewMode] = useState(initialMode);

  /**
   * Handles view mode change
   * @description Updates view mode state
   * @param {string} mode - New view mode ('single' | 'compare')
   * @returns {void}
   * @author Aravind Sekar
   * @created 14-12-2025
   * @confidential
   */
  const handleViewChange = mode => {
    setViewMode(mode);
  };

  return {
    viewMode,
    handleViewChange
  };
};
