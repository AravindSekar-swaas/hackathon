/**
 * @confidential
 * @fileoverview Single representative view component
 * @author Aravind Sekar
 * @created 14-12-2025
 */

import { useState, useEffect } from 'react';
import RepSelector from './RepSelector.jsx';
import RepProfile from './RepProfile.jsx';
import PerformanceMetrics from './PerformanceMetrics.jsx';
import AIInsights from './AIInsights.jsx';
import MonthSelector from './common/MonthSelector.jsx';
import { getAvailableMonths } from '../utils/performanceUtils.js';

/**
 * SingleRepView component
 * @description Displays single representative view with profile and metrics
 * @param {Object} props - Component props
 * @param {Array<Object>} props.reps - Array of all representatives
 * @param {string} props.selectedRepId - Currently selected rep ID
 * @param {Function} props.onSelectRep - Rep selection handler
 * @param {string} props.apiKey - API key for AI service
 * @returns {JSX.Element} SingleRepView component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const SingleRepView = ({ reps, selectedRepId, onSelectRep, apiKey }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  /**
   * Gets selected representative data
   * @description Finds rep object by ID
   * @returns {Object|null} Representative data or null
   * @author Aravind Sekar
   * @created 14-12-2025
   * @confidential
   */
  const getSelectedRep = () => {
    if (!selectedRepId) {
      return null;
    }
    return reps.find(rep => rep.id === selectedRepId);
  };

  const selectedRep = getSelectedRep();

  /**
   * Resets month selection when rep changes
   * @description Clears selected month when switching representatives
   * @author Aravind Sekar
   * @created 14-12-2025
   * @confidential
   */
  useEffect(() => {
    setSelectedMonth('');
  }, [selectedRepId]);

  /**
   * Gets available months for selected rep
   * @description Extracts available months from rep's performance data
   * @returns {Array<string>} Array of available month strings
   * @author Aravind Sekar
   * @created 14-12-2025
   * @confidential
   */
  const availableMonths = selectedRep ? getAvailableMonths(selectedRep.monthlyPerformance) : [];

  return (
    <>
      <div className='flex justify-center mb-6'>
        <RepSelector reps={reps} selectedRepId={selectedRepId} onSelectRep={onSelectRep} />
      </div>

      {selectedRep && (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6'>
          <div className='lg:col-span-4'>
            <RepProfile rep={selectedRep} />
          </div>

          <div className='lg:col-span-8'>
            <MonthSelector
              availableMonths={availableMonths}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
            />
            <PerformanceMetrics rep={selectedRep} selectedMonth={selectedMonth} />
            <AIInsights rep={selectedRep} apiKey={apiKey} selectedMonth={selectedMonth} />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleRepView;
