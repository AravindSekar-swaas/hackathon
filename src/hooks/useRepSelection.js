/**
 * @confidential
 * @fileoverview Custom hook for representative selection logic
 * @author Aravind Sekar
 * @created 14-12-2025
 */

import { useState } from 'react';

/**
 * Custom hook for managing representative selection
 * @description Handles rep selection state and logic
 * @param {string} initialRepId - Initial selected rep ID
 * @returns {Object} Rep selection state and handlers
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
export const useRepSelection = initialRepId => {
  const [selectedRepId, setSelectedRepId] = useState(initialRepId);

  /**
   * Handles representative selection
   * @description Updates selected rep ID state
   * @param {string} repId - Representative ID
   * @returns {void}
   * @author Aravind Sekar
   * @created 14-12-2025
   * @confidential
   */
  const handleSelectRep = repId => {
    setSelectedRepId(repId);
  };

  return {
    selectedRepId,
    handleSelectRep
  };
};
