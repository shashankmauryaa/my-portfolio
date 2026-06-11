import React, { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import GameHub from './components/GameHub';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';

export default function App() {
  const [page, setPage] = useState('loading');
  const [targetPage, setTargetPage] = useState('hub');

  const handleLoadingComplete = useCallback(() => {
    setPage(targetPage);
  }, [targetPage]);

  const handleNavigate = useCallback((target) => {
    setTargetPage(target);
    setPage('loading');
  }, []);

  return (
    <>
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
