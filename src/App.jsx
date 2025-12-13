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
  const [selectedRepId, setSelectedRepId] = useState(null);
  const [apiKey, setApiKey] = useState('');

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
      <header className={`${CSS_CLASSES.HEADER} py-6 px-8 sticky top-0 z-10`}>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <div>
            <h1 className={`text-2xl font-bold ${CSS_CLASSES.TEXT_PRIMARY}`}>
              {UI_TEXT.APP_TITLE}
            </h1>
            <p className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY}`}>{UI_TEXT.COMPANY_NAME}</p>
          </div>

          {selectedRep && (
            <button
              onClick={() => setSelectedRepId(null)}
              className={`${CSS_CLASSES.BUTTON_SECONDARY} px-4 py-2 text-sm`}
            >
              ← Back to Selection
            </button>
          )}
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-8 py-8'>
        {!selectedRep ? (
          <RepSelector
            reps={REP_PERFORMANCE_DATA.reps}
            selectedRepId={selectedRepId}
            onSelectRep={handleSelectRep}
          />
        ) : (
          <>
            <RepProfile rep={selectedRep} />
            <PerformanceMetrics rep={selectedRep} />
            <AIInsights rep={selectedRep} apiKey={apiKey} />
          </>
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
