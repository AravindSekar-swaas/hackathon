/* @confidential */

/**
 * @fileoverview Vite configuration for the Medical Rep Performance front-end application.
 * @description Configures Vite with the React plugin for the Medical Rep Performance UI.
 * @returns {import('vite').UserConfigExport} Vite configuration object for the dev/build pipeline.
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});
