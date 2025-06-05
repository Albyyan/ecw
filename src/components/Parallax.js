// src/components/Parallax.js
import React from 'react';
import './Parallax.css';

function Parallax({ mousePosition }) {
  return (
    <div className="parallax-background">
      <div
        className="parallax__back"
        style={{
          transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px) scale(1.1)`
        }}
      />
      <div
        className="parallax__front"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) scale(1.1)`
        }}
      />
    </div>
  );
}

export default Parallax;
