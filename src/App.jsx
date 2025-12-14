/**
 * @confidential
 * @fileoverview Main application component
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import AppFooter from './components/AppFooter.jsx';
import SingleRepView from './components/SingleRepView.jsx';
import RepComparison from './components/RepComparison.jsx';
import { REP_PERFORMANCE_DATA } from './constants/repData.js';
import { useTheme } from './context/ThemeContext.jsx';
import { useRepSelection } from './hooks/useRepSelection.js';
import { useViewMode } from './hooks/useViewMode.js';

/**
 * Main App component
 * @description Root component for Medical Rep Performance Tracker application
 * @returns {JSX.Element} App component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const App = () => {
  const { isDark } = useTheme();
  const FIRST_REP_ID = REP_PERFORMANCE_DATA.reps[0]?.id || null;
  const { selectedRepId, handleSelectRep } = useRepSelection(FIRST_REP_ID);
  const { viewMode, handleViewChange } = useViewMode('single');
  const [apiKey] = useState(import.meta.env.VITE_OPENAI_API_KEY || '');

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      }`}
    >
      <AppHeader viewMode={viewMode} onViewChange={handleViewChange} />

      <main className='max-w-7xl mx-auto px-8 py-6'>
        {viewMode === 'single' ? (
          <SingleRepView
            reps={REP_PERFORMANCE_DATA.reps}
            selectedRepId={selectedRepId}
            onSelectRep={handleSelectRep}
            apiKey={apiKey}
          />
        ) : (
          <RepComparison reps={REP_PERFORMANCE_DATA.reps} apiKey={apiKey} />
        )}
      </main>

      <AppFooter metadata={REP_PERFORMANCE_DATA.metadata} />
    </div>
  );
};

export default App;
