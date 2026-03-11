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
    // Reduce density for better performance on large screens
    const particleCount = Math.min(50, Math.floor((width * height) / 25000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Slower, more organic movement
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        size: Math.random() * 4 + 1.5, // Slightly larger particles
        opacity: Math.random() * 0.6 + 0.2,
        type: Math.random() > 0.6 ? 'node' : 'line',
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
      
      // Draw connections (Organic Fibers)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased connection distance for more mesh-like structure
          if (distance < 180) {
            // Mouse distance to edge midpoint for spotlight effect
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDx = mouseRef.current.x - midX;
            const mouseDy = mouseRef.current.y - midY;
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            
            // Spotlight glow multiplier
            const spotlightMulti = Math.max(0.1, 1 - mouseDist / 400); // 1 near mouse, drops to 0.1
            
            const baseOpacity = (1 - distance / 180);
            const opacity = baseOpacity * (isDark ? 0.3 : 0.25) * (0.5 + spotlightMulti * 1.5);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`;
            ctx.lineWidth = (particles[i].type === 'node' && particles[j].type === 'node' ? 1.5 : 0.5) * (1 + spotlightMulti); // Thicker fibers between nodes and near mouse
            
            // Draw slightly curved lines for organic feel
            const cMidX = midX + Math.sin(Date.now() * 0.001 + i) * 10;
            const cMidY = midY + Math.cos(Date.now() * 0.001 + j) * 10;
            
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.quadraticCurveTo(cMidX, cMidY, particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((particle, idx) => {
        // Mouse interaction (Repulsion / Attraction & Spotlight)
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const spotlightMulti = Math.max(0.2, 1 - distance / 350);

        if (distance < 250) {
          // Gently push particles away but add a swirling motion
          const force = (250 - distance) / 250;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.03;
          particle.vy -= Math.sin(angle) * force * 0.03;
          
          // Add swirl
          particle.vx += Math.sin(angle) * force * 0.02;
          particle.vy -= Math.cos(angle) * force * 0.02;
        }

        // Cellular drift (Sine wave motion)
        particle.vx += Math.sin(Date.now() * 0.0005 + idx) * 0.01;
        particle.vy += Math.cos(Date.now() * 0.0006 + idx) * 0.01;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Gentle upward drift (like bubbles / cells rising)
        particle.vy -= 0.0005;

        // Damping (Friction)
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Wrap around edges smoothly
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Draw particle (Cell / Spore) - Optimized: Avoid createRadialGradient
        const glowOpacity = Math.min(1, particle.opacity * (0.5 + spotlightMulti * 2)); // Glow brighter near mouse
        const baseSize = particle.size * (1 + spotlightMulti * 0.5); // Slightly larger near mouse

        // Make the cells pulsate slightly
        const pulsate = Math.sin(Date.now() * 0.002 + idx) * 0.5 + 1;
        const currentSize = baseSize * (particle.type === 'node' ? pulsate : 1);

        // Simple flat fill for much better performance than gradients
        ctx.beginPath();
        ctx.fillStyle = `rgba(${particle.type === 'node' ? accentColor : primaryColor}, ${glowOpacity})`;
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw geometric / cellular nucleus for nodes
        if (particle.type === 'node') {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`;
          ctx.lineWidth = 1;
          const size = particle.size * 1.5 * pulsate;
          // Draw a more organic shape (hexagon with rounded feels)
          for (let k = 0; k < 6; k++) {
            const angle = (k * Math.PI) / 3 + (Date.now() * 0.0005 * (idx % 2 === 0 ? 1 : -1)); // Slowly rotate
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
          
          // Inner nucleus
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
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
