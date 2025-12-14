/**
 * @confidential
 * @fileoverview Performance metrics dashboard component
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import StatCard from './common/StatCard.jsx';
import Card from './common/Card.jsx';
import { UI_TEXT, METRIC_CONFIG } from '../constants/uiConstants.js';
import {
  getLatestMetrics,
  extractMetricValues,
  calculateTrendDirection
} from '../utils/performanceUtils.js';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * PerformanceMetrics component
 * @description Displays animated stat cards and trend charts
 * @param {Object} props - Component props
 * @param {Object} props.rep - Representative data object
 * @returns {JSX.Element} PerformanceMetrics component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const PerformanceMetrics = ({ rep }) => {
  const { isDark } = useTheme();
  const latestMetrics = getLatestMetrics(rep.monthlyPerformance);

  /**
   * Gets metric data for rendering
   * @description Extracts and formats metric information
   * @param {string} metricKey - Metric identifier
   * @returns {Object} Metric data object
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const getMetricData = metricKey => {
    const values = extractMetricValues(rep.monthlyPerformance, metricKey);
    const trend = calculateTrendDirection(values);
    const config = METRIC_CONFIG[metricKey.toUpperCase()];

    return {
      values,
      trend,
      config,
      current: latestMetrics[metricKey],
      target: metricKey === 'visits' ? latestMetrics.target : null
    };
  };

  const metrics = ['visits', 'coverage', 'samples', 'calls'];

  return (
    <div className='mb-6'>
      <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        {UI_TEXT.PERFORMANCE_METRICS}
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        {metrics.map(metricKey => {
          const data = getMetricData(metricKey);
          return (
            <StatCard
              key={metricKey}
              label={data.config.label}
              value={data.current}
              icon={data.config.icon}
              color={data.config.color}
              unit={data.config.unit}
              trend={data.trend}
              target={data.target}
            />
          );
        })}
      </div>

      <Card className='p-6'>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          {UI_TEXT.MONTHLY_TREND}
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {metrics.map(metricKey => {
            const data = getMetricData(metricKey);
            const percentageChange =
              data.values.length >= 2
                ? (
                    ((data.values[data.values.length - 1] - data.values[0]) / data.values[0]) *
                    100
                  ).toFixed(1)
                : 0;
            const isPositive = percentageChange >= 0;

            const chartData = rep.monthlyPerformance.map((month, index) => ({
              month: month.month.split(' ')[0],
              value: data.values[index]
            }));

            return (
              <div key={metricKey} className='flex flex-col'>
                <div className='flex items-center justify-between mb-3'>
                  <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    {data.config.label}
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {percentageChange}%
                  </span>
                </div>

                <ResponsiveContainer width='100%' height={150}>
                  <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray='3 3' stroke={isDark ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey='month' stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
                    <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#1e293b' : '#ffffff',
                        border: `1px solid ${isDark ? '#475569' : '#e5e7eb'}`,
                        borderRadius: '6px',
                        color: isDark ? '#e2e8f0' : '#1e293b'
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='value'
                      stroke={data.config.color}
                      strokeWidth={2}
                      dot={{ fill: data.config.color, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
