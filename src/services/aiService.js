/**
 * @confidential
 * @fileoverview AI service for performance analysis using LLM APIs
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import {
  API_ENDPOINTS,
  AI_PROVIDERS,
  DEFAULT_AI_CONFIG,
  PROMPT_TEMPLATES,
  REQUEST_TIMEOUT,
  API_ERROR_MESSAGES
} from '../constants/apiConstants.js';
import { formatPerformanceDataForAI } from '../utils/performanceUtils.js';

/**
 * Generates AI-powered performance insights for a representative
 * @description Calls LLM API to analyze rep performance and generate insights
 * @param {Object} repData - Representative data object
 * @param {string} apiKey - API key for the AI service
 * @param {Object} config - Optional configuration overrides
 * @returns {Promise<Object>} AI-generated insights object
 * @throws {Error} If API call fails or response is invalid
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export const generatePerformanceInsights = async (repData, apiKey, config = {}) => {
  const serviceConfig = { ...DEFAULT_AI_CONFIG, ...config };

  const prompt = buildAnalysisPrompt(repData);

  try {
    const response = await callAIService(prompt, apiKey, serviceConfig);
    return parseAIResponse(response);
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error(API_ERROR_MESSAGES.GENERIC_ERROR);
  }
};

/**
 * Builds the analysis prompt from representative data
 * @description Constructs formatted prompt for AI analysis
 * @param {Object} repData - Representative data object
 * @returns {string} Formatted prompt string
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const buildAnalysisPrompt = repData => {
  const { personalInfo, monthlyPerformance, performanceSummary } = repData;

  const performanceDataStr = formatPerformanceDataForAI(monthlyPerformance);

  return PROMPT_TEMPLATES.ANALYSIS_REQUEST.replace('{repName}', personalInfo.name)
    .replace('{territory}', personalInfo.territory)
    .replace('{experience}', personalInfo.experience)
    .replace('{performanceData}', performanceDataStr)
    .replace('{trend}', performanceSummary.trend)
    .replace('{avgTargetAchievement}', performanceSummary.avgTargetAchievement)
    .replace('{bestMonth}', performanceSummary.bestMonth);
};

/**
 * Calls the AI service API
 * @description Makes HTTP request to configured AI provider
 * @param {string} prompt - Analysis prompt
 * @param {string} apiKey - API key for authentication
 * @param {Object} config - Service configuration
 * @returns {Promise<Object>} API response object
 * @throws {Error} If request fails or times out
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const callAIService = async (prompt, apiKey, config) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const endpoint =
      config.provider === AI_PROVIDERS.ANTHROPIC ? API_ENDPOINTS.ANTHROPIC : API_ENDPOINTS.OPENAI;

    const requestBody = buildRequestBody(prompt, config);
    const headers = buildRequestHeaders(apiKey, config.provider);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(API_ERROR_MESSAGES.TIMEOUT);
    }
    throw error;
  }
};

/**
 * Builds request body based on AI provider
 * @description Constructs provider-specific request payload
 * @param {string} prompt - Analysis prompt
 * @param {Object} config - Service configuration
 * @returns {Object} Request body object
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const buildRequestBody = (prompt, config) => {
  if (config.provider === AI_PROVIDERS.ANTHROPIC) {
    return {
      model: config.model,
      max_tokens: config.maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    };
  }

  return {
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    messages: [
      {
        role: 'system',
        content: PROMPT_TEMPLATES.SYSTEM_ROLE
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  };
};

/**
 * Builds request headers based on AI provider
 * @description Constructs provider-specific HTTP headers
 * @param {string} apiKey - API key for authentication
 * @param {string} provider - AI provider identifier
 * @returns {Object} Headers object
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const buildRequestHeaders = (apiKey, provider) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (provider === AI_PROVIDERS.ANTHROPIC) {
    headers['x-api-key'] = apiKey;
    headers['anthropic-version'] = '2023-06-01';
  } else {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  return headers;
};

/**
 * Parses AI service response
 * @description Extracts and validates insights from API response
 * @param {Object} response - Raw API response
 * @returns {Object} Parsed insights object
 * @throws {Error} If response format is invalid
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const parseAIResponse = response => {
  try {
    let content;

    if (response.choices && response.choices[0]) {
      content = response.choices[0].message.content;
    } else if (response.content && response.content[0]) {
      content = response.content[0].text;
    } else {
      throw new Error('Invalid response format');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Parse Error:', error);
    return generateFallbackInsights();
  }
};

/**
 * Generates fallback insights when AI service fails
 * @description Provides default insights structure
 * @returns {Object} Default insights object
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const generateFallbackInsights = () => ({
  overallSummary: 'Performance analysis is currently unavailable. Please try again later.',
  trendInsights: [
    'Unable to generate trend insights at this time',
    'Please check your API configuration',
    'Manual analysis recommended'
  ],
  keyStrengths: ['Data analysis in progress', 'Insights will be available shortly'],
  riskAreas: ['AI analysis temporarily unavailable'],
  suggestedHabits: [
    'Continue monitoring performance metrics',
    'Review historical data manually',
    'Consult with team lead for guidance'
  ]
});

/**
 * Generates AI-powered comparison between two representatives
 * @description Calls LLM API to compare two reps and generate insights
 * @param {Object} rep1Data - First representative data object
 * @param {Object} rep2Data - Second representative data object
 * @param {string} apiKey - API key for the AI service
 * @param {Object} config - Optional configuration overrides
 * @returns {Promise<Object>} AI-generated comparison object
 * @throws {Error} If API call fails or response is invalid
 * @author Aravind Sekar
 * @created 15-12-2025
 * @confidential
 */
