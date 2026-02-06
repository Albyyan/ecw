import React, { useEffect } from 'react';

export default function App() {
  // === Typewriter Effect ===
  useEffect(() => {
    const text = "WE ARE THE UNSW ENGLISH & CREATIVE WRITING SOCIETY.";
    const typewriterElement = document.getElementById('typewriter-text');
    
    if (!typewriterElement) return;
    
    typewriterElement.innerHTML = '';
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        typewriterElement.innerHTML = text.substring(0, index + 1) + '<span class="caret">|</span>';
        index++;
        setTimeout(typeWriter, 80);
      } else {
        typewriterElement.innerHTML = text + '<span class="caret">|</span>';
      }
    }

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, []);

  // === Sticky Navbar ===
  useEffect(() => {
    const topBar = document.querySelector('.top-bar');
    const headerNav = document.querySelector('.header-nav');

    function handleScroll() {
      if (topBar && headerNav) {
        const scrollY = window.scrollY;
        const topBarHeight = topBar.offsetHeight;
        
        if (scrollY > topBarHeight / 2) {
          headerNav.classList.add('nav-stuck');
        } else {
          headerNav.classList.remove('nav-stuck');
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === Alice Animation on Scroll ===
  useEffect(() => {
    function handleAliceScroll() {
      const aliceContainer = document.querySelector('.alice-container');
      const aboutSection = document.querySelector('.about-us-section');
      
      if (aliceContainer && aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          aliceContainer.classList.add('animate-alice');
        }
      }
    }

    window.addEventListener('scroll', handleAliceScroll);
    handleAliceScroll();
    return () => window.removeEventListener('scroll', handleAliceScroll);
  }, []);

  // === TV Smooth Follow ===
  useEffect(() => {
    const section = document.querySelector('.events-section');
    const inner = document.querySelector('.tv-inner');
    if (!section || !inner) return;

    let current = 0, target = 0, rafId = 0;

    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + sectionRect.top;
      const sectionHeight = sectionRect.height;

      const innerRect = inner.getBoundingClientRect();
      const innerHeight = innerRect.height;

      const viewportY = window.scrollY + 100;
      const raw = viewportY - sectionTop;
      target = Math.max(0, Math.min(raw, Math.max(0, sectionHeight - innerHeight)));
    };

    const animate = () => {
      current += (target - current) * 0.15;
      inner.style.transform = `translateY(${current}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onScroll = () => measure();
    const onResize = () => { measure(); current = target; inner.style.transform = `translateY(${current}px)`; };

    const ro = new ResizeObserver(() => onResize());
    ro.observe(inner);

    const imgs = inner.querySelectorAll('img');
    let pending = imgs.length;
    if (pending === 0) measure();
    imgs.forEach(img => {
      if (img.complete) { if (--pending === 0) onResize(); }
      else img.addEventListener('load', () => { if (--pending === 0) onResize(); }, { once: true });
    });

    measure();
    current = target;
    inner.style.transform = `translateY(${current}px)`;
    rafId = requestAnimationFrame(animate);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, []);

  // === TV Image Swap on Scroll ===
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll('.event-item[data-tv-content]')
    );
    const byId = {
      www: document.getElementById('www'),
      wow: document.getElementById('wow'),
      arc: document.getElementById('arc'),
    };

    if (items.length === 0 || !byId.www || !byId.wow || !byId.arc) return;

    function setActive(id) {
      Object.values(byId).forEach((img) => img && img.classList.remove('active'));
      byId[id]?.classList.add('active');
    }

    const io = new IntersectionObserver(
      () => {
        let best = null;
        const viewportCenter = window.innerHeight / 2;

        for (const el of items) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;

          const elCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elCenter - viewportCenter);
          if (!best || dist < best.dist) {
            best = { id: el.dataset.tvContent, dist };
          }
        }

        if (best) setActive(best.id);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    items.forEach((el) => io.observe(el));
    setActive(items[0]?.dataset.tvContent || 'www');

    function onScroll() {
      io.takeRecords();
      let best = null;
      const viewportCenter = window.innerHeight / 2;
      for (const el of items) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportCenter);
        if (!best || dist < best.dist) best = { id: el.dataset.tvContent, dist };
      }
      if (best) setActive(best.id);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed background layers */}
      <div className="background-container">
        <div className="background-back"></div>
        <div className="background-front"></div>
      </div>

      {/* Main scrollable content */}
      <div className="content">
        {/* Navigation */}
        <div className="top-bar"></div>
        <div className="logo"></div>

        <div className="nav-wrapper">
          <nav className="header-nav">
            <a href="#about">ABOUT US</a>
            <a href="#events">EVENTS</a>
            <a href="#team">THE TEAM</a>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="ecw-heading">
          <p id="typewriter-text"></p>
        </div>

        {/* Marquee */}
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

        {/* About Us Section */}
        <section className="about-us-section" id="about">
          <div className="about-graphic-placeholder alice-container"></div>
          <div className="about-text">
            <h2 className="section-title">ABOUT US</h2>
            <p>
              The English & Creative Writing society is a student-run group dedicated to fostering a strong community of readers and writers on campus. 
              Through a range of educational and social enrichment activities, our goal is to nurture the necessary skills and appreciation for the literary 
              arts in an accessible setting for all interested parties.
            </p>
            <p style={{ marginTop: '2rem' }}>
              Whether our members' course of study falls within or outside of the realm of English or Creative Writing, we strive to promote the technical, 
              disciplinary and social aspects of writing. Having cultivated a strong on-campus presence, ECW has taken to hosting workshops for students 
              interested in practicing regular, committed writing with the dual purpose of connecting like-minded people.
            </p>
            <p style={{ marginTop: '2rem' }}>
              We believe that in order to provide our generation of creatives the tools they need to excel in the industry, it is vital that they foster 
              relationships with others within the community through networking opportunities. In addition to the smaller scale events we run, ECW executes 
              larger events with the aim to shed light on niche pockets within the Australian writing industry and provide guidance outside the realm of 
              traditional university courses.
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className="events-section" id="events">
          <h2 className="events-title section-title">EVENTS</h2>

          <div className="events-content">
            {/* TV: smooth-follow rail */}
            <div className="tv-rail">
              <div className="tv-inner">
                <div className="tv-screen">
                  <img id="www" className="tv-image tv-content" src="WWWPhoto.jpg" alt="Weekly Writing Workshop" />
                  <img id="wow" className="tv-image tv-content" src="WOWPhoto.jpg" alt="Works of Writing" />
                  <img id="arc" className="tv-image tv-content" src="ArcPhoto.jpg" alt="UNSW O-Week" />
                </div>
                <img className="tv-frame" src="tv.png" alt="TV frame" />
              </div>
            </div>

            <div className="events-list">
              {/* Weekly Writing Workshop */}
              <div className="event-item" data-tv-content="www">
                <div className="event-content">
                  <h3>Weekly Writing Workshop</h3>
                  <p>
                    Our Weekly Writing Workshop (WWW) series is a recurring initiative designed to strengthen both the online and offline writing culture at UNSW, 
                    engaging over 25 members on a weekly basis in a productive creative environment.
                  </p>
                  <p>
                    Having run over 30 sessions since our inception in 2023, WWW is one of the cornerstone events in the ECW calendar, offering casual, structured, 
                    and collaborative writing environments where participants are encouraged to develop their craft either independently or collaboratively.
                  </p>
                  <p>
                    The dual purpose of WWW is to support writers of all levels and to grow ECW's online presence by showcasing member contributions, fostering 
                    community engagement, and creating a public platform for student voices. WWW has helped cultivate a sustained and inclusive writing culture that 
                    reaches well beyond our campus.
                  </p>
                </div>
              </div>

              {/* Works of Writing */}
              <div className="event-item" data-tv-content="wow">
                <div className="event-content">
                  <h3>Works of Writing</h3>
                  <p>
                    Our premier event, Work of Writing (WoW), is an industry-focused showcase that brings together acclaimed professionals from across the literary 
                    world—authors, editors, publishers, screenwriters, and more—for a night of insightful discussion and invaluable networking that welcomes over 80 students.
                  </p>
                  <p>
                    In recent years, WoW has welcomed prominent names who have shaped Australia's literary and creative landscape, including Michelle De Kretser, 
                    Brigitta Olubas, Toby Fitch and Gavy Naher. Through panels and Q&As, attendees gain firsthand insight into the realities of working in the writing 
                    industry, emerging trends, and the personal journeys of those who have made storytelling their career. It is not only one of our most high-profile 
                    events but also a key opportunity for members to bridge the gap between student creativity and professional artistry.
                  </p>
                </div>
              </div>

              {/* ARC O-Week */}
              <div className="event-item" data-tv-content="arc">
                <div className="event-content">
                  <h3>ARC O-Week</h3>
                  <p>
                    During O-Week and Launch Week, ECW made a dynamic first impression on current and incoming students with interactive and literary-themed 
                    programs. Our Blind Date with a Book activity and Trivia Trials were standout favourites, drawing in both literature lovers and curious newcomers 
                    with the promise of a surprise literary match and challenge. These introductory events not only boosted engagement but also served as a warm welcome to creative spaces on campus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section" id="team">
          <h2 className="team-title section-title">THE TEAM</h2>
          
          <div className="team-layer">
            <h3 className="team-layer-title">Executive Committee</h3>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo">
                  <img src="Chalene_Mugshot.jpg" alt="Chalene Kuklin" />
                </div>
                <div className="member-name">Chalene Kuklin</div>
                <div className="member-position">President</div>
              </div>
              <div className="team-member">
                <div className="member-photo">
                  <img src="Yifei_Mugshot.jpg" alt="Yifei (Lucy) Pan" />
                </div>
                <div className="member-name">Yifei (Lucy) Pan</div>
                <div className="member-position">Secretary</div>
              </div>
              <div className="team-member">
                <div className="member-photo">
                  <img src="Albert_Mugshot.jpg" alt="Albert Yan" />
                </div>
                <div className="member-name">Albert Yan</div>
                <div className="member-position">Treasurer</div>
              </div>
              <div className="team-member">
                <div className="member-photo">
                  <img src="John_Mugshot.jpg" alt="Jennifer Nguyen" />
                </div>
                <div className="member-name">Jennifer Nguyen</div>
                <div className="member-position">Welfare Officer</div>
              </div>
            </div>

            <h3 className="team-layer-title">Director Committee</h3>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-photo">
                  <img src="Harper_Mugshot.png" alt="Harper Spits" />
                </div>
                <div className="member-name">Harper Spits</div>
                <div className="member-position">Events Director</div>
              </div>
              <div className="team-member">
                <div className="member-photo">
                  <img src="Johnny_Mugshot.jpg" alt="Johnny Pham" />
                </div>
                <div className="member-name">Johnny Pham</div>
                <div className="member-position">Marketing Director</div>
              </div>
              <div className="team-member">
                <div className="member-photo">
                  <img src="Alan.webp" alt="Alan Nguyen" />
                </div>
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
              <a
                className="contact-link"
                href="https://discord.gg/R9TkzV7yg3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <div className="contact-icon">
                  <img src="discord.png" alt="Discord" />
                </div>
              </a>

              <a
                className="contact-link"
                href="https://www.instagram.com/unswecwsoc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <div className="contact-icon">
                  <img src="insta.png" alt="Instagram" />
                </div>
              </a>

              <a
                className="contact-link"
                href="https://www.facebook.com/profile.php?id=61551478253920"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <div className="contact-icon">
                  <img src="email.png" alt="Facebook" />
                </div>
              </a>

              <a
                className="contact-link"
                href="https://campus.hellorubric.com/?s=12523"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ARC / Rubric"
              >
                <div className="contact-icon">
                  <img src="arc.png" alt="ARC / Rubric" />
                </div>
              </a>
            </div>
            <p className="footer-text">
              © {new Date().getFullYear()} UNSW English & Creative Writing Society — All Rights Reserved
            </p>
            <p className="footer-text">
              Website Design by Albert Yan
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}