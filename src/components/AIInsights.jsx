/**
 * @confidential
 * @fileoverview AI-generated insights component with color-coded sections
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { useState, useEffect } from 'react';
import Card from './common/Card.jsx';
import LoadingSpinner from './common/LoadingSpinner.jsx';
import { UI_TEXT, CSS_CLASSES } from '../constants/uiConstants.js';
import { generatePerformanceInsights } from '../services/aiService.js';

/**
 * AIInsights component
 * @description Displays AI-generated performance insights with color-coded sections
 * @param {Object} props - Component props
 * @param {Object} props.rep - Representative data object
 * @param {string} props.apiKey - API key for AI service (optional)
 * @returns {JSX.Element} AIInsights component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const AIInsights = ({ rep, apiKey }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInsights();
  }, [rep.id]);

  /**
   * Loads AI insights for the representative
   * @description Fetches insights from AI service or uses mock data
   * @returns {Promise<void>}
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const loadInsights = async () => {
    setLoading(true);
    setError(null);

    try {
      if (apiKey) {
        const result = await generatePerformanceInsights(rep, apiKey);
        setInsights(result);
      } else {
        const mockInsights = generateMockInsights(rep);
        await simulateDelay();
        setInsights(mockInsights);
      }
    } catch (err) {
      setError(err.message);
      setInsights(generateMockInsights(rep));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Simulates API delay for demo purposes
   * @description Adds artificial delay to mock API call
   * @returns {Promise<void>}
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const simulateDelay = () => {
    const MOCK_DELAY = 1500;
    return new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  };

  /**
   * Generates mock insights based on rep data
   * @description Creates fallback insights when AI is unavailable
   * @param {Object} repData - Representative data object
   * @returns {Object} Mock insights object
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const generateMockInsights = repData => {
    const trend = repData.performanceSummary.trend.toLowerCase();

    if (trend.includes('upward') || trend.includes('improvement')) {
      return {
        overallSummary: `${repData.personalInfo.name} demonstrates strong upward momentum with consistent target achievement and improving territory coverage.`,
        trendInsights: [
          'Visits increased by 30% over the 6-month period, showing excellent growth trajectory',
          'Coverage percentage improved from 72% to 88%, indicating better territory penetration',
          'Sample distribution grew proportionally with visits, maintaining optimal engagement ratios'
        ],
        keyStrengths: [
          'Consistent month-over-month improvement in all key metrics',
          'Strong doctor engagement with high CRM call logging rates',
          'Excellent territory coverage expansion strategy'
        ],
        riskAreas: [
          'Potential burnout risk with sustained high performance pace',
          'Need to maintain quality while scaling quantity'
        ],
        suggestedHabits: [
          'Schedule regular territory reviews to identify untapped opportunities',
          'Implement time-blocking for high-tier doctor visits',
          'Share best practices with team members for knowledge transfer'
        ]
      };
    }

    if (trend.includes('declining')) {
      return {
        overallSummary: `${repData.personalInfo.name} shows a concerning downward trend across all metrics requiring immediate intervention and support.`,
        trendInsights: [
          'Visits declined by 20% from peak performance in July to December',
          'Coverage percentage dropped from 88% to 71%, indicating territory engagement issues',
          'All metrics trending downward consistently for 6 consecutive months'
        ],
        keyStrengths: [
          'Strong historical performance foundation to build upon',
          'Maintains professional CRM documentation standards',
          'Deep territory knowledge from 4+ years experience'
        ],
        riskAreas: [
          'Sustained 6-month decline indicates systemic issues',
          'Risk of losing key doctor relationships',
          'Potential motivation and engagement challenges'
        ],
        suggestedHabits: [
          'Schedule one-on-one coaching sessions with manager',
          'Revisit territory routing and time management strategies',
          'Focus on rebuilding relationships with top-tier doctors',
          'Set small, achievable weekly goals to rebuild momentum'
        ]
      };
    }

    return {
      overallSummary: `${repData.personalInfo.name} maintains stable, consistent performance with reliable target achievement and steady territory management.`,
      trendInsights: [
        'Performance remains consistently above target with minimal fluctuation',
        'Stable coverage percentage around 85% demonstrates reliable territory management',
        'Predictable monthly patterns indicate systematic approach to field work'
      ],
      keyStrengths: [
        'Reliable and consistent performance month over month',
        'Strong relationships with key doctors maintained over time',
        'Excellent product knowledge across multiple therapeutic areas'
      ],
      riskAreas: [
        'Limited growth trajectory may indicate comfort zone stagnation',
        'Opportunity to push beyond current performance ceiling'
      ],
      suggestedHabits: [
        'Explore new doctor acquisition strategies to expand territory',
        'Experiment with innovative engagement approaches',
        'Consider mentoring junior reps to develop leadership skills',
        'Set stretch goals for one metric per quarter'
      ]
    };
  };

  if (loading) {
    return (
      <Card className='p-6'>
        <LoadingSpinner message={UI_TEXT.ANALYZING} />
      </Card>
    );
  }

  if (!insights) {
    return null;
  }

  return (
    <div className='mb-6'>
      <h2 className={`text-xl font-semibold mb-4 ${CSS_CLASSES.TEXT_PRIMARY}`}>
        {UI_TEXT.AI_INSIGHTS}
      </h2>

      <Card className='p-6 mb-4'>
        <div className='flex items-start gap-3'>
          <span className='text-2xl'>🤖</span>
          <div>
            <h3 className={`font-semibold mb-2 ${CSS_CLASSES.TEXT_PRIMARY}`}>
              {UI_TEXT.OVERALL_SUMMARY}
            </h3>
            <p className={`text-sm leading-relaxed ${CSS_CLASSES.TEXT_SECONDARY}`}>
              {insights.overallSummary}
            </p>
          </div>
        </div>
      </Card>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Card className={`p-6 ${CSS_CLASSES.INSIGHT_TRENDS}`}>
          <div className='flex items-center gap-2 mb-3'>
            <span className='text-xl'>📈</span>
            <h3 className={`font-semibold text-blue-400`}>{UI_TEXT.TREND_INSIGHTS}</h3>
          </div>
          <ul className='space-y-2'>
            {insights.trendInsights.map((insight, index) => (
              <li
                key={index}
                className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY} pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-400`}
              >
                {insight}
              </li>
            ))}
          </ul>
        </Card>

        <Card className={`p-6 ${CSS_CLASSES.INSIGHT_STRENGTHS}`}>
          <div className='flex items-center gap-2 mb-3'>
            <span className='text-xl'>💪</span>
            <h3 className={`font-semibold text-green-400`}>{UI_TEXT.KEY_STRENGTHS}</h3>
          </div>
          <ul className='space-y-2'>
            {insights.keyStrengths.map((strength, index) => (
              <li
                key={index}
                className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY} pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-green-400`}
              >
                {strength}
              </li>
            ))}
          </ul>
        </Card>

        <Card className={`p-6 ${CSS_CLASSES.INSIGHT_RISKS}`}>
          <div className='flex items-center gap-2 mb-3'>
            <span className='text-xl'>⚠️</span>
            <h3 className={`font-semibold text-red-400`}>{UI_TEXT.RISK_AREAS}</h3>
          </div>
          <ul className='space-y-2'>
            {insights.riskAreas.map((risk, index) => (
              <li
                key={index}
                className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY} pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-red-400`}
              >
                {risk}
              </li>
            ))}
          </ul>
        </Card>

        <Card className={`p-6 ${CSS_CLASSES.INSIGHT_HABITS}`}>
          <div className='flex items-center gap-2 mb-3'>
            <span className='text-xl'>✨</span>
            <h3 className={`font-semibold text-purple-400`}>{UI_TEXT.SUGGESTED_HABITS}</h3>
          </div>
          <ul className='space-y-2'>
            {insights.suggestedHabits.map((habit, index) => (
              <li
                key={index}
                className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY} pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-purple-400`}
              >
                {habit}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {error && (
        <p className={`mt-4 text-xs ${CSS_CLASSES.TEXT_MUTED} text-center`}>
          Note: Using demo insights. {error}
        </p>
      )}
    </div>
  );
};

export default AIInsights;
