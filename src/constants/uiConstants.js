/**
 * @confidential
 * @fileoverview UI constants for Medical Rep Performance Tracker
 * @author Aravind Sekar
 * @created 13-12-2025
 */

/**
 * Application text labels and messages
 * @constant {Object} UI_TEXT
 */
export const UI_TEXT = {
  APP_TITLE: 'Medical Rep Performance Tracker',
  COMPANY_NAME: 'Innovation Pharma',
  SELECT_REP: 'Select a Representative',
  LOADING: 'Loading...',
  ANALYZING: 'Analyzing Performance...',
  ERROR_LOADING: 'Error loading data',
  NO_DATA: 'No data available',
  PERFORMANCE_METRICS: 'Performance Metrics',
  AI_INSIGHTS: 'AI-Generated Insights',
  PROFILE: 'Profile',
  TERRITORY: 'Territory',
  EXPERIENCE: 'Experience',
  PRODUCTS: 'Products',
  TOP_DOCTORS: 'Top Doctors',
  MONTHLY_TREND: '6-Month Trend',
  OVERALL_SUMMARY: 'Overall Trend Summary',
  TREND_INSIGHTS: 'Trend Insights',
  KEY_STRENGTHS: 'Key Strengths',
  RISK_AREAS: 'Risk Areas',
  SUGGESTED_HABITS: 'Suggested Habits',
  TARGET_ACHIEVEMENT: 'Target Achievement',
  VISITS: 'Visits',
  COVERAGE: 'Coverage',
  SAMPLES: 'Samples',
  CALLS: 'Calls',
  VS_TARGET: 'vs Target'
};

/**
 * CSS class names for consistent styling
 * @constant {Object} CSS_CLASSES
 */
export const CSS_CLASSES = {
  CONTAINER: 'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
  HEADER: 'bg-slate-800/50 backdrop-blur-sm border-b border-slate-700',
  CARD: 'bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700',
  CARD_HOVER: 'hover:border-slate-600 hover:shadow-lg transition-all duration-300',
  BUTTON_PRIMARY:
    'bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200',
  BUTTON_SECONDARY:
    'bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200',
  TEXT_PRIMARY: 'text-slate-100',
  TEXT_SECONDARY: 'text-slate-400',
  TEXT_MUTED: 'text-slate-500',
  BADGE_SUCCESS: 'bg-green-500/20 text-green-400 border border-green-500/30',
  BADGE_WARNING: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  BADGE_DANGER: 'bg-red-500/20 text-red-400 border border-red-500/30',
  BADGE_INFO: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  INSIGHT_TRENDS: 'bg-blue-500/10 border-l-4 border-blue-500',
  INSIGHT_STRENGTHS: 'bg-green-500/10 border-l-4 border-green-500',
  INSIGHT_RISKS: 'bg-red-500/10 border-l-4 border-red-500',
  INSIGHT_HABITS: 'bg-purple-500/10 border-l-4 border-purple-500'
};

/**
 * Color palette for charts and visualizations
 * @constant {Object} COLORS
 */
export const COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  PURPLE: '#a855f7',
  CHART_LINE: '#60a5fa',
  CHART_AREA: 'rgba(96, 165, 250, 0.1)',
  TREND_UP: '#10b981',
  TREND_DOWN: '#ef4444',
  TREND_STABLE: '#f59e0b'
};

/**
 * Metric configuration for performance tracking
 * @constant {Object} METRIC_CONFIG
 */
export const METRIC_CONFIG = {
  VISITS: {
    key: 'visits',
    label: 'Doctor Visits',
    icon: '👨‍⚕️',
    color: COLORS.PRIMARY,
    unit: ''
  },
  COVERAGE: {
    key: 'coverage',
    label: 'Coverage',
    icon: '📊',
    color: COLORS.SUCCESS,
    unit: '%'
  },
  SAMPLES: {
    key: 'samples',
    label: 'Samples',
    icon: '💊',
    color: COLORS.WARNING,
    unit: ''
  },
  CALLS: {
    key: 'calls',
    label: 'CRM Calls',
    icon: '📞',
    color: COLORS.INFO,
    unit: ''
  }
};

/**
 * Animation duration constants in milliseconds
 * @constant {Object} ANIMATION_DURATION
 */
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  COUNTER: 1000
};

/**
 * Avatar colors for representative cards
 * @constant {Array<string>} AVATAR_COLORS
 */
export const AVATAR_COLORS = [
  'bg-gradient-to-br from-blue-500 to-blue-600',
  'bg-gradient-to-br from-green-500 to-green-600',
  'bg-gradient-to-br from-purple-500 to-purple-600',
  'bg-gradient-to-br from-orange-500 to-orange-600'
];

/**
 * Trend indicator configuration
 * @constant {Object} TREND_INDICATORS
 */
export const TREND_INDICATORS = {
  UP: {
    icon: '↗',
    color: COLORS.TREND_UP,
    label: 'Trending Up'
  },
  DOWN: {
    icon: '↘',
    color: COLORS.TREND_DOWN,
    label: 'Trending Down'
  },
  STABLE: {
    icon: '→',
    color: COLORS.TREND_STABLE,
    label: 'Stable'
  }
};
