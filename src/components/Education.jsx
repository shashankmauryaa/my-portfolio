import React from 'react';
import GameCard from './GameCard';

export default function Education() {
  return (
    <section id="education" className="section" aria-label="Education">
      <div className="container">
        <h2 className="section-title reveal">
          EDUCATION <span className="title-icon">🎓</span>
          <span className="section-title-bar" />
        </h2>

        <GameCard header="EDUCATION_LOG" className="edu-card reveal">
          <p className="edu-degree">BACHELOR OF TECHNOLOGY — COMPUTER SCIENCE</p>
          <p className="edu-school">Sikkim Manipal Institute of Technology</p>
          <div className="edu-meta">
            <span>📅 2020 — 2024</span>
            <span>📍 Sikkim, India</span>
          </div>
          <div className="edu-grade">
            <span>⭐</span>
            <span>CGPA: 8.97 / 10</span>
          </div>
          <p className="edu-activities">
            Activities &amp; Societies: <span>GDSC SMIT</span>, <span>Innovision</span>
          </p>
        </GameCard>
      </div>
    </section>
  );
}
