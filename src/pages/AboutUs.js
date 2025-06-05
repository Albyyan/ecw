// src/pages/AboutUs.js
import React from 'react';
import './AboutUs.css';
import AboutUsTitle from '../assets/AboutUsTitle.png';
import member1 from '../assets/member1.jpg';
import member2 from '../assets/member2.jpg';
import member3 from '../assets/member3.jpg';
import member4 from '../assets/member4.jpg';

function AboutUs() {
  return (
    <>
      <div style={{ height: '5rem' }}></div>

      <div className="about-us-container">
        {/* Replace the main heading with the AboutUsTitle image */}
        <img src={AboutUsTitle} alt="About Us" className="about-us-title-image" />

        <section className="about-us-section">
          <h2 className="about-us-heading">Who We Are</h2>
          <p className="about-us-text">
          We are the English & Creative Writing Society, a pen of readers and writers who aim to fill pages and conjure stories from the wells of their imagination. We offer a sanctuary for the private wordsmiths to write away under the promise of warm reception when they are ready to share. For the jesters and poets who buzz off the ears and eyes that consume their work, we offer an audience eager to give feedback and noise. You will find a community here, for just because writing is an endeavour taken alone, it is not one that has to be lonely.
          </p>
        </section>

        <section className="about-us-section">

</section>

        <section className="about-us-section team-section">
          <h2 className="about-us-heading">Meet the Exec Team! </h2>
          <div className="team-grid">
            <div className="team-member">
              <img src={member1} alt="Team Member 1" className="team-photo" />
              <p className="team-name">Chalene Kuklin</p>
            </div>
            <div className="team-member">
              <img src={member2} alt="Team Member 2" className="team-photo" />
              <p className="team-name">Yifei Pan</p>
            </div>
            <div className="team-member">
              <img src={member3} alt="Team Member 3" className="team-photo" />
              <p className="team-name">Albert Yan</p>
            </div>
            <div className="team-member">
              <img src={member4} alt="Team Member 4" className="team-photo" />
              <p className="team-name">Jennifer Nguyen</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutUs;
