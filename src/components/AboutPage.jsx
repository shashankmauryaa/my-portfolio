import React from 'react';
import NavigateButton from './NavigateButton';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="page-container page-enter dot-grid-bg">
      <NavigateButton onNavigate={onNavigate} currentPage="about" />
      <div className="about-page">
        <div className="about-content">
          <p className="about-intro">Hi, my name is Shashank Maurya.</p>
          <p className="about-tagline">I create things.</p>
          <p className="about-body">
            I am a Software Engineer with expertise in DevOps, Python, and full-stack development.
          </p>
          <p className="about-body-secondary">
            I work at the intersection of engineering and innovation — crafting clean, performant software, 
            automating workflows and building scalable systems.
            When I&apos;m not building softwares, I&apos;m probably looking for some 
            inspiration, brewing coffee or touching grass.
          </p>
        </div>
      </div>
    </div>
  );
}
