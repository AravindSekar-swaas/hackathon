/* @confidential */

import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { APP_DOM_IDS } from './constants/domConstants.js';
import { ThemeProvider } from './context/ThemeContext.jsx';

/**
 * @description Bootstraps the Medical Rep Performance React application into the DOM.
 * @returns {void} Does not return a value; mounts the root React tree into the target container.
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const bootstrapApplication = () => {
  const rootElement = document.getElementById(APP_DOM_IDS.ROOT);

  if (!rootElement) {
    return;
  }

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

bootstrapApplication();
