import React from 'react';
import GameCard from './GameCard';

const EXP_DATA = [
  {
    company: 'DELL TECHNOLOGIES',
    role: 'Software Engineer - 2',
    dates: 'MAR 2026 — PRESENT',
    location: 'BENGALURU, ON-SITE',
    desc: 'Leading engineering initiatives, working on scalable systems and software solutions. Growing responsibility in architecture, code quality, and delivery.',
    tags: ['DevOps', 'Python', 'Systems Engineering'],
    intern: false,
  },
  {
    company: 'DELL TECHNOLOGIES',
    role: 'Software Engineer 1',
    dates: 'AUG 2024 — MAR 2026',
    duration: '1 YR 8 MOS',
    desc: 'Contributed to full-stack development and DevOps pipelines. Built and maintained robust backend services and automation frameworks.',
    tags: ['DevOps', 'Python', 'Automation'],
    intern: false,
  },
  {
    company: 'DELL TECHNOLOGIES',
    role: 'SDE Intern',
    dates: 'JAN 2024 — MAY 2024',
    duration: '5 MOS',
    desc: 'Built test automation frameworks and quality assurance pipelines using Selenium. Contributed to internal tooling and reliability.',
    tags: ['Selenium', 'Automation', 'QA'],
    intern: true,
  },
  {
    company: 'DELL TECHNOLOGIES',
    role: 'SDE Intern',
    dates: 'MAY 2023 — JUL 2023',
    duration: '3 MOS',
    desc: 'First stint at Dell — explored enterprise software development, internal tools, and got introduced to the engineering culture.',
    tags: ['Software Development', 'Engineering'],
    intern: true,
  },
  {
    company: 'GDSC SMIT',
    role: 'Application Development Lead',
    dates: 'AUG 2022 — AUG 2023',
    location: 'SIKKIM',
    desc: 'Led mobile & web app development at Google Developer Student Club SMIT. Organized workshops, mentored juniors, built projects.',
    tags: ['Firebase', 'Flutter', 'Leadership', 'Community'],
    intern: false,
  },
  {
    company: 'INNOVISION',
    role: 'Technical Secretary',
    dates: 'AUG 2022 — AUG 2023',
    location: 'EAST SIKKIM',
    desc: 'Managed technical events, coordinated with departments, and drove tech-focused activities across the organization.',
    tags: ['Technical Management', 'Events'],
    intern: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section" aria-label="Work experience">
      <div className="container">
        <h2 className="section-title reveal">
          EXPERIENCE <span className="title-icon">🏆</span> LOG
          <span className="section-title-bar" />
        </h2>

        <div className="timeline" role="list">
          {EXP_DATA.map((exp, i) => (
            <div className="timeline-item reveal" key={i} role="listitem">
              <div className="timeline-dot" aria-hidden="true" />
              <GameCard className="exp-card">
                <p className="exp-company">
                  {exp.company}
                  {exp.intern && <span className="badge-intern">INTERN</span>}
                </p>
                <p className="exp-role">{exp.role}</p>
                <div className="exp-badges">
                  <span className="exp-badge">{exp.dates}</span>
                  {exp.duration && <span className="exp-badge">{exp.duration}</span>}
                  {exp.location && <span className="exp-badge">{exp.location}</span>}
                </div>
                <p>{exp.desc}</p>
                <div className="tags" style={{ marginTop: '12px' }}>
                  {exp.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </GameCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
