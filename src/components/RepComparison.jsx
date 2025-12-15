/**
 * @confidential
 * @fileoverview AI-powered representative comparison component
 * @author Aravind Sekar
 * @created 14-12-2025
 */

import { useState, useMemo } from 'react';
import Card from './common/Card.jsx';
import LoadingSpinner from './common/LoadingSpinner.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { generateComparisonInsights } from '../services/aiService.js';
import { getInitials, getLatestMetrics, formatNumber } from '../utils/performanceUtils.js';
import { AVATAR_COLORS } from '../constants/uiConstants.js';

// ============================================================================
// CONSTANTS
// ============================================================================

const ERROR_MESSAGES = {
  NO_SELECTION: 'Please select two representatives to compare',
  SAME_SELECTION: 'Please select two different representatives',
  NO_API_KEY: 'API key is required for AI comparison. Please configure your API key.',
  COMPARISON_FAILED: 'AI Comparison failed'
};

const METRIC_COMPARISON_CONFIG = [
  { key: 'visits', label: 'Doctor Visits', icon: '👨‍⚕️' },
  { key: 'coverage', label: 'Coverage', icon: '📊', unit: '%' },
  { key: 'samples', label: 'Samples', icon: '💊' },
  { key: 'calls', label: 'CRM Calls', icon: '📞' }
];

