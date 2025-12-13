/* @confidential */

/**
 * @fileoverview PostCSS configuration for the Medical Rep Performance application.
 * @description Wires Tailwind CSS and Autoprefixer into the Vite build pipeline for CSS processing.
 * @returns {{ plugins: Record<string, unknown> }} PostCSS configuration object used by the bundler.
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
