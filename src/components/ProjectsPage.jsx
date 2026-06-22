import React, { useState, useCallback, useEffect, useRef } from 'react';
import NavigateButton from './NavigateButton';
import ProjectModal from './ProjectModal';
import ParticleText from './ParticleText';

const projects = [
  {
    name: 'Strategos',
    desc: 'A strategy-based application featuring intelligent decision-making algorithms and interactive gameplay mechanics.',
    tech: ['Python', 'Flask', 'TensorFlow', 'React'],
    link: 'https://shashankmauryaa.github.io/strategos/',
    color: '#FF6B6B',
    image: 'strategos-gemini.png',
  },
  {
    name: 'Kintsugi Wellness',
    desc: 'A web application for booking therapy sessions, featuring a calendar, time slot selection, and payment integration.',
    tech: ['Next.js', 'Tailwind CSS'],
    link: 'https://kintsugi-wellness.vercel.app/portal',
    color: '#e5f412ff',
    image: 'kintsugi-vase.png',
  },
  {
    name: 'Particle Sphere',
    desc: 'An interactive 3D particle sphere visualization built with Three.js. Features dynamic particle animations and real-time user interaction.',
    tech: ['Three.js', 'JavaScript', 'WebGL', 'CSS3'],
    link: 'https://shashankmauryaa.github.io/particle-sphere/',
    color: '#4ECDC4',
    image: 'particle-sphere.png',
  },
  {
    name: 'Lazy Auctions',
    desc: 'A full-stack auction platform with real-time bidding, user authentication, and payment integration. Built for seamless online auction experiences.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    link: 'https://shashankmauryaa.github.io/LazyAuctions/',
    color: '#6C63FF',
    image: 'auctions.png',
  },
  {
    name: 'Estates',
    desc: 'Real Estate Platform to Buy, Rent & Sell Properties',
    tech: ['React', 'Vite', 'CSS3', 'Canvas'],
    link: 'https://shashankmauryaa.github.io/estates',
    color: '#07ebf7ff',
    image: 'estates.png',
  },
  {
    name: 'This Portfolio',
    desc: 'The very portfolio you are viewing — a video-game-style interactive experience built with React, featuring pixel art, keyboard navigation, and neo-brutalist design.',
    tech: ['React', 'Vite', 'CSS3', 'Canvas'],
    link: 'https://shashankmauryaa.github.io/my-portfolio',
    color: '#F59E0B',
    image: 'portfolio.png',
  },
];

const N = projects.length;

