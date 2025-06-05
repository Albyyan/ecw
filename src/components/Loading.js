// Loading.js
import React, { useEffect } from 'react';
import './Loading.css';
import Alice from '../assets/Alice.png';

function Loading({ onComplete }) {
  useEffect(() => {
    // Ensure scroll position is reset
    return () => window.scrollTo(0, 0);
  }, []);

  return (
    <div className="loading-screen">
      <img
        src={Alice}
        alt="Loading"
        className="loading-image"
        onLoad={onComplete} // Trigger onLoad event
      />
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Loading;
