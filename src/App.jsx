import React, { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import GameHub from './components/GameHub';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';

export default function App() {
  const [page, setPage] = useState('loading');
  const [transitioning, setTransitioning] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setPage('hub');
  }, []);

  const handleNavigate = useCallback((target) => {
    if (transitioning) return;
    setTransitioning(true);

    // Brief transition overlay
    setTimeout(() => {
      setPage(target);
      setTimeout(() => {
        setTransitioning(false);
      }, 100);
    }, 300);
  }, [transitioning]);

  return (
    <>
      {/* Page transition overlay */}
      {transitioning && (
        <div className="page-transition-overlay" />
      )}

      {page === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {page === 'hub' && (
        <GameHub onNavigate={handleNavigate} />
      )}

      {page === 'about' && (
        <AboutPage onNavigate={handleNavigate} />
      )}

      {page === 'projects' && (
        <ProjectsPage onNavigate={handleNavigate} />
      )}

      {page === 'contact' && (
        <ContactPage onNavigate={handleNavigate} />
      )}
    </>
  );
}
