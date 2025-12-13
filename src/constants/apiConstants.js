/**
 * @confidential
 * @fileoverview API configuration constants for AI integration
 * @author Aravind Sekar
 * @created 13-12-2025
 */

/**
 * AI service provider options
 * @constant {Object} AI_PROVIDERS
 */
export const AI_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic'
};

/**
 * API endpoint configurations
 * @constant {Object} API_ENDPOINTS
 */
export const API_ENDPOINTS = {
  OPENAI: 'https://api.openai.com/v1/chat/completions',
  ANTHROPIC: 'https://api.anthropic.com/v1/messages'
};

/**
 * AI model identifiers
 * @constant {Object} AI_MODELS
 */
export const AI_MODELS = {
  GPT4: 'gpt-4',
  GPT35_TURBO: 'gpt-3.5-turbo',
  CLAUDE_3_SONNET: 'claude-3-sonnet-20240229',
  CLAUDE_3_HAIKU: 'claude-3-haiku-20240307'
};

/**
 * Default AI service configuration
 * @constant {Object} DEFAULT_AI_CONFIG
 */
export const DEFAULT_AI_CONFIG = {
  provider: AI_PROVIDERS.OPENAI,
  model: AI_MODELS.GPT35_TURBO,
  temperature: 0.7,
  maxTokens: 1000
};

/**
 * AI prompt templates for performance analysis
 * @constant {Object} PROMPT_TEMPLATES
 */
export const PROMPT_TEMPLATES = {
  SYSTEM_ROLE:
    'You are a pharmaceutical sales performance analyst with expertise in medical representative performance evaluation.',
  ANALYSIS_REQUEST: `Analyze the following medical representative's 6-month performance data and provide:

1. Overall Trend Summary (one sentence verdict)
2. Trend Insights (3 specific data-driven observations)
3. Key Strengths (what the rep excels at)
4. Risk Areas (concerns that need addressing)
5. Suggested Habits (actionable improvement tips)

Rep Name: {repName}
Territory: {territory}
Experience: {experience}

Monthly Performance Data:
{performanceData}

Performance Summary:
- Trend: {trend}
- Avg Target Achievement: {avgTargetAchievement}%
- Best Month: {bestMonth}

Please format your response as JSON with the following structure:
{
  "overallSummary": "string",
  "trendInsights": ["string", "string", "string"],
  "keyStrengths": ["string", "string", "string"],
  "riskAreas": ["string", "string"],
  "suggestedHabits": ["string", "string", "string"]
}`
};

/**
 * HTTP request timeout in milliseconds
 * @constant {number} REQUEST_TIMEOUT
 */
export const REQUEST_TIMEOUT = 30000;

/**
 * API error messages
 * @constant {Object} API_ERROR_MESSAGES
 */
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  INVALID_API_KEY: 'Invalid API key. Please check your configuration.',
  RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
  GENERIC_ERROR: 'An error occurred while analyzing performance.'
};
