import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import TagManager from 'react-gtm-module';

// Initialize GTM
const tagManagerArgs = {
  gtmId: 'GTM-WHQTQMNQ', // replace with your GTM ID
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
