/**
 * @confidential
 * @fileoverview AI-powered representative comparison component
 * @author Aravind Sekar
 * @created 15-12-2025
 */

import { useState } from 'react';
import Card from './common/Card.jsx';
import LoadingSpinner from './common/LoadingSpinner.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { generateComparisonInsights } from '../services/aiService.js';

/**
 * RepComparison component
 * @description Compares two representatives using AI analysis
 * @param {Object} props - Component props
 * @param {Array<Object>} props.reps - Array of all representatives
 * @param {string} props.apiKey - API key for AI service
 * @returns {JSX.Element} RepComparison component
 * @author Aravind Sekar
 * @created 15-12-2025
 * @confidential
 */
const RepComparison = ({ reps, apiKey }) => {
  const { isDark } = useTheme();
  const [rep1Id, setRep1Id] = useState('');
  const [rep2Id, setRep2Id] = useState('');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles comparison generation
   * @description Triggers AI comparison between two reps
   * @returns {Promise<void>}
   * @author Aravind Sekar
   * @created 15-12-2025
   * @confidential
   */
  const handleCompare = async () => {
    if (!rep1Id || !rep2Id) {
      setError('Please select two representatives to compare');
      return;
    }

    if (rep1Id === rep2Id) {
      setError('Please select two different representatives');
      return;
    }

    if (!apiKey) {
      setError('API key is required for AI comparison. Please configure your API key.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const rep1 = reps.find(r => r.id === rep1Id);
      const rep2 = reps.find(r => r.id === rep2Id);

      const result = await generateComparisonInsights(rep1, rep2, apiKey);
      setComparison(result);
    } catch (err) {
      setError(`AI Comparison failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  /**
   * Gets representative name by ID
   * @description Finds rep name from ID
   * @param {string} repId - Representative ID
   * @returns {string} Representative name
   * @author Aravind Sekar
   * @created 15-12-2025
   * @confidential
   */
  const getRepName = repId => {
    const rep = reps.find(r => r.id === repId);
    return rep ? rep.personalInfo.name : '';
  };

  return (
    <div className='mb-6'>
      <Card className='p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <span className='text-3xl'>⚖️</span>
          <h2 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            AI-Powered Rep Comparison
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              Select First Representative
            </label>
            <select
              value={rep1Id}
              onChange={e => setRep1Id(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-100'
                  : 'bg-white border-gray-300 text-slate-900'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            >
              <option value=''>-- Select Rep 1 --</option>
              {reps
                .filter(rep => rep.id !== rep2Id)
                .map(rep => (
                  <option key={rep.id} value={rep.id}>
                    {rep.personalInfo.name} - {rep.personalInfo.territory}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              Select Second Representative
            </label>
            <select
              value={rep2Id}
              onChange={e => setRep2Id(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-100'
                  : 'bg-white border-gray-300 text-slate-900'
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            >
              <option value=''>-- Select Rep 2 --</option>
              {reps
                .filter(rep => rep.id !== rep1Id)
                .map(rep => (
                  <option key={rep.id} value={rep.id}>
                    {rep.personalInfo.name} - {rep.personalInfo.territory}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {!apiKey && (
          <div className='mt-4 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg'>
            <div className='flex items-center gap-2'>
              <span className='text-xl'>⚠️</span>
              <div>
                <p className='text-sm font-semibold text-yellow-400'>API Key Required</p>
                <p className='text-xs text-yellow-300 mt-1'>
                  Please configure your OpenAI or Anthropic API key in the .env file to use AI comparison.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCompare}
          disabled={!rep1Id || !rep2Id || loading || !apiKey}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
            !rep1Id || !rep2Id || loading || !apiKey
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-teal-600 hover:bg-teal-700 transform hover:scale-105'
          } text-white`}
        >
          {loading ? 'Analyzing...' : !apiKey ? '🔒 API Key Required' : '🤖 Compare with AI'}
        </button>

        {error && (
          <div className='mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg'>
            <p className='text-sm text-red-400'>{error}</p>
          </div>
        )}
      </Card>

      {loading && (
        <Card className='p-6 mt-6'>
          <LoadingSpinner message='AI is analyzing both representatives...' />
        </Card>
      )}

      {comparison && !loading && (
        <div className='mt-6 space-y-4'>
          <Card className='p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <span className='text-2xl'>📊</span>
              <h3 className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Comparison Summary
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {comparison.summary}
            </p>
          </Card>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Card className='p-6 bg-blue-500/10 border-l-4 border-blue-500'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-xl'>💪</span>
                <h3 className='font-semibold text-blue-400'>{getRepName(rep1Id)} Strengths</h3>
              </div>
              <ul className='space-y-2'>
                {comparison.rep1Strengths.map((strength, index) => (
                  <li
                    key={index}
                    className={`text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-400 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {strength}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className='p-6 bg-green-500/10 border-l-4 border-green-500'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-xl'>💪</span>
                <h3 className='font-semibold text-green-400'>{getRepName(rep2Id)} Strengths</h3>
              </div>
              <ul className='space-y-2'>
                {comparison.rep2Strengths.map((strength, index) => (
                  <li
                    key={index}
                    className={`text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-green-400 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {strength}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className='p-6 bg-yellow-500/10 border-l-4 border-yellow-500'>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-xl'>🔍</span>
              <h3 className='font-semibold text-yellow-400'>Key Differences</h3>
            </div>
            <ul className='space-y-2'>
              {comparison.keyDifferences.map((diff, index) => (
                <li
                  key={index}
                  className={`text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-yellow-400 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {diff}
                </li>
              ))}
            </ul>
          </Card>

          <Card className='p-6 bg-purple-500/10 border-l-4 border-purple-500'>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-xl'>💡</span>
              <h3 className='font-semibold text-purple-400'>AI Recommendations</h3>
            </div>
            <ul className='space-y-2'>
              {comparison.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className={`text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-purple-400 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {rec}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RepComparison;