export const generateComparisonInsights = async (rep1Data, rep2Data, apiKey, config = {}) => {
  const serviceConfig = { ...DEFAULT_AI_CONFIG, ...config };

  const prompt = buildComparisonPrompt(rep1Data, rep2Data);

  try {
    const response = await callAIService(prompt, apiKey, serviceConfig);
    return parseComparisonResponse(response);
  } catch (error) {
    console.error('AI Comparison Error:', error);
    throw new Error(API_ERROR_MESSAGES.GENERIC_ERROR);
  }
};

/**
 * Builds comparison prompt from two representative data objects
 * @description Constructs formatted prompt for AI comparison
 * @param {Object} rep1Data - First representative data
 * @param {Object} rep2Data - Second representative data
 * @returns {string} Formatted comparison prompt
 * @author Aravind Sekar
 * @created 15-12-2025
 * @confidential
 */
const buildComparisonPrompt = (rep1Data, rep2Data) => {
  const rep1Perf = formatPerformanceDataForAI(rep1Data.monthlyPerformance);
  const rep2Perf = formatPerformanceDataForAI(rep2Data.monthlyPerformance);

  return `Compare the following two medical representatives and provide detailed insights:

REPRESENTATIVE 1:
Name: ${rep1Data.personalInfo.name}
Territory: ${rep1Data.personalInfo.territory}
Experience: ${rep1Data.personalInfo.experience}
Trend: ${rep1Data.performanceSummary.trend}
Avg Target Achievement: ${rep1Data.performanceSummary.avgTargetAchievement}%
Monthly Performance:
${rep1Perf}

REPRESENTATIVE 2:
Name: ${rep2Data.personalInfo.name}
Territory: ${rep2Data.personalInfo.territory}
Experience: ${rep2Data.personalInfo.experience}
Trend: ${rep2Data.performanceSummary.trend}
Avg Target Achievement: ${rep2Data.performanceSummary.avgTargetAchievement}%
Monthly Performance:
${rep2Perf}

Please provide a comprehensive comparison in JSON format:
{
  "summary": "One sentence overall comparison verdict",
  "rep1Strengths": ["strength1", "strength2", "strength3"],
  "rep2Strengths": ["strength1", "strength2", "strength3"],
  "keyDifferences": ["difference1", "difference2", "difference3"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}`;
};

/**
 * Parses AI comparison response
 * @description Extracts and validates comparison from API response
 * @param {Object} response - Raw API response
 * @returns {Object} Parsed comparison object
 * @throws {Error} If response format is invalid
 * @author Aravind Sekar
 * @created 15-12-2025
 * @confidential
 */
const parseComparisonResponse = response => {
  try {
    let content;

    if (response.choices && response.choices[0]) {
      content = response.choices[0].message.content;
    } else if (response.content && response.content[0]) {
      content = response.content[0].text;
    } else {
      throw new Error('Invalid response format');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Parse Error:', error);
    throw new Error('Failed to parse comparison response');
  }
};