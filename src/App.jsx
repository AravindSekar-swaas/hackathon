/**
 * @confidential
 * @fileoverview Main application component
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { useState } from 'react';
import RepSelector from './components/RepSelector.jsx';
import RepProfile from './components/RepProfile.jsx';
import PerformanceMetrics from './components/PerformanceMetrics.jsx';
import AIInsights from './components/AIInsights.jsx';
import { REP_PERFORMANCE_DATA } from './constants/repData.js';
import { UI_TEXT, CSS_CLASSES } from './constants/uiConstants.js';

/**
 * Main App component
 * @description Root component for Medical Rep Performance Tracker application
 * @returns {JSX.Element} App component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const App = () => {
  const FIRST_REP_ID = REP_PERFORMANCE_DATA.reps[0]?.id || null;
  const [selectedRepId, setSelectedRepId] = useState(FIRST_REP_ID);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENAI_API_KEY || '');

  /**
   * Gets selected representative data
   * @description Finds rep object by ID
   * @returns {Object|null} Representative data or null
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const getSelectedRep = () => {
    if (!selectedRepId) {
      return null;
    }
    return REP_PERFORMANCE_DATA.reps.find(rep => rep.id === selectedRepId);
  };

  /**
   * Handles representative selection
   * @description Updates selected rep ID state
   * @param {string} repId - Representative ID
   * @returns {void}
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const handleSelectRep = repId => {
    setSelectedRepId(repId);
  };

  const selectedRep = getSelectedRep();

  return (
    <div className={CSS_CLASSES.CONTAINER}>
      <header className={`${CSS_CLASSES.HEADER} py-6 px-8`}>
        <div className='max-w-7xl mx-auto text-center'>
          <h1 className={`text-2xl font-bold ${CSS_CLASSES.TEXT_PRIMARY}`}>{UI_TEXT.APP_TITLE}</h1>
          <p className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY}`}>{UI_TEXT.COMPANY_NAME}</p>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-8 py-6'>
        <div className='flex justify-center mb-6'>
          <RepSelector
            reps={REP_PERFORMANCE_DATA.reps}
            selectedRepId={selectedRepId}
            onSelectRep={handleSelectRep}
          />
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
      </main>

      <footer className={`${CSS_CLASSES.HEADER} py-4 px-8 mt-12`}>
        <div className='max-w-7xl mx-auto text-center'>
          <p className={`text-xs ${CSS_CLASSES.TEXT_MUTED}`}>
            Data Range: {REP_PERFORMANCE_DATA.metadata.dataRange} | Last Updated:{' '}
            {REP_PERFORMANCE_DATA.metadata.lastUpdated}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
