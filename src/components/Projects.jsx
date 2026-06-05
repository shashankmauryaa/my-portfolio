import React from 'react';
import GameCard from './GameCard';

const PROJECT_DATA = [
  {
    num: 'PROJECT_01',
    name: 'LAZY AUCTIONS',
    desc: 'A smart long-duration online auction platform with 24-hour bidding windows and real-time participation for a scalable marketplace.',
    tech: ['React.js', 'Node.js', 'Real-time', 'Marketplace'],
    link: 'https://github.com/shashankmauryaa',
  },
  {
    num: 'PROJECT_02',
    name: 'STRATEGOS',
    desc: 'A comprehensive geopolitical simulation & intelligence analysis platform for real-time monitoring, visualization, and strategic forecasting.',
    tech: ['React.js', 'Tailwind CSS', 'Data Viz', 'Simulation'],
    link: 'https://github.com/shashankmauryaa',
  },
  {
    num: 'PROJECT_03',
    name: 'THIS PORTFOLIO ★',
    desc: 'A retro pixel-art styled portfolio with CRT effects, RPG skill bars, game-card UI, and canvas particle system. Built with React + Vite.',
    tech: ['React', 'Vite', 'CSS3', 'Canvas API'],
    link: 'https://github.com/shashankmauryaa',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="container">
        <h2 className="section-title reveal">
          PROJECTS <span className="title-icon">🚀</span>
          <span className="section-title-bar" />
        </h2>

        <div className="projects-grid">
          {PROJECT_DATA.map((proj) => (
            <GameCard key={proj.num} header={proj.num} className="project-card reveal">
              <h3 className="project-name">{proj.name}</h3>
              <p className="project-desc">{proj.desc}</p>
              <div className="project-tech">
                {proj.tech.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
              </div>
              <a
                href={proj.link}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶ VIEW PROJECT
              </a>
            </GameCard>
          ))}
        </div>
      </div>
    </section>
  );
}
