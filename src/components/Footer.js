// src/components/Footer.js
import React from 'react';
import './Footer.css';
import emailIcon from '../assets/email.png'; // Replace with your actual paths
import instagramIcon from '../assets/instagram.png';
import discordIcon from '../assets/discord.png';
import otherIcon from '../assets/other.png'; // Add a fourth communication method if needed

function Footer() {
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('unsw.ecw@gmail.com');
    alert('Email copied to clipboard!');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <b> Contact Us! </b>
        <div className="social-links">
          <img
            src={emailIcon}
            alt="Email"
            className="social-icon"
            onClick={copyEmailToClipboard}
          />
          <a href="https://www.instagram.com/unswecwsoc/">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
          <a href="https://discord.gg/HBrJz7Fh">
            <img src={discordIcon} alt="Discord" className="social-icon" />
          </a>
          <a href="https://www.arc.unsw.edu.au/get-involved/opportunity?name=English%20%26%20Creative%20Writing%20Society">
            <img src={otherIcon} alt="Other" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
