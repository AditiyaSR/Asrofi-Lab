'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'node' | 'line';
}

interface ParticleBackgroundProps {
  isDark?: boolean;
}

export default function ParticleBackground({ isDark = true }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const createParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 20000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        type: Math.random() > 0.7 ? 'node' : 'line',
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const primaryColor = isDark ? '29, 112, 24' : '29, 112, 24';
    const accentColor = isDark ? '57, 255, 20' : '46, 139, 87';

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * (isDark ? 0.15 : 0.1);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((particle) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          particle.vx -= (dx / distance) * force * 0.02;
          particle.vy -= (dy / distance) * force * 0.02;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Antigravity effect
        particle.vy -= 0.001;

        // Damping
        particle.vx *= 0.999;
        particle.vy *= 0.999;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );

        if (particle.type === 'node') {
          gradient.addColorStop(0, `rgba(${accentColor}, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(${accentColor}, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(${primaryColor}, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(${primaryColor}, 0)`);
        }

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw hexagon for nodes
        if (particle.type === 'node') {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${accentColor}, ${particle.opacity * 0.5})`;
          ctx.lineWidth = 0.5;
          const size = particle.size * 1.5;
          for (let k = 0; k < 6; k++) {
            const angle = (k * Math.PI) / 3;
            const hx = particle.x + size * Math.cos(angle);
            const hy = particle.y + size * Math.sin(angle);
            if (k === 0) {
              ctx.moveTo(hx, hy);
            } else {
              ctx.lineTo(hx, hy);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticles, prefersReducedMotion, isDark]);

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-black dark:via-black dark:to-[#0a1f0a]" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        background: isDark 
          ? 'linear-gradient(to bottom right, #000000, #000000, #0a1f0a)' 
          : 'linear-gradient(to bottom right, #ffffff, #f5f5f5, #f0fff0)'
      }}
    />
  );
}
