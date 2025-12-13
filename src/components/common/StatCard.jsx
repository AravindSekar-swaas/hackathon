/**
 * @confidential
 * @fileoverview Animated stat card component for displaying metrics
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import { CSS_CLASSES, ANIMATION_DURATION } from '../../constants/uiConstants.js';
import { formatNumber } from '../../utils/performanceUtils.js';

const COUNTER_STEPS = 20;

/**
 * Animated StatCard component
 * @description Displays metric with animated counter and trend indicator
 * @param {Object} props - Component props
 * @param {string} props.label - Metric label
 * @param {number} props.value - Metric value
 * @param {string} props.icon - Emoji icon
 * @param {string} props.color - Color for styling
 * @param {string} props.unit - Unit suffix (e.g., '%')
 * @param {string} props.trend - Trend direction: 'up', 'down', 'stable'
 * @param {number} props.target - Optional target value
 * @returns {JSX.Element} StatCard component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const StatCard = ({ label, value, icon, color, unit = '', trend, target }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    animateCounter(value);
  }, [value]);

  /**
   * Animates counter from 0 to target value
   * @description Incremental animation for numeric display
   * @param {number} targetValue - Final value to reach
   * @returns {void}
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const animateCounter = targetValue => {
    const increment = targetValue / COUNTER_STEPS;
    const stepDuration = ANIMATION_DURATION.COUNTER / COUNTER_STEPS;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= COUNTER_STEPS) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  };

  /**
   * Gets trend indicator styling
   * @description Returns color class based on trend direction
   * @returns {string} CSS color class
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const getTrendColor = () => {
    if (trend === 'up') {
      return 'text-green-400';
    }
    if (trend === 'down') {
      return 'text-red-400';
    }
    return 'text-yellow-400';
  };

  /**
   * Gets trend icon
   * @description Returns arrow icon based on trend direction
   * @returns {string} Trend arrow
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const getTrendIcon = () => {
    if (trend === 'up') {
      return '↗';
    }
    if (trend === 'down') {
      return '↘';
    }
    return '→';
  };

  return (
    <Card className='p-6'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-2'>
            <span className='text-2xl'>{icon}</span>
            <span className={`text-sm font-medium ${CSS_CLASSES.TEXT_SECONDARY}`}>{label}</span>
          </div>

          <div className='flex items-baseline gap-2'>
            <span className={`text-3xl font-bold ${CSS_CLASSES.TEXT_PRIMARY}`} style={{ color }}>
              {formatNumber(displayValue)}
              {unit}
            </span>

            {trend && <span className={`text-xl ${getTrendColor()}`}>{getTrendIcon()}</span>}
          </div>

          {target && (
            <div className={`mt-2 text-sm ${CSS_CLASSES.TEXT_MUTED}`}>
              Target: {formatNumber(target)}
              {unit}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
