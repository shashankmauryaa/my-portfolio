import React from 'react';
import GameCard from './GameCard';

const SKILL_DATA = [
  {
    category: 'BACKEND & DEVOPS',
    skills: [
      { name: 'Python', level: 9, pct: 88, pips: '████████░░' },
      { name: 'DevOps', level: 8, pct: 80, pips: '████████░░' },
      { name: 'Automation / Selenium', level: 8, pct: 82, pips: '████████░░' },
      { name: 'Node.js', level: 7, pct: 72, pips: '███████░░░' },
    ],
  },
  {
    category: 'FRONTEND',
    skills: [
      { name: 'React.js', level: 8, pct: 82, pips: '████████░░' },
      { name: 'Tailwind CSS', level: 8, pct: 80, pips: '████████░░' },
      { name: 'JavaScript', level: 8, pct: 83, pips: '████████░░' },
      { name: 'Flutter / Firebase', level: 7, pct: 70, pips: '███████░░░' },
    ],
  },
  {
    category: 'TOOLS & PLATFORMS',
    skills: [
      { name: 'Git & GitHub', level: 9, pct: 90, pips: '█████████░' },
      { name: 'Linux / Shell', level: 8, pct: 78, pips: '███████░░░' },
      { name: 'Docker', level: 7, pct: 70, pips: '███████░░░' },
      { name: 'Firebase / Supabase', level: 7, pct: 68, pips: '██████░░░░' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section" aria-label="Technical skills">
      <div className="container">
        <h2 className="section-title reveal">
          SKILL <span className="title-icon">⚔️</span> TREE
          <span className="section-title-bar" />
        </h2>

        <div className="skills-grid">
          {SKILL_DATA.map((cat) => (
            <GameCard key={cat.category} header={cat.category} className="reveal">
              <h3 className="skill-cat-title">{cat.category}</h3>
              {cat.skills.map((s) => (
                <div className="skill-item" key={s.name}>
                  <div className="skill-header">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-level">LVL {s.level}</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      data-width={s.pct}
                      role="progressbar"
                      aria-valuenow={s.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="skill-pips" aria-hidden="true">{s.pips}</div>
                </div>
              ))}
            </GameCard>
          ))}
        </div>
      </div>
    </section>
  );
}
