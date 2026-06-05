import React from 'react';
import NavigateButton from './NavigateButton';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="page-container page-enter dot-grid-bg">
      <NavigateButton onNavigate={onNavigate} currentPage="about" />
      <div className="about-page">
        <div className="about-content">
          <p className="about-intro">Hi, my name is Shashank Maurya.</p>
          <p className="about-tagline">I build things that scale.</p>
          <p className="about-body">
            I am a Software Engineer at Dell Technologies with expertise in
            DevOps, Python, and full-stack development. I work at the
            intersection of engineering and innovation — building scalable
            systems, automating workflows, and crafting clean, performant
            software.
          </p>
          <p className="about-body-secondary">
            I graduated with 8.97 CGPA in Computer Science from Sikkim Manipal
            Institute of Technology and have been at Dell ever since — growing
            from intern to SDE-2. When I&apos;m not getting any insipration, I
            must be brewing some coffee or tuning to nature.
          </p>
        </div>
      </div>
    </div>
  );
}
