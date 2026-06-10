import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Character3D from './Character3D';

const TITLE_TEXT = 'SHASHANK MAURYA';
const REPEL_RADIUS = 120;
const REPEL_FORCE = 12;
const SPRING = 0.08;
const DAMPING = 0.85;

export default function GameHub({ onNavigate }) {
  const [charX, setCharX] = useState(window.innerWidth / 2);
  const [charY, setCharY] = useState(160);
  const [facing, setFacing] = useState('right');
  const [isWalking, setIsWalking] = useState(false);
  const [keysDown, setKeysDown] = useState(new Set());
  const folderRefs = useRef([]);
  const charRef = useRef(null);
  const navigatedRef = useRef(false);
  const letterRefs = useRef([]);
  const letterPhysics = useRef(
    TITLE_TEXT.split('').map(() => ({ vx: 0, vy: 0, dx: 0, dy: 0 }))
  );

  const folders = [
    { id: 'about', icon: `${import.meta.env.BASE_URL}folder-blue.png`, label: 'About Me' },
    { id: 'projects', icon: `${import.meta.env.BASE_URL}folder-red.png`, label: 'Projects' },
    { id: 'contact', icon: `${import.meta.env.BASE_URL}folder-yellow.png`, label: 'Contact Me' },
  ];

  const moveSpeed = 5;
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

      if (dist < 100) {
        navigatedRef.current = true;
        onNavigate(folders[i].id);
        return;
      }
    }
  }, [onNavigate, folders]);

  // Repel letters from character
  const updateLetterPhysics = useCallback((cx, cy) => {
    const physics = letterPhysics.current;
    for (let i = 0; i < physics.length; i++) {
      const el = letterRefs.current[i];
      if (!el || TITLE_TEXT[i] === ' ') continue;
      const rect = el.getBoundingClientRect();
      const lx = rect.left + rect.width / 2;
      const ly = rect.top + rect.height / 2;
      const ddx = lx - cx;
      const ddy = ly - cy;
      const dist = Math.hypot(ddx, ddy);

      if (dist < REPEL_RADIUS && dist > 0) {
        const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
        const angle = Math.atan2(ddy, ddx);
        physics[i].vx += Math.cos(angle) * force;
        physics[i].vy += Math.sin(angle) * force;
      }

      physics[i].vx -= physics[i].dx * SPRING;
      physics[i].vy -= physics[i].dy * SPRING;
      physics[i].vx *= DAMPING;
      physics[i].vy *= DAMPING;
      physics[i].dx += physics[i].vx;
      physics[i].dy += physics[i].vy;

      el.style.transform = `translate(${physics[i].dx}px, ${physics[i].dy}px)`;
    }
  }, []);

  useEffect(() => {
    const walking = keysDown.size > 0;
    setIsWalking(walking);
    if (!walking) return;

    let frame;
    const step = () => {
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
        return Math.max(60, Math.min(window.innerWidth - 60, next));
      });

      setCharY((prev) => {
        let next = prev;
        if (keysDown.has('ArrowUp') || keysDown.has('w') || keysDown.has('W')) {
          next -= moveSpeed;
        }
        if (keysDown.has('ArrowDown') || keysDown.has('s') || keysDown.has('S')) {
          next += moveSpeed;
        }
        return Math.max(60, Math.min(window.innerHeight - 60, next));
      });

      checkProximity();
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [keysDown, checkProximity]);

  // Continuous letter physics loop
  useEffect(() => {
    let frame;
    const animate = () => {
      if (charRef.current) {
        const rect = charRef.current.getBoundingClientRect();
        updateLetterPhysics(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [updateLetterPhysics]);

  const handleFolderClick = useCallback((page) => {
    onNavigate(page);
  }, [onNavigate]);

  return (
    <div className="game-hub dot-grid-bg">
      {/* 1. TOP — Instruction subtitle */}
      <p className="hub-subtitle">Start by walking over desired game mode or click</p>

      {/* 2. CHARACTER — 3D canvas overlay, moves with WASD */}
      <div className="hub-character-area" ref={charRef} style={{ left: `${charX - 75}px`, top: `${charY - 85}px` }}>
        <Canvas
          camera={{ position: [0, 0.3, 2.2], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 4]} intensity={1} />
          <directionalLight position={[-2, 3, -1]} intensity={0.3} />
          <Suspense fallback={null}>
            <Character3D isWalking={isWalking} facing={facing} scale={0.8} />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. MIDDLE — Name with letter repulsion */}
      <h1 className="hub-title" aria-label={TITLE_TEXT}>
        {TITLE_TEXT.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => { letterRefs.current[i] = el; }}
            className="hub-letter"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* 4. NEAR BOTTOM — Folders (increased size) */}
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

      {/* 5. BOTTOM — Key instructions */}
      <div className="hub-footer">
        <p className="hub-footer-text">WASD OR ARROW KEYS TO MOVE</p>
      </div>
    </div>
  );
}
