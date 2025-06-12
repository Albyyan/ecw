import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainApp />);

function MainApp() {
  console.log('Document height:', document.documentElement.scrollHeight);
  console.log('Window height:', window.innerHeight);
  console.log('Body overflow-y:', getComputedStyle(document.body).overflowY);
  console.log('HTML overflow-y:', getComputedStyle(document.documentElement).overflowY);

  // === Typewriter Hook ===
  useEffect(() => {
    const text = "WE ARE THE UNSW ENGLISH & CREATIVE WRITING SOCIETY.";
    const typewriterElement = document.getElementById('typewriter-text');
    
    console.log('Typewriter element found:', typewriterElement); // Debug log
    
    if (!typewriterElement) {
      console.error('Typewriter element not found!');
      return;
    }
    
    // Clear any existing content first
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

    // Start typewriter immediately to test, then with delay
    typewriterElement.innerHTML = 'Loading...'; // Test text
    setTimeout(() => {
      typewriterElement.innerHTML = ''; // Clear test text
      typeWriter();
    }, 1000);
  }, []);

  // === Sticky Navbar Hook ===
  useEffect(() => {
    const topBar = document.querySelector('.top-bar');
    const headerNav = document.querySelector('.header-nav');

    function handleScroll() {
      const scrollY = window.scrollY;
      if (topBar) {
        const topBarHeight = topBar.offsetHeight;
        if (scrollY > topBarHeight / 2) {
          headerNav?.classList.add('nav-stuck');
        } else {
          headerNav?.classList.remove('nav-stuck');
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === Alice Animation Hook ===
  useEffect(() => {
    function handleScroll() {
      const aliceContainer = document.querySelector('.alice-container');
      const aboutSection = document.querySelector('.about-us-section');
      
      if (aliceContainer && aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          aliceContainer.classList.add('animate-alice');
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === TV Scroll Hook ===
  useEffect(() => {
    const tvContainer = document.querySelector('.tv-container');
    const tvContents = document.querySelectorAll('.tv-content');
    const eventItems = document.querySelectorAll('.event-item[data-tv-content]');
    const eventsSection = document.querySelector('.events-section');
    const eventsList = document.querySelector('.events-list');
    let currentActiveContent = null;

    function updateTVBehavior() {
      if (!tvContainer || !eventsSection || !eventsList) return;
      
      // Check if we're on mobile
      if (window.innerWidth <= 1400) {
        tvContainer.classList.remove('sticky', 'bottom');
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Get events section boundaries
      const eventsRect = eventsSection.getBoundingClientRect();
      const eventsTop = scrollY + eventsRect.top;
      const eventsBottom = eventsTop + eventsRect.height;
      
      // Get events list boundaries
      const eventsListRect = eventsList.getBoundingClientRect();
      const eventsListTop = scrollY + eventsListRect.top;
      const eventsListBottom = eventsListTop + eventsListRect.height;
      
      // TV sticky behavior logic
      const tvStartSticky = eventsListTop - (windowHeight / 2) + 150;
      const tvStopSticky = eventsListBottom - (windowHeight / 2) - 150;
      
      if (scrollY >= tvStartSticky && scrollY <= tvStopSticky) {
        tvContainer.classList.add('sticky');
        tvContainer.classList.remove('bottom');
      } else if (scrollY > tvStopSticky) {
        tvContainer.classList.remove('sticky');
        tvContainer.classList.add('bottom');
      } else {
        tvContainer.classList.remove('sticky', 'bottom');
      }

      // Update TV content - improved logic to prevent random switching
      const triggerPoint = scrollY + windowHeight / 2;
      let activeEvent = null;
      let bestMatch = null;
      let smallestDistance = Infinity;
      
      eventItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemTop = rect.top + scrollY;
        const itemBottom = itemTop + rect.height;
        const itemCenter = itemTop + (rect.height / 2);
        
        // Check if trigger point is within the item boundaries
        if (triggerPoint >= itemTop && triggerPoint <= itemBottom) {
          activeEvent = item.getAttribute('data-tv-content');
        }
        
        // Also track the closest item as backup
        const distance = Math.abs(triggerPoint - itemCenter);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          bestMatch = item.getAttribute('data-tv-content');
        }
      });

      // Use the active event if found, otherwise use the closest one
      // This prevents random switching back to first item
      const selectedEvent = activeEvent || bestMatch;

      // Only update if we have a valid selection and it's different from current
      if (selectedEvent && selectedEvent !== currentActiveContent) {
        tvContents.forEach(content => content.classList.remove('active'));
        const activeContentElement = document.getElementById(selectedEvent);
        if (activeContentElement) {
          activeContentElement.classList.add('active');
          currentActiveContent = selectedEvent;
        }
      }
    }

    // Initialize with first content active
    if (tvContents[0]) {
      tvContents[0].classList.add('active');
      currentActiveContent = tvContents[0].id;
    }

    updateTVBehavior();
    window.addEventListener('scroll', updateTVBehavior);
    window.addEventListener('resize', updateTVBehavior);
    
    return () => {
      window.removeEventListener('scroll', updateTVBehavior);
      window.removeEventListener('resize', updateTVBehavior);
    };
  }, []);

  // === Mobile Menu Hook ===
  useEffect(() => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.header-nav');

    function toggleMenu() {
      nav?.classList.toggle('show');
    }

    function closeMenu() {
      nav?.classList.remove('show');
    }

    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMenu);
    }
    
    document.querySelectorAll('.header-nav a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('click', (e) => {
      if (nav && menuToggle && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    return () => {
      if (menuToggle) {
        menuToggle.removeEventListener('click', toggleMenu);
      }
    };
  }, []);

  return <App />;
}