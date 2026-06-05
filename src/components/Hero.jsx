import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';

export default function Hero() {
  const phrases = [
    'Building scalable systems...',
    'Automating the boring stuff.',
    'DevOps by day, builder by night.',
    'git commit -m "ship it" 🚀',
    'Currently brewing ideas & coffee.',
    'Bengaluru → the world.',
  ];

  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;

    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        }, 65);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1500);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setText(current.slice(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        }, 35);
      } else {
        setDeleting(false);
        setPhraseIdx((phraseIdx + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-greeting">// HELLO, WORLD!</p>
          <h1 className="hero-name">SHASHANK MAURYA</h1>
          <p className="hero-title">◈ SOFTWARE ENGINEER @ DELL TECHNOLOGIES ◈</p>

          <p className="hero-tagline" aria-live="polite">
            {text}
            <span className="typing-cursor" aria-hidden="true" />
          </p>

          <div className="hero-status" role="status">
            <span className="status-dot" aria-hidden="true" />
            <span>BENGALURU, INDIA · OPEN TO OPPORTUNITIES</span>
          </div>

          <div className="hero-btns">
            <a href="#projects" className="pixel-btn">▶ VIEW WORK</a>
            <a href="#contact" className="pixel-btn alt">✉ CONTACT</a>
          </div>
        </div>

        <div className="hero-character-wrap">
          <div className="hero-character-frame">
            <GameCard>
              <div className="char-img-wrap" style={{ padding: 0 }}>
                <div style={{
                  background: 'linear-gradient(180deg, #1a4a2a, #0a2a14)',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  padding: '20px 20px 0',
                  minHeight: '340px',
                }}>
                  <img
                    src="/character.png"
                    alt="Pixel art character of Shashank Maurya"
                    style={{ width: '260px', imageRendering: 'pixelated' }}
                    width="260"
                  />
                </div>
              </div>
              <div className="char-label">
                PLAYER_ONE
              </div>
            </GameCard>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>SCROLL</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
