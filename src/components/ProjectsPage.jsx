import React, { useState, useCallback } from 'react';
import NavigateButton from './NavigateButton';
import ProjectModal from './ProjectModal';

const projects = [
  {
    name: 'Lazy Auctions',
    desc: 'A full-stack auction platform with real-time bidding, user authentication, and payment integration. Built for seamless online auction experiences.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    link: 'https://github.com/shashankmauryaa/lazy-auctions',
    color: '#6C63FF',
    emoji: '🏷️',
  },
  {
    name: 'Strategos',
    desc: 'A strategy-based application featuring intelligent decision-making algorithms and interactive gameplay mechanics.',
    tech: ['Python', 'Flask', 'TensorFlow', 'React'],
    link: 'https://github.com/shashankmauryaa/strategos',
    color: '#FF6B6B',
    emoji: '♟️',
  },
  {
    name: 'This Portfolio',
    desc: 'The very portfolio you are viewing — a video-game-style interactive experience built with React, featuring pixel art, keyboard navigation, and neo-brutalist design.',
    tech: ['React', 'Vite', 'CSS3', 'JavaScript'],
    link: 'https://github.com/shashankmauryaa/my-portfolio',
    color: '#4ECDC4',
    emoji: '🎮',
  },
];

export default function ProjectsPage({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);

  const handleScroll = useCallback((e) => {
    if (e.deltaY > 20) {
      setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
    } else if (e.deltaY < -20) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }, []);

  const getCardClass = (index) => {
    const diff = index - activeIndex;
    if (diff === 0) return 'active';
    if (diff === 1) return 'behind-1';
    if (diff === 2) return 'behind-2';
    if (diff < 0) return 'behind-2';
    return 'behind-2';
  };

  return (
    <div className="page-container page-enter dot-grid-bg" onWheel={handleScroll}>
      <NavigateButton onNavigate={onNavigate} currentPage="projects" />

      <div className="projects-page">
        {/* Left: halftone name */}
        <div className="projects-name-display">
          <span className="projects-name-line">SHASHANK</span>
          <span className="projects-name-line">MAURYA</span>
        </div>

        {/* Right: card stack */}
        <div className="projects-stack-area">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`project-card ${getCardClass(i)}`}
              onClick={() => { if (i === activeIndex) setModal(project); }}
              style={{ display: Math.abs(i - activeIndex) > 2 ? 'none' : 'block' }}
            >
              <div className="project-card-inner">
                <div
                  className="project-card-color"
                  style={{ background: project.color }}
                >
                  {project.emoji}
                </div>
                <div className="project-card-info">
                  <h3 className="project-card-name">{project.name}</h3>
                  <p className="project-card-desc">{project.desc}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Dot indicators */}
          <div className="projects-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`project-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View project ${i + 1}`}
                type="button"
              />
            ))}
          </div>

          <div className="projects-scroll-hint">SCROLL</div>
        </div>
      </div>

      {modal && (
        <ProjectModal project={modal} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
