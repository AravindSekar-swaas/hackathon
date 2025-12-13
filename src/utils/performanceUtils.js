/**
 * @confidential
 * @fileoverview Utility functions for performance calculations and data transformations
 * @author Aravind Sekar
 * @created 13-12-2025
 */

const PERCENTAGE_MULTIPLIER = 100;
const DECIMAL_PLACES = 2;

/**
 * Calculates the average of an array of numbers
 * @description Computes arithmetic mean of numeric values
 * @param {Array<number>} values - Array of numeric values
 * @returns {number} Average value rounded to 2 decimal places
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const calculateAverage = values => {
  if (!values || values.length === 0) {
    return 0;
  }
  const sum = values.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / values.length).toFixed(DECIMAL_PLACES));
};

/**
 * Extracts metric values from monthly performance data
 * @description Retrieves specific metric values across all months
 * @param {Array<Object>} monthlyPerformance - Array of monthly performance objects
 * @param {string} metricKey - Key of the metric to extract
 * @returns {Array<number>} Array of metric values
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const extractMetricValues = (monthlyPerformance, metricKey) => {
  if (!monthlyPerformance || !Array.isArray(monthlyPerformance)) {
    return [];
  }
  return monthlyPerformance.map(month => month.metrics[metricKey] || 0);
};

/**
 * Calculates trend direction based on first and last values
 * @description Determines if trend is up, down, or stable
 * @param {Array<number>} values - Array of numeric values
 * @returns {string} Trend direction: 'up', 'down', or 'stable'
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const calculateTrendDirection = values => {
  if (!values || values.length < 2) {
    return 'stable';
  }
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  const TREND_THRESHOLD = 5;
  const percentageChange = ((lastValue - firstValue) / firstValue) * PERCENTAGE_MULTIPLIER;

  if (percentageChange > TREND_THRESHOLD) {
    return 'up';
  }
  if (percentageChange < -TREND_THRESHOLD) {
    return 'down';
  }
  return 'stable';
};

/**
 * Calculates target achievement percentage
 * @description Computes percentage of actual vs target value
 * @param {number} actual - Actual value achieved
 * @param {number} target - Target value
 * @returns {number} Achievement percentage rounded to 2 decimal places
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const calculateTargetAchievement = (actual, target) => {
  if (!target || target === 0) {
    return 0;
  }
  return parseFloat(((actual / target) * PERCENTAGE_MULTIPLIER).toFixed(DECIMAL_PLACES));
};

/**
 * Gets the latest month's metrics from performance data
 * @description Retrieves metrics from the most recent month
 * @param {Array<Object>} monthlyPerformance - Array of monthly performance objects
 * @returns {Object} Latest month's metrics object
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const getLatestMetrics = monthlyPerformance => {
  if (!monthlyPerformance || monthlyPerformance.length === 0) {
    return { visits: 0, coverage: 0, samples: 0, calls: 0, target: 0 };
  }
  return monthlyPerformance[monthlyPerformance.length - 1].metrics;
};

/**
 * Formats a number with thousand separators
 * @description Adds commas to large numbers for readability
 * @param {number} value - Numeric value to format
 * @returns {string} Formatted number string
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const formatNumber = value => {
  if (value === null || value === undefined) {
    return '0';
  }
  return value.toLocaleString('en-IN');
};

/**
 * Generates initials from a full name
 * @description Extracts first letter of first and last name
 * @param {string} name - Full name string
 * @returns {string} Two-letter initials in uppercase
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const getInitials = name => {
  if (!name) {
    return 'NA';
  }
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Calculates percentage change between two values
 * @description Computes relative change as percentage
 * @param {number} oldValue - Previous value
 * @param {number} newValue - Current value
 * @returns {number} Percentage change rounded to 2 decimal places
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const calculatePercentageChange = (oldValue, newValue) => {
  if (!oldValue || oldValue === 0) {
    return 0;
  }
  return parseFloat(
    (((newValue - oldValue) / oldValue) * PERCENTAGE_MULTIPLIER).toFixed(DECIMAL_PLACES)
  );
};

/**
 * Formats performance data for AI analysis
 * @description Converts monthly performance array to readable string
 * @param {Array<Object>} monthlyPerformance - Array of monthly performance objects
 * @returns {string} Formatted performance data string
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const formatPerformanceDataForAI = monthlyPerformance => {
  if (!monthlyPerformance || monthlyPerformance.length === 0) {
    return 'No performance data available';
  }

  return monthlyPerformance
    .map(month => {
      const { metrics } = month;
      return `${month.month}: Visits=${metrics.visits}/${metrics.target}, Coverage=${metrics.coverage}%, Samples=${metrics.samples}, Calls=${metrics.calls}`;
    })
    .join('\n');
};
