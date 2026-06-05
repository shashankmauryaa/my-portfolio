import React, { useRef, useEffect } from 'react';

/**
 * Floating pixel particle background on a canvas.
 * Renders colored squares and circles with connecting lines.
 */
export default function PixelParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W, H, particles, animId;
    const colors = ['#00ff41', '#00f5ff', '#ff00ff', '#ffe600', '#4d9fff'];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function create() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 2 + 1,
        sx: (Math.random() - 0.5) * 0.4,
        sy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.1,
        isSquare: Math.random() > 0.4,
      };
    }

    function init() {
      const count = Math.min(Math.floor((W * H) / 20000), 70);
      particles = Array.from({ length: count }, create);
    }

    function draw(p) {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      const s = Math.round(p.size);
      if (p.isSquare) {
        ctx.fillRect(Math.round(p.x), Math.round(p.y), s * 2, s * 2);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function connections() {
      const max = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < max) {
            ctx.globalAlpha = (1 - dist / max) * 0.12;
            ctx.strokeStyle = '#00ff41';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.sx;
        p.y += p.sy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
        draw(p);
      });

      if (W > 768) connections();
      ctx.globalAlpha = 1;
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else animate();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); init(); }, 200);
    };
    window.addEventListener('resize', onResize, { passive: true });

    resize();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />;
}
