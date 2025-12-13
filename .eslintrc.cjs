/* @confidential */

/**
 * @fileoverview ESLint configuration enforcing project-wide style, quality, and security rules.
 * @description Sets up linting for React, hooks, and basic security checks for the front-end codebase.
 * @returns {import('eslint').Linter.Config} ESLint configuration for the Medical Rep Performance app.
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react', 'react-hooks', 'security'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-var': 'error',
    'no-console': 'off',
    'no-undef': 'error',
    eqeqeq: ['error', 'always'],
    'no-shadow': 'error',
    'no-trailing-spaces': 'error',
    complexity: ['warn', 10],
    'consistent-return': 'warn',
    'max-len': [
      'warn',
      { code: 100, tabWidth: 2, ignoreStrings: true, ignoreTemplateLiterals: true }
    ],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
    'no-magic-numbers': [
      'warn',
      {
        ignore: [0, 1],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: true
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'security/detect-unsafe-regex': 'error',
    'security/detect-non-literal-fs-filename': 'warn',
    'security/detect-buffer-noassert': 'warn',
    'security/detect-object-injection': 'off'
  }
};
