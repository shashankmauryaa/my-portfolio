import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PixelParticles from './components/PixelParticles';

export default function App() {
  // Scroll reveal + skill bar animations
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
        bar.style.width = (bar.getAttribute('data-width') || '0') + '%';
      });
      return;
    }

    // Reveal observer
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

    // Skill bar observer
    const barObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            setTimeout(() => {
              bar.style.width = (bar.getAttribute('data-width') || '0') + '%';
            }, 200);
            barObs.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.skill-bar-fill').forEach((bar) => barObs.observe(bar));

    return () => {
      revealObs.disconnect();
      barObs.disconnect();
    };
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;

    const onKey = (e) => {
      if (e.key === code[pos]) {
        pos++;
        if (pos === code.length) {
          pos = 0;
          // Safe DOM: create overlay via createElement
          const overlay = document.createElement('div');
          overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.96);z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:24px;cursor:pointer;';

          const title = document.createElement('p');
          title.style.cssText = 'font-family:"Press Start 2P",monospace;font-size:1rem;color:#00ff41;text-shadow:0 0 20px #00ff41;text-align:center;line-height:2;';
          title.textContent = '🎮 KONAMI CODE ACTIVATED!';

          const msg = document.createElement('p');
          msg.style.cssText = 'font-family:"VT323",monospace;font-size:1.8rem;color:#00f5ff;text-align:center;';
          msg.textContent = '+30 LIVES ADDED TO YOUR CAREER ★★★';

          const hint = document.createElement('p');
          hint.style.cssText = 'font-family:"Share Tech Mono",monospace;font-size:0.8rem;color:#5a7a6a;';
          hint.textContent = '[ click anywhere to continue ]';

          overlay.appendChild(title);
          overlay.appendChild(msg);
          overlay.appendChild(hint);
          document.body.appendChild(overlay);

          overlay.addEventListener('click', () => document.body.removeChild(overlay), { once: true });
        }
      } else {
        pos = 0;
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <PixelParticles />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