export default function ProjectsPage({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [targetIndex, setTargetIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollTimerRef = useRef(null);
  const scrollAccumulator = useRef(0);
  const scrollTimeoutRef = useRef(null);

  // Auto-scroll: step one card at a time towards targetIndex
  useEffect(() => {
    if (targetIndex === null || targetIndex === activeIndex) {
      setTargetIndex(null);
      return;
    }
    scrollTimerRef.current = setTimeout(() => {
      const forwardDist = (targetIndex - activeIndex + N) % N;
      const dir = forwardDist <= N / 2 ? 1 : -1;
      setActiveIndex((prev) => (prev + dir + N) % N);
    }, 200);
    return () => clearTimeout(scrollTimerRef.current);
  }, [activeIndex, targetIndex]);

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

  // Infinite scroll — multiple steps based on scroll speed
  const handleScroll = useCallback((e) => {
    scrollAccumulator.current += e.deltaY;
    const threshold = 80; // slightly less than 100 to ensure consistent single-ticks

    if (Math.abs(scrollAccumulator.current) >= threshold) {
      const steps = Math.floor(Math.abs(scrollAccumulator.current) / threshold);
      const sign = Math.sign(scrollAccumulator.current);
      
      setActiveIndex((prev) => {
        let next = prev + (sign * steps);
        return ((next % N) + N) % N;
      });

      scrollAccumulator.current -= sign * steps * threshold;
      setTargetIndex(null); // cancel any auto-scroll on manual wheel
    }

    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      scrollAccumulator.current = 0;
    }, 250);
  }, []);

  // Calculate shortest circular distance from activeIndex to a given index
  const getCircularDiff = (index) => {
    let diff = ((index - activeIndex) % N + N) % N;
    return diff;
  };

  const getCardStyle = (index) => {
    const diff = getCircularDiff(index);
    const isHovered = hoveredIndex === index;

    if (diff === 0) {
      // Active card — front and center, with hover lift
      return {
        opacity: 1,
        zIndex: N + 1,
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
        pointerEvents: 'auto',
        cursor: 'pointer',
        boxShadow: isHovered
          ? '0 35px 60px -12px rgba(0, 0, 0, 0.35)'
          : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      };
    }

    // Dynamic stack - all cards behind will be displayed and stacked automatically.
    // No hardcoded limit means any new cards added to the array will just stack.

    // Cards behind — stacked upward, with hover pop
    // Interpolate spacing to ensure all cards fit within a maximum stack depth
    const yStep = Math.min(60, 300 / Math.max(1, N - 1));
    const rotateStep = Math.min(5, 25 / Math.max(1, N - 1));
    const scaleStep = Math.min(0.035, 0.175 / Math.max(1, N - 1));

    const baseY = -yStep * diff;
    const hoverExtra = isHovered ? -20 : 0;
    
    return {
      opacity: 1,
      zIndex: N + 1 - diff,
      transform: `translateY(${baseY + hoverExtra}px) scale(${1 - scaleStep * diff + (isHovered ? 0.02 : 0)}) rotateX(${-rotateStep * diff}deg)`,
      pointerEvents: 'auto',
      cursor: 'pointer',
      boxShadow: isHovered
        ? '0 35px 60px -12px rgba(0, 0, 0, 0.4)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      filter: isHovered ? 'brightness(1.1)' : 'none',
    };
  };

  const cardRefs = useRef([]);

  // Container-level hover detection using card bounding rects.
  // Checks from front to back — the active card matches first in
  // the overlap zone. Background cards only match when cursor is
  // in their exclusive exposed strip above the front cards.
  const handleStackMouseMove = useCallback((e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    let found = null;

    // Dynamically check from front (diff=0) to the very back (diff=N-1)
    for (let diff = 0; diff <= N - 1; diff++) {
      const idx = (activeIndex + diff) % N;
      const el = cardRefs.current[idx];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (mouseX >= rect.left && mouseX <= rect.right &&
          mouseY >= rect.top && mouseY <= rect.bottom) {
        found = idx;
        break; // first match wins — front card takes priority in overlap
      }
    }

    setHoveredIndex(found);
  }, [activeIndex]);

  const handleStackMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Click uses hoveredIndex — works even in the overlap zone
  const handlePanelClick = useCallback(() => {
    if (hoveredIndex === null) return;
    if (hoveredIndex === activeIndex) {
      setModal(projects[hoveredIndex]);
    } else {
      setTargetIndex(hoveredIndex);
    }
  }, [hoveredIndex, activeIndex]);

  return (
    <div className="page-container page-enter dot-grid-bg" onWheel={handleScroll}>
      <NavigateButton onNavigate={onNavigate} currentPage="projects" />

      <div className="projects-page-v2">
        {/* Left: Particle text name */}
        <div className="projects-left-panel">
          {/* <ParticleText text={"SHASHANK\nMAURYA"} width={600} height={400} /> */}
          <ParticleText text={projects[activeIndex].name.toUpperCase().replace(' ', '\n')} width={600} height={400} />
        </div>

        {/* Right: Card stack */}
        <div
          className="projects-right-panel"
          onMouseMove={handleStackMouseMove}
          onMouseLeave={handleStackMouseLeave}
          onClick={handlePanelClick}
        >
          {/* Title above cards */}
          {/* <div className="projects-title-area" style={{ opacity: titleOpacity, transform: titleOpacity === 1 ? 'translateY(0)' : 'translateY(15px)', transition: 'all 0.4s ease' }}>
            <p className="projects-label">PROJECTS</p>
            <h1 className="projects-active-title">{projects[activeIndex].name}</h1>
          </div> */}

          {/* 3D Card stack container */}
          <div className="projects-stack-v2">
            <div className="projects-stack-inner">
              {projects.map((project, i) => (
                <div
                  key={project.name}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`project-card-v2 ${i === activeIndex ? 'active' : ''}`}
                  data-card-index={i}
                  style={{
                    ...getCardStyle(i),
                    backgroundColor: project.color,
                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {/* Background image */}
                  {project.image && (
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image}`}
                      alt={`${project.name} preview`}
                      className="project-card-v2-bg"
                    />
                  )}
                  {/* Project visual content */}
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
                  onClick={() => setTargetIndex(i)}
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
