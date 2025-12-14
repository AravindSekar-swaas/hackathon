/**
 * @confidential
 * @fileoverview Single representative view component
 * @author Aravind Sekar
 * @created 15-12-2025
 */

import RepSelector from './RepSelector.jsx';
import RepProfile from './RepProfile.jsx';
import PerformanceMetrics from './PerformanceMetrics.jsx';
import AIInsights from './AIInsights.jsx';

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
 * @created 15-12-2025
 * @confidential
 */
const SingleRepView = ({ reps, selectedRepId, onSelectRep, apiKey }) => {
  /**
   * Gets selected representative data
   * @description Finds rep object by ID
   * @returns {Object|null} Representative data or null
   * @author Aravind Sekar
   * @created 15-12-2025
   * @confidential
   */
  const getSelectedRep = () => {
    if (!selectedRepId) {
      return null;
    }
    return reps.find(rep => rep.id === selectedRepId);
  };

  const selectedRep = getSelectedRep();

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
            <PerformanceMetrics rep={selectedRep} />
            <AIInsights rep={selectedRep} apiKey={apiKey} />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleRepView;

