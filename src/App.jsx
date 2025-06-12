import React from 'react';

// Reusable EventItem component defined outside of the JSX return
function EventItem({ id, title, desc1, desc2 }) {
  return (
    <div className="event-item" data-tv-content={id}>
      <div className="event-content">
        <h3>{title}</h3>
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      {/* Fixed background layers */}
      <div className="background-container">
        <div className="background-back"></div>
        <div className="background-front"></div>
      </div>

      {/* Main content outside fixed background to allow scrolling */}
      <div className="content">
        <div className="top-bar"></div>
        <div className="logo"></div>

        <div className="nav-wrapper">
          <button className="menu-toggle" aria-label="Toggle Menu">&#9776;</button>
          <nav className="header-nav">
            <a href="#about">ABOUT US</a>
            <a href="#events">EVENTS</a>
            <a href="#team">THE TEAM</a>
            <a href="#inspired">GET INSPIRED</a>
          </nav>
        </div>

        <div className="ecw-heading">
          <p id="typewriter-text"></p>
        </div>

        <div className="marquee-line top-line"></div>

        <div className="marquee-container">
          <div className="marquee-track">
            <div className="marquee-text">
              We are where ink meets paper and thoughts become stories. Where words are drawn together like sand washed ashore, building crumbling castles with cracked seashells for windows.
            </div>
            <div className="marquee-text">
              We are where ink meets paper and thoughts become stories. Where words are drawn together like sand washed ashore, building crumbling castles with cracked seashells for windows.
            </div>
          </div>
        </div>

        <div className="marquee-line bottom-line"></div>

        {/* About Us Section - Fixed proper id */}
        <section className="about-us-section" id="about">
          <div className="about-graphic-placeholder alice-container"></div>
          <div className="about-text">
            <h2 className="section-title">ABOUT US</h2>
            <p>
              We are the English & Creative Writing Society, a pen of readers and writers who aim to fill pages and conjure stories from the wells of their imagination. We offer a sanctuary for the private wordsmiths to write away under the promise of warm reception when they are ready to share.
            </p>
            <p style={{ marginTop: '2rem' }}>
              Our society has been fostering creativity and literary excellence for years, bringing together passionate writers from all backgrounds and skill levels. Whether you're crafting your first poem or working on your novel, you'll find kindred spirits here who understand the joys and challenges of the writing life.
            </p>
            <p style={{ marginTop: '2rem' }}>
              Join us for workshops, readings, social events, and so much more. Your story matters, and we can't wait to hear it.
            </p>
          </div>
        </section>

        {/* Events Section - Completely restructured */}
        <section className="events-section" id="events">
          <h2 className="events-title section-title">EVENTS</h2>

          <div className="events-content">
            {/* TV Container */}
            <div className="tv-container" id="tv-container">
              <div className="tv-frame">
                <div className="tv-screen">
                  <div className="tv-content tv-workshop" id="tv-workshop"></div>
                  <div className="tv-content tv-works" id="tv-works"></div>
                  <div className="tv-content tv-oweek" id="tv-oweek"></div>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="events-list">
              <EventItem
                id="tv-workshop"
                title="Weekly Writing Workshop"
                desc1="Join us every week for our collaborative writing sessions where creativity flows freely and ideas come to life."
                desc2="Bring your works-in-progress, try new writing prompts, or simply listen and learn from fellow writers."
              />

              <EventItem
                id="tv-works"
                title="Works of Writing"
                desc1="Our flagship showcase event where members share their finest pieces with an appreciative audience."
                desc2="Experience the magic of live readings, witness the power of storytelling, and be part of a community that believes in the transformative nature of literature."
              />

              <EventItem
                id="tv-oweek"
                title="ARC O-Week"
                desc1="Meet us during Orientation Week at the Arc! Discover what the English & Creative Writing Society is all about."
                desc2="Chat with our members, learn about upcoming events, and see if our community is the right fit for you!"
              />
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className="team-section" id="team">
          <h2 className="team-title section-title">THE TEAM</h2>
          <div className="team-layer">
            <h3 className="team-layer-title">Executive Committee</h3>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo">Photo Soon</div>
                <div className="member-name">Chalene Kuklin</div>
                <div className="member-position">President</div>
              </div>
              <div className="team-member">
                <div className="member-photo">Photo Soon</div>
                <div className="member-name">Yifei (Lucy) Pan</div>
                <div className="member-position">Secretary</div>
              </div>
              <div className="team-member">
                <div className="member-photo">Photo Soon</div>
                <div className="member-name">Albert Yan</div>
                <div className="member-position">Treasurer</div>
              </div>
              <div className="team-member">
                <div className="member-photo">Photo Soon</div>
                <div className="member-name">Jennifer Nguyen</div>
                <div className="member-position">Welfare Officer</div>
              </div>
            </div>
            <h3 className="team-layer-title">Director Committee</h3>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo">Photo Soon</div>
                <div className="member-name">Harper Spits</div>
                <div className="member-position">Events Director</div>
              </div>
              <div className="team-member">
                <div className="member-photo">Photo Soon</div>
                <div className="member-name">Johnny Pham</div>
                <div className="member-position">Marketing Director</div>
              </div>
              <div className="team-member">
                <div className="member-photo">Photo Soon</div>
                <div className="member-name">Alan Nguyen</div>
                <div className="member-position">Consultative Director</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-content">
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><div className="social-icon">📘</div></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><div className="social-icon">📷</div></a>
              <a href="mailto:contact@unswecw.com" aria-label="Email"><div className="social-icon email-icon">✉️</div></a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord"><div className="social-icon">💬</div></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><div className="social-icon">💼</div></a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}