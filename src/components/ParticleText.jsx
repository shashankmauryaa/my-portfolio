import React, { useRef, useEffect } from 'react';

export default function ParticleText({ text, width = 780, height = 540 }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Draw text offscreen to sample pixel positions
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext('2d');

    const lines = text.split('\n');
    const fontSize = Math.min(width / 6, 90);
    offCtx.fillStyle = '#000';
    offCtx.font = `900 ${fontSize}px Inter, sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';

    const lineHeight = fontSize * 1.1;
    const totalHeight = lines.length * lineHeight;
    const startY = (height - totalHeight) / 2 + lineHeight / 2;

    lines.forEach((line, i) => {
      offCtx.fillText(line, width / 2, startY + i * lineHeight);
    });

    // Sample pixels
    const imageData = offCtx.getImageData(0, 0, width, height);
    const particles = [];
    const gap = 4;

    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const idx = (y * width + x) * 4;
        const alpha = imageData.data[idx + 3];
        if (alpha > 128) {
          particles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.5 + 1,
            color: `rgba(0, 0, 0, ${0.6 + Math.random() * 0.4})`,
          });
        }
      }
    }

    particlesRef.current = particles;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const radius = 100;
      const force = 8;

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const angle = Math.atan2(dy, dx);
          const pullForce = (radius - dist) / radius * force;
          p.vx += Math.cos(angle) * pullForce;
          p.vy += Math.sin(angle) * pullForce;
        }

        // Spring back to origin
        p.vx += (p.originX - p.x) * 0.08;
        p.vy += (p.originY - p.y) * 0.08;

        // Damping
        p.vx *= 0.85;
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [text, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ width: width + 'px', height: height + 'px' }}
    />
  );
}
