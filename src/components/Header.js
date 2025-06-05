// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ecwLogo from '../assets/ECWlogo.png'; // Import the logo image

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile threshold
    };

    handleResize(); // Check on load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src={ecwLogo} alt="ECW Logo" className="logo-image" /> {/* Replace with logo image */}
        </div>

        {isMobile ? (
          <>
            <button className="menu-button" onClick={toggleMenu}>
              ☰ {/* Hamburger icon */}
            </button>
            {menuOpen && (
              <div className="menu-overlay">
                <button className="close-button" onClick={toggleMenu}>✕</button> {/* Close button */}
                <div className="menu-content">
                  <Link to="/" onClick={toggleMenu}>Home</Link>
                  <Link to="/about-us" onClick={toggleMenu}>About Us</Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            <button className="socials-button">Get Inspired</button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
