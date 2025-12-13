/**
 * @confidential
 * @fileoverview Mini sparkline chart component for trend visualization
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { COLORS } from '../../constants/uiConstants.js';

const DEFAULT_HEIGHT = 40;
const CHART_PADDING = 4;

/**
 * SparklineChart component
 * @description Renders mini line chart for 6-month trends
 * @param {Object} props - Component props
 * @param {Array<number>} props.data - Array of numeric values
 * @param {string} props.color - Line color
 * @param {number} props.width - Chart width in pixels
 * @param {number} props.height - Chart height in pixels
 * @returns {JSX.Element} SparklineChart component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const SparklineChart = ({
  data,
  color = COLORS.CHART_LINE,
  width = 120,
  height = DEFAULT_HEIGHT
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  /**
   * Generates SVG path from data points
   * @description Converts numeric array to SVG path string
   * @returns {string} SVG path data
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const generatePath = () => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const chartHeight = height - CHART_PADDING * 2;
    const stepX = width / (data.length - 1);

    const points = data.map((value, index) => {
      const x = index * stepX;
      const normalizedValue = (value - min) / range;
      const y = height - CHART_PADDING - normalizedValue * chartHeight;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  return (
    <svg width={width} height={height} className='inline-block'>
      <path
        d={generatePath()}
        fill='none'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SparklineChart;
