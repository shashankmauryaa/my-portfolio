import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Character3D from './Character3D';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onComplete(), 600);
        }, 400);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <p className="loading-title">LOADING</p>
      <div className="loading-bar-outer">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="loading-percent">{progress}%</p>
      <div className="loading-canvas">
        <Canvas
          camera={{ position: [0, 0.2, 2.5], fov: 36 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 5, 4]} intensity={1} />
          <directionalLight position={[-2, 3, -1]} intensity={0.3} />
          <Suspense fallback={null}>
            <Character3D spinning scale={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