const INSIGHT_CARD_CONFIG = {
  rep1Strengths: {
    title: 'Strengths',
    icon: '💪',
    color: 'blue',
    bullet: '✓',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500',
    bg: 'bg-blue-500/20',
    text: 'text-blue-400'
  },
  rep2Strengths: {
    title: 'Strengths',
    icon: '💪',
    color: 'green',
    bullet: '✓',
    gradient: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500',
    bg: 'bg-green-500/20',
    text: 'text-green-400'
  },
  keyDifferences: {
    title: 'Key Differences',
    icon: '🔍',
    color: 'yellow',
    bullet: '→',
    gradient: 'from-yellow-500/10 to-amber-500/10',
    border: 'border-yellow-500',
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400'
  },
  recommendations: {
    title: 'AI Recommendations',
    icon: '💡',
    color: 'purple',
    bullet: '★',
    gradient: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500',
    bg: 'bg-purple-500/20',
    text: 'text-purple-400'
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Compares two metric values
 * @description Returns comparison result with winner
 * @param {number} value1 - First value
 * @param {number} value2 - Second value
 * @returns {Object} Comparison result
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const compareMetricValues = (value1, value2) => {
  const diff = value1 - value2;

  return {
    winner: diff > 0 ? 1 : diff < 0 ? 2 : 0,
    difference: Math.abs(diff),
    isEqual: diff === 0
  };
};

/**
 * Gets avatar color class for representative
 * @description Returns gradient class based on index
 * @param {number} index - Rep index in array
 * @returns {string} CSS gradient class
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const getAvatarColorClass = index => {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Rep Selector Dropdown Component
 * @description Dropdown for selecting a representative
 * @param {Object} props - Component props
 * @param {string} props.label - Label text
 * @param {string} props.value - Selected rep ID
 * @param {Function} props.onChange - Change handler
 * @param {Array} props.reps - Available reps
 * @param {string} props.excludeId - Rep ID to exclude
 * @param {boolean} props.isDark - Dark theme flag
 * @returns {JSX.Element} RepSelector component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const RepSelector = ({ label, value, onChange, reps, excludeId, isDark }) => {
  const availableReps = reps.filter(rep => rep.id !== excludeId);

  return (
    <div>
      <label
        className={`block text-sm font-semibold mb-3 ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}
      >
        <span className='flex items-center gap-2'>
          <span className='text-lg'>👤</span>
          {label}
        </span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
          isDark
            ? 'bg-slate-700/50 border-slate-600 text-slate-100'
            : 'bg-white border-gray-300 text-slate-900'
        } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-400`}
      >
        <option value=''>-- Select Rep --</option>
        {availableReps.map(rep => (
          <option key={rep.id} value={rep.id}>
            {rep.personalInfo.name} - {rep.personalInfo.territory}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * VS Divider Component
 * @description Visual divider between two rep cards
 * @param {boolean} props.isMobile - Mobile view flag
 * @returns {JSX.Element} VSDivider component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const VSDivider = ({ isMobile = false }) => {
  const baseClasses =
    'w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-slate-800';

  if (isMobile) {
    return (
      <div className='lg:hidden flex items-center justify-center py-4'>
        <div className={baseClasses}>VS</div>
      </div>
    );
  }

  return (
    <div className='hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-10'>
      <div className={`${baseClasses} animate-pulse`}>VS</div>
    </div>
  );
};

/**
 * Rep Card Component
 * @description Displays representative profile card
 * @param {Object} props - Component props
 * @param {Object} props.rep - Representative data
 * @param {Object} props.metrics - Latest metrics
 * @param {number} props.repIndex - Rep index for avatar color
 * @param {string} props.colorScheme - Color scheme (blue/green)
 * @param {boolean} props.isDark - Dark theme flag
 * @returns {JSX.Element} RepCard component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const RepCard = ({ rep, metrics, repIndex, colorScheme, isDark }) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500/10 to-teal-500/10',
      border: 'border-blue-500/30 hover:border-blue-500/50',
      text: isDark ? 'text-blue-300' : 'text-blue-700',
      bg: 'bg-blue-500/10',
      borderBottom: 'border-blue-500/20'
    },
    green: {
      gradient: 'from-green-500/10 to-emerald-500/10',
      border: 'border-green-500/30 hover:border-green-500/50',
      text: isDark ? 'text-green-300' : 'text-green-700',
      bg: 'bg-green-500/10',
      borderBottom: 'border-green-500/20'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <Card
      className={`p-6 bg-gradient-to-br ${colors.gradient} ${colors.border} transition-all hover:shadow-xl`}
    >
      <div className='flex flex-col items-center mb-4'>
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-3 ${getAvatarColorClass(
            repIndex
          )}`}
        >
          {getInitials(rep.personalInfo.name)}
        </div>
        <h3 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          {rep.personalInfo.name}
        </h3>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          📍 {rep.personalInfo.territory}
        </p>
      </div>

      {metrics && (
        <div className='space-y-3'>
          <div className={`flex justify-between items-center py-2 border-b ${colors.borderBottom}`}>
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Target Achievement
            </span>
            <span className={`text-sm font-bold ${colors.text}`}>
              {rep.performanceSummary.avgTargetAchievement}%
            </span>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div className={`text-center p-2 ${colors.bg} rounded`}>
              <div className='text-xs text-slate-400 mb-1'>Visits</div>
              <div className={`text-lg font-bold ${colors.text}`}>
                {formatNumber(metrics.visits)}
              </div>
            </div>
            <div className={`text-center p-2 ${colors.bg} rounded`}>
              <div className='text-xs text-slate-400 mb-1'>Coverage</div>
              <div className={`text-lg font-bold ${colors.text}`}>{metrics.coverage}%</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

/**
 * Metrics Comparison Row Component
 * @description Single row in metrics comparison table
 * @param {Object} props - Component props
 * @param {Object} props.metric - Metric configuration
 * @param {number} props.value1 - First rep value
 * @param {number} props.value2 - Second rep value
 * @param {string} props.rep1Name - First rep name
 * @param {string} props.rep2Name - Second rep name
 * @param {boolean} props.isDark - Dark theme flag
 * @returns {JSX.Element} MetricRow component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const MetricRow = ({ metric, value1, value2, rep1Name, rep2Name, isDark }) => {
  const comparison = compareMetricValues(value1, value2);

  const getRowStyles = () => {
    if (comparison.winner === 1) {
      return 'bg-blue-500/10 border-blue-500/30';
    }
    if (comparison.winner === 2) {
      return 'bg-green-500/10 border-green-500/30';
    }
    return 'bg-slate-500/10 border-slate-500/30';
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getRowStyles()}`}>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div className='flex items-center gap-3'>
          <span className='text-2xl'>{metric.icon}</span>
          <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {metric.label}
          </span>
        </div>
        <div className='flex items-center gap-4 md:gap-6'>
          <div className='text-center'>
            <div className={`text-lg font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              {formatNumber(value1)}
              {metric.unit || ''}
            </div>
            <div className='text-xs text-slate-500'>{rep1Name}</div>
          </div>
          <div className='text-xl md:text-2xl font-bold text-slate-500'>VS</div>
          <div className='text-center'>
            <div className={`text-lg font-bold ${isDark ? 'text-green-300' : 'text-green-700'}`}>
              {formatNumber(value2)}
              {metric.unit || ''}
            </div>
            <div className='text-xs text-slate-500'>{rep2Name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Insight Card Component
 * @description Displays AI insight card with list items
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.icon - Icon emoji
 * @param {Array<string>} props.items - List items
 * @param {Object} props.config - Styling configuration
 * @param {boolean} props.isDark - Dark theme flag
 * @returns {JSX.Element} InsightCard component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const InsightCard = ({ title, icon, items, config, isDark }) => {
  return (
    <Card
      className={`p-6 bg-gradient-to-br ${config.gradient} border-l-4 ${config.border} hover:shadow-lg transition-all`}
    >
      <div className='flex items-center gap-3 mb-4'>
        <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center`}>
          <span className='text-xl'>{icon}</span>
        </div>
        <h3 className={`font-bold ${config.text} text-lg`}>{title}</h3>
      </div>
      <ul className='space-y-3'>
        {items.map((item, index) => (
          <li
            key={index}
            className={`text-sm pl-5 relative before:content-['${
              config.bullet
            }'] before:absolute before:left-0 before:${config.text} before:font-bold ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * RepComparison component
 * @description Compares two representatives using AI analysis
 * @param {Object} props - Component props
 * @param {Array<Object>} props.reps - Array of all representatives
 * @param {string} props.apiKey - API key for AI service
 * @returns {JSX.Element} RepComparison component
 * @author Aravind Sekar
 * @created 14-12-2025
 * @confidential
 */
const RepComparison = ({ reps, apiKey }) => {
  const { isDark } = useTheme();
  const [rep1Id, setRep1Id] = useState('');
  const [rep2Id, setRep2Id] = useState('');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoized computed values
  const rep1 = useMemo(() => reps.find(r => r.id === rep1Id) || null, [reps, rep1Id]);
  const rep2 = useMemo(() => reps.find(r => r.id === rep2Id) || null, [reps, rep2Id]);
  const rep1Metrics = useMemo(
    () => (rep1 ? getLatestMetrics(rep1.monthlyPerformance) : null),
    [rep1]
  );
  const rep2Metrics = useMemo(
    () => (rep2 ? getLatestMetrics(rep2.monthlyPerformance) : null),
    [rep2]
  );
  const rep1Index = useMemo(() => reps.findIndex(r => r.id === rep1Id), [reps, rep1Id]);
  const rep2Index = useMemo(() => reps.findIndex(r => r.id === rep2Id), [reps, rep2Id]);
  const rep1Name = rep1 ? rep1.personalInfo.name : '';
  const rep2Name = rep2 ? rep2.personalInfo.name : '';

  const canCompare = rep1Id && rep2Id && rep1Id !== rep2Id && apiKey && !loading;

  /**
   * Handles comparison generation
   * @description Triggers AI comparison between two reps
   * @returns {Promise<void>}
   * @author Aravind Sekar
   * @created 14-12-2025
   * @confidential
   */
  const handleCompare = async () => {
    // Validation
    if (!rep1Id || !rep2Id) {
      setError(ERROR_MESSAGES.NO_SELECTION);
      return;
    }

    if (rep1Id === rep2Id) {
      setError(ERROR_MESSAGES.SAME_SELECTION);
      return;
    }

    if (!apiKey) {
      setError(ERROR_MESSAGES.NO_API_KEY);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateComparisonInsights(rep1, rep2, apiKey);
      setComparison(result);
    } catch (err) {
      setError(`${ERROR_MESSAGES.COMPARISON_FAILED}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles rep selection change
   * @description Updates selected rep and clears comparison
   * @param {string} repNumber - Rep number ('1' or '2')
   * @param {string} repId - Selected rep ID
   * @returns {void}
   * @author Aravind Sekar
   * @created 14-12-2025
   * @confidential
   */
  const handleRepChange = (repNumber, repId) => {
    if (repNumber === '1') {
      setRep1Id(repId);
    } else {
      setRep2Id(repId);
    }
    setComparison(null);
    setError(null);
  };

  return (
    <div className='mb-6 space-y-6'>
      {/* Header Section */}
      <Card className='p-6 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 border-teal-500/30'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg'>
            ⚖️
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              AI-Powered Rep Comparison
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Compare two representatives side-by-side
            </p>
          </div>
        </div>
      </Card>

      {/* Selection Section */}
      <Card className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <RepSelector
            label='Select First Representative'
            value={rep1Id}
            onChange={e => handleRepChange('1', e.target.value)}
            reps={reps}
            excludeId={rep2Id}
            isDark={isDark}
          />
          <RepSelector
            label='Select Second Representative'
            value={rep2Id}
            onChange={e => handleRepChange('2', e.target.value)}
            reps={reps}
            excludeId={rep1Id}
            isDark={isDark}
          />
        </div>

        {!apiKey && (
          <div className='mb-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 rounded-lg'>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>⚠️</span>
              <div>
                <p className='text-sm font-semibold text-yellow-400'>API Key Required</p>
                <p className='text-xs text-yellow-300/80 mt-1'>
                  Please configure your OpenAI or Anthropic API key in the .env file to use AI
                  comparison.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCompare}
          disabled={!canCompare}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
            !canCompare
              ? 'bg-gray-400 cursor-not-allowed text-gray-200'
              : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-white'
          }`}
        >
          {loading ? (
            <span className='flex items-center justify-center gap-2'>
              <span className='animate-spin'>⚙️</span>
              Analyzing...
            </span>
          ) : !apiKey ? (
            '🔒 API Key Required'
          ) : (
            <span className='flex items-center justify-center gap-2'>🤖 Compare with AI</span>
          )}
        </button>

        {error && (
          <div className='mt-4 p-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg animate-pulse'>
            <p className='text-sm text-red-400 font-medium'>{error}</p>
          </div>
        )}
      </Card>

      {/* Side-by-Side Rep Cards */}
      {rep1 && rep2 && (
        <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <RepCard
            rep={rep1}
            metrics={rep1Metrics}
            repIndex={rep1Index}
            colorScheme='blue'
            isDark={isDark}
          />
          <VSDivider isMobile={false} />
          <VSDivider isMobile={true} />
          <RepCard
            rep={rep2}
            metrics={rep2Metrics}
            repIndex={rep2Index}
            colorScheme='green'
            isDark={isDark}
          />
        </div>
      )}

      {/* Metrics Comparison Table */}
      {rep1 && rep2 && rep1Metrics && rep2Metrics && (
        <Card className='p-6'>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            📊 Performance Metrics Comparison
          </h3>
          <div className='space-y-4'>
            {METRIC_COMPARISON_CONFIG.map(metric => (
              <MetricRow
                key={metric.key}
                metric={metric}
                value1={rep1Metrics[metric.key]}
                value2={rep2Metrics[metric.key]}
                rep1Name={rep1Name}
                rep2Name={rep2Name}
                isDark={isDark}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card className='p-8 bg-gradient-to-r from-teal-500/10 to-blue-500/10'>
          <LoadingSpinner message='AI is analyzing both representatives...' />
        </Card>
      )}

      {/* AI Comparison Results */}
      {comparison && !loading && (
        <div className='space-y-6'>
          {/* Summary Card */}
          <Card className='p-6 bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-slate-600'>
            <div className='flex items-center gap-3 mb-4'>
              <span className='text-3xl'>📊</span>
              <h3 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                AI Comparison Summary
              </h3>
            </div>
            <p
              className={`text-base leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {comparison.summary}
            </p>
          </Card>

          {/* Strengths Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <InsightCard
              title={`${rep1Name} Strengths`}
              icon={INSIGHT_CARD_CONFIG.rep1Strengths.icon}
              items={comparison.rep1Strengths}
              config={INSIGHT_CARD_CONFIG.rep1Strengths}
              isDark={isDark}
            />
            <InsightCard
              title={`${rep2Name} Strengths`}
              icon={INSIGHT_CARD_CONFIG.rep2Strengths.icon}
              items={comparison.rep2Strengths}
              config={INSIGHT_CARD_CONFIG.rep2Strengths}
              isDark={isDark}
            />
          </div>

          {/* Differences Card */}
          <InsightCard
            title={INSIGHT_CARD_CONFIG.keyDifferences.title}
            icon={INSIGHT_CARD_CONFIG.keyDifferences.icon}
            items={comparison.keyDifferences}
            config={INSIGHT_CARD_CONFIG.keyDifferences}
            isDark={isDark}
          />

          {/* Recommendations Card */}
          <InsightCard
            title={INSIGHT_CARD_CONFIG.recommendations.title}
            icon={INSIGHT_CARD_CONFIG.recommendations.icon}
            items={comparison.recommendations}
            config={INSIGHT_CARD_CONFIG.recommendations}
            isDark={isDark}
          />
        </div>
      )}
    </div>
  );
};

export default RepComparison;
