import React, { useState, useCallback, useEffect } from 'react';
import NavigateButton from './NavigateButton';
import ProjectModal from './ProjectModal';
import ParticleText from './ParticleText';

const projects = [
  {
    name: 'Lazy Auctions',
    desc: 'A full-stack auction platform with real-time bidding, user authentication, and payment integration. Built for seamless online auction experiences.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    link: 'https://shashankmauryaa.github.io/LazyAuctions/',
    color: '#6C63FF',
  },
  {
    name: 'Strategos',
    desc: 'A strategy-based application featuring intelligent decision-making algorithms and interactive gameplay mechanics.',
    tech: ['Python', 'Flask', 'TensorFlow', 'React'],
    link: 'https://shashankmauryaa.github.io/strategos/',
    color: '#FF6B6B',
  },
  {
    name: 'Particle Sphere',
    desc: 'An interactive 3D particle sphere visualization built with Three.js. Features dynamic particle animations and real-time user interaction.',
    tech: ['Three.js', 'JavaScript', 'WebGL', 'CSS3'],
    link: 'https://shashankmauryaa.github.io/particle-sphere/',
    color: '#4ECDC4',
  },
  {
    name: 'This Portfolio',
    desc: 'The very portfolio you are viewing — a video-game-style interactive experience built with React, featuring pixel art, keyboard navigation, and neo-brutalist design.',
    tech: ['React', 'Vite', 'CSS3', 'Canvas'],
    link: 'https://github.com/shashankmauryaa/my-portfolio',
    color: '#F59E0B',
  },
];

export default function ProjectsPage({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [scrollCooldown, setScrollCooldown] = useState(false);

  // Animate title in
  useEffect(() => {
    const timer = setTimeout(() => setTitleOpacity(1), 300);
    return () => clearTimeout(timer);
  }, []);

  // Update title when activeIndex changes
  useEffect(() => {
    setTitleOpacity(0);
    const timer = setTimeout(() => setTitleOpacity(1), 150);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleScroll = useCallback((e) => {
    if (scrollCooldown) return;
    const delta = e.deltaY;
    if (Math.abs(delta) < 15) return;

    setScrollCooldown(true);
    setTimeout(() => setScrollCooldown(false), 500);

    if (delta > 0) {
      setActiveIndex((prev) => Math.min(prev + 1, projects.length - 1));
    } else if (delta < 0) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [scrollCooldown]);

  const getCardStyle = (index) => {
    const diff = index - activeIndex;

    if (diff < 0) {
      // Cards that have been scrolled past — hidden below
      return {
        opacity: 0,
        zIndex: 0,
        transform: `translateY(60px) translateZ(-40px) scale(1.05)`,
        pointerEvents: 'none',
      };
    }

    if (diff === 0) {
      // Active card — front and center at bottom
      return {
        opacity: 1,
        zIndex: projects.length + 1 - diff,
        transform: 'none',
        pointerEvents: 'auto',
        cursor: 'default',
      };
    }

    // Cards behind — stacked upward with perspective
    return {
      opacity: 1,
      zIndex: projects.length + 1 - diff,
      transform: `translateY(${-60 * diff}px) translateZ(${-40 * diff}px) scale(${1 - 0.035 * diff}) rotateX(${-5 * diff}deg)`,
      pointerEvents: 'auto',
      cursor: 'pointer',
    };
  };

  const handleCardClick = (index) => {
    if (index === activeIndex) {
      setModal(projects[index]);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="page-container page-enter dot-grid-bg" onWheel={handleScroll}>
      <NavigateButton onNavigate={onNavigate} currentPage="projects" />

      <div className="projects-page-v2">
        {/* Left: Particle text name */}
        <div className="projects-left-panel">
          <ParticleText text={"SHASHANK\nMAURYA"} width={600} height={400} />
        </div>

        {/* Right: Card stack */}
        <div className="projects-right-panel">
          {/* Title above cards */}
          <div className="projects-title-area" style={{ opacity: titleOpacity, transform: titleOpacity === 1 ? 'translateY(0)' : 'translateY(15px)', transition: 'all 0.4s ease' }}>
            <p className="projects-label">PROJECTS</p>
            <h1 className="projects-active-title">{projects[activeIndex].name}</h1>
          </div>

          {/* 3D Card stack container */}
          <div className="projects-stack-v2">
            <div className="projects-stack-inner">
              {projects.map((project, i) => (
                <div
                  key={project.name}
                  className="project-card-v2"
                  style={{
                    ...getCardStyle(i),
                    backgroundColor: project.color,
                    transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onClick={() => handleCardClick(i)}
                >
                  {/* Project visual */}
                  <div className="project-card-v2-visual">
                    <span className="project-card-v2-name">{project.name}</span>
                    <div className="project-card-v2-techs">
                      {project.tech.map((t) => (
                        <span key={t} className="project-card-v2-tech">{t}</span>
                      ))}
                    </div>
                  </div>
                  {/* Dark overlay for non-active cards */}
                  <div
                    className="project-card-v2-overlay"
                    style={{ opacity: i === activeIndex ? 0 : 0.3 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint + dot indicators */}
          <div className="projects-indicators">
            <div className="projects-scroll-col">
              <span className="projects-scroll-arrow">↑</span>
              <span className="projects-scroll-label">SCROLL</span>
              <span className="projects-scroll-arrow">↓</span>
            </div>
            <div className="projects-dots-col">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`project-dot-v2 ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View project ${i + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <ProjectModal project={modal} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
