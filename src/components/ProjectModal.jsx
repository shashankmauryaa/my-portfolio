import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="project-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.name}`}
    >
      <div className="project-modal">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ✕
        </button>
        <div className="modal-content">
          <h2 className="modal-project-title">{project.name}</h2>
          <p className="modal-project-desc">{project.desc}</p>
          <div className="modal-tech-list">
            {project.tech.map((t) => (
              <span className="modal-tech-pill" key={t}>{t}</span>
            ))}
          </div>
          <a
            href={project.link}
            className="modal-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ VIEW ON GITHUB
          </a>
        </div>
      </div>
    </div>
  );
}
