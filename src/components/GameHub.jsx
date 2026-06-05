import React, { useState, useEffect, useCallback } from 'react';

export default function GameHub({ onNavigate }) {
  const [charX, setCharX] = useState(50);
  const [charY, setCharY] = useState(50);
  const [facing, setFacing] = useState('right');
  const [keysDown, setKeysDown] = useState(new Set());

  const folders = [
    { id: 'about', icon: '/folder-blue.png', label: 'About Me', x: 20 },
    { id: 'projects', icon: '/folder-red.png', label: 'Projects', x: 50 },
    { id: 'contact', icon: '/folder-yellow.png', label: 'Contact Me', x: 80 },
  ];

  const moveSpeed = 1.2;
  const movementKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'a', 'd', 'w', 's', 'A', 'D', 'W', 'S'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (movementKeys.includes(e.key)) {
        e.preventDefault();
        setKeysDown((prev) => new Set(prev).add(e.key));
      }
    };

    const handleKeyUp = (e) => {
      setKeysDown((prev) => {
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (keysDown.size === 0) return;

    let frame;
    const step = () => {
      // Horizontal movement
      setCharX((prev) => {
        let next = prev;
        if (keysDown.has('ArrowLeft') || keysDown.has('a') || keysDown.has('A')) {
          next -= moveSpeed;
          setFacing('left');
        }
        if (keysDown.has('ArrowRight') || keysDown.has('d') || keysDown.has('D')) {
          next += moveSpeed;
          setFacing('right');
        }
        return Math.max(0, Math.min(100, next));
      });

      // Vertical movement
      setCharY((prev) => {
        let next = prev;
        if (keysDown.has('ArrowUp') || keysDown.has('w') || keysDown.has('W')) {
          next -= moveSpeed;
        }
        if (keysDown.has('ArrowDown') || keysDown.has('s') || keysDown.has('S')) {
          next += moveSpeed;
        }
        return Math.max(0, Math.min(100, next));
      });

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [keysDown]);

  const handleFolderClick = useCallback((page) => {
    onNavigate(page);
  }, [onNavigate]);

  return (
    <div className="game-hub dot-grid-bg">
      <h1 className="hub-title">SHASHANK MAURYA</h1>
      <p className="hub-subtitle">Start by walking over desired game mode or click</p>

      <div className="hub-character-area">
        <img
          src="/character.png"
          alt="Pixel art character of Shashank Maurya"
          className={`hub-character ${facing === 'left' ? 'flip' : ''}`}
          style={{ left: `calc(${charX}% - 60px)`, top: `calc(${charY}% - 60px)` }}
          width="120"
        />
      </div>

      <div className="hub-folders">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="folder-item"
            onClick={() => handleFolderClick(folder.id)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${folder.label}`}
            onKeyDown={(e) => { if (e.key === 'Enter') handleFolderClick(folder.id); }}
          >
            <img
              src={folder.icon}
              alt={`${folder.label} folder`}
              className="folder-icon"
            />
            <span className="folder-label">{folder.label}</span>
          </div>
        ))}
      </div>

      <div className="hub-footer">
        <p className="hub-footer-text">WASD OR ARROW KEYS TO MOVE</p>
      </div>
    </div>
  );
}
