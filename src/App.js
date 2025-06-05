// App.js
import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Parallax from './components/Parallax';
import Welcome from './components/Home/Welcome';
import AboutUs from './pages/AboutUs';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [blackout, setBlackout] = useState(true);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef(null);

  const updateMousePosition = (e) => {
    const { clientX: x, clientY: y } = e;
    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(() => {
      setMousePosition({ x, y });
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    setBlackout(true);
    setLoading(true);

    const blackoutTimer = setTimeout(() => setBlackout(false), 100);
    const loadingTimer = setTimeout(() => setLoading(false), 1000);

    return () => {
      clearTimeout(blackoutTimer);
      clearTimeout(loadingTimer);
    };
  }, [location]);

  return (
    <div className="App">
      {blackout && <div className="blackout-overlay"></div>}
      {loading && <Loading />}

      <div className={`content ${!loading ? 'loaded' : ''}`}>
        {!loading && (
          <>
            <ScrollToTop />
            <Parallax mousePosition={mousePosition} />
            <Header />
            <div>
              <Routes>
                <Route path="/" element={<><Welcome /></>} />
                <Route path="/about-us" element={<AboutUs />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
