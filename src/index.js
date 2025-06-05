// index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function MainApp() {
  useEffect(() => {
    // Hide the preload overlay once React is ready
    const preloadOverlay = document.getElementById('preload-overlay');
    if (preloadOverlay) preloadOverlay.classList.add('hidden');
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
}

root.render(<MainApp />);
