import React from 'react';
import GameCard from './GameCard';

export default function About() {
  return (
    <section id="about" className="section" aria-label="About me">
      <div className="container">
        <h2 className="section-title reveal">
          ABOUT <span className="title-icon">👾</span> ME
          <span className="section-title-bar" />
        </h2>

        <div className="about-grid">
          <GameCard header="// BIO.TXT" className="reveal">
            <div className="about-bio">
              <p>
                Hey! I&apos;m <strong>Shashank</strong>, a passionate <strong>Software Engineer</strong> at{' '}
                <strong>Dell Technologies</strong> in Bengaluru. I love building scalable systems,
                automating things, and crafting clean, performant software.
              </p>
              <br />
              <p>
                With expertise in <strong>DevOps, Python, and full-stack development</strong>,
                I work at the intersection of engineering and innovation. I graduated with{' '}
                <strong>8.97 CGPA</strong> in Computer Science from SMIT and have been at Dell
                ever since — growing from intern to <strong>SDE-2</strong>.
              </p>
            </div>
          </GameCard>

          <div className="reveal">
            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-number">2+</span>
                <span className="stat-label">YRS AT DELL</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">8.97</span>
                <span className="stat-label">CGPA</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">5+</span>
                <span className="stat-label">TECH STACKS</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">3+</span>
                <span className="stat-label">PROJECTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
