// src/components/Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import titleImage from '../../assets/Title.png';
import aliceImage from '../../assets/Alice.png'; // Import Alice.png

function Welcome() {
  return (
    <div className="welcome">
      <div className="title-container">
        <img src={titleImage} alt="Title" className="welcome-image" />
        <img src={aliceImage} alt="Alice" className="alice-image" /> {/* Add Alice image */}
      </div>
        <p className="welcome-text">We are where ink meets paper and thoughts become stories. Where words are drawn together like sand washed ashore, building crumbling castles with cracked seashells for windows. </p>
        <p className="welcome-text">We are whatever the whimsical makes of us.</p>

      <Link to="/about-us" className="learn-more-button">Learn More</Link>
    </div>
  );
}



export default Welcome;





