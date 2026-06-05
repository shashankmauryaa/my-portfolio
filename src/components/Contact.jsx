import React from 'react';
import GameCard from './GameCard';

export default function Contact() {
  const links = [
    {
      href: 'mailto:shashankmaurya7539@gmail.com',
      icon: '✉',
      label: 'EMAIL ME',
      id: 'contact-email',
    },
    {
      href: 'https://github.com/shashankmauryaa',
      icon: '⌨',
      label: 'GITHUB',
      id: 'contact-github',
      external: true,
    },
    {
      href: 'https://www.linkedin.com/in/shashank-maurya7539/',
      icon: '💼',
      label: 'LINKEDIN',
      id: 'contact-linkedin',
      external: true,
    },
  ];

  return (
    <section id="contact" className="section" aria-label="Contact" style={{ textAlign: 'center' }}>
      <div className="container">
        <h2 className="section-title reveal">
          CONTACT <span className="title-icon">📡</span>
          <span className="section-title-bar" />
        </h2>

        <p className="contact-subtitle reveal">
          Got an interesting project, opportunity, or just want to say hi? My inbox is open!
        </p>

        <div className="contact-grid reveal">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              id={link.id}
              className="contact-card"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={link.label}
            >
              <GameCard header={link.label}>
                <div style={{ textAlign: 'center', padding: '12px 24px' }}>
                  <span className="contact-icon">{link.icon}</span>
                  <p style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '0.45rem',
                    color: 'var(--green)',
                    marginTop: '12px',
                    letterSpacing: '2px',
                  }}>
                    {link.label}
                  </p>
                </div>
              </GameCard>
            </a>
          ))}
        </div>

        <p className="contact-note reveal">
          Response time: <span>~24 hours</span> · Based in <span>Bengaluru 🇮🇳</span>
        </p>
      </div>
    </section>
  );
}
