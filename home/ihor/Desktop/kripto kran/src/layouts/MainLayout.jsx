import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MainLayout = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10 z-0"></div>
        <motion.div
          className={`page-transition ${transitionStage}`}
          onAnimationEnd={handleAnimationEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-8">
            <Outlet />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;