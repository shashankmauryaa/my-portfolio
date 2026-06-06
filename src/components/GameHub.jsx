import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function GameHub({ onNavigate }) {
  const [charX, setCharX] = useState(50);
  const [charY, setCharY] = useState(55);
  const [facing, setFacing] = useState('right');
  const [isWalking, setIsWalking] = useState(false);
  const [keysDown, setKeysDown] = useState(new Set());
  const folderRefs = useRef([]);
  const charRef = useRef(null);
  const navigatedRef = useRef(false);

  const folders = [
    { id: 'about', icon: `${import.meta.env.BASE_URL}folder-blue.png`, label: 'About Me' },
    { id: 'projects', icon: `${import.meta.env.BASE_URL}folder-red.png`, label: 'Projects' },
    { id: 'contact', icon: `${import.meta.env.BASE_URL}folder-yellow.png`, label: 'Contact Me' },
  ];

  const moveSpeed = 1.5;
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

  // Check folder proximity
  const checkProximity = useCallback(() => {
    if (navigatedRef.current || !charRef.current) return;
    const charRect = charRef.current.getBoundingClientRect();
    const charCenterX = charRect.left + charRect.width / 2;
    const charCenterY = charRect.top + charRect.height / 2;

    for (let i = 0; i < folderRefs.current.length; i++) {
      const el = folderRefs.current[i];
      if (!el) continue;
      const folderRect = el.getBoundingClientRect();
      const folderCenterX = folderRect.left + folderRect.width / 2;
      const folderCenterY = folderRect.top + folderRect.height / 2;
      const dist = Math.hypot(charCenterX - folderCenterX, charCenterY - folderCenterY);

      if (dist < 80) {
        navigatedRef.current = true;
        onNavigate(folders[i].id);
        return;
      }
    }
  }, [onNavigate, folders]);

  useEffect(() => {
    const walking = keysDown.size > 0;
    setIsWalking(walking);
    if (!walking) return;

    let frame;
    const step = () => {
      let movedH = false;
      setCharX((prev) => {
        let next = prev;
        if (keysDown.has('ArrowLeft') || keysDown.has('a') || keysDown.has('A')) {
          next -= moveSpeed;
          setFacing('left');
          movedH = true;
        }
        if (keysDown.has('ArrowRight') || keysDown.has('d') || keysDown.has('D')) {
          next += moveSpeed;
          setFacing('right');
          movedH = true;
        }
        return Math.max(3, Math.min(97, next));
      });

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

      checkProximity();
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [keysDown, checkProximity]);

  const handleFolderClick = useCallback((page) => {
    onNavigate(page);
  }, [onNavigate]);

  return (
    <div className="game-hub dot-grid-bg">
      <h1 className="hub-title">SHASHANK MAURYA</h1>
      <p className="hub-subtitle">Start by walking over desired game mode or click</p>

      <div className="hub-character-area">
        <img
          ref={charRef}
          src={`${import.meta.env.BASE_URL}character.png`}
          alt="Pixel art character of Shashank Maurya"
          className={`hub-character ${facing === 'left' ? 'flip' : ''} ${isWalking ? 'walking' : ''}`}
          style={{ left: `calc(${charX}% - 60px)`, top: `calc(${charY}% - 60px)` }}
          width="120"
        />
      </div>

      <div className="hub-folders">
        {folders.map((folder, i) => (
          <div
            key={folder.id}
            ref={(el) => { folderRefs.current[i] = el; }}
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
