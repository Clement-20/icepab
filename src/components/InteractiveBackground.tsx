import React, { useEffect, useRef, useState } from 'react';

interface InteractiveBackgroundProps {
  isXrActive?: boolean;
}

export default function InteractiveBackground({ isXrActive = false }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let angleOffset = 0;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = isXrActive ? `rgba(128, 255, 0, ${this.opacity})` : `rgba(0, 229, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();

        // Connect particles near mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.strokeStyle = isXrActive 
            ? `rgba(128, 255, 0, ${(1 - distance / 150) * 0.2})` 
            : `rgba(0, 229, 255, ${(1 - distance / 150) * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      // AR/VR Spatial HUD Layout rendering if Holographic XR mode is on
      if (isXrActive) {
        angleOffset += 0.015;
        
        // Circular crosshair reticle
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(128, 255, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, angleOffset, angleOffset + Math.PI / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, angleOffset + Math.PI, angleOffset + Math.PI * 1.5);
        ctx.stroke();

        ctx.setLineDash([]);

        // Horizontal and vertical targeting lines reaching out
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(canvas.width, mouse.y);
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, canvas.height);
        ctx.stroke();

        // Target Box Corner markers
        const boxSize = 25;
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
        ctx.lineWidth = 1.5;

        // Top Left Corner
        ctx.beginPath();
        ctx.moveTo(mouse.x - boxSize, mouse.y - boxSize + 6);
        ctx.lineTo(mouse.x - boxSize, mouse.y - boxSize);
        ctx.lineTo(mouse.x - boxSize + 6, mouse.y - boxSize);
        ctx.stroke();

        // Top Right Corner
        ctx.beginPath();
        ctx.moveTo(mouse.x + boxSize, mouse.y - boxSize + 6);
        ctx.lineTo(mouse.x + boxSize, mouse.y - boxSize);
        ctx.lineTo(mouse.x + boxSize - 6, mouse.y - boxSize);
        ctx.stroke();

        // Bottom Left Corner
        ctx.beginPath();
        ctx.moveTo(mouse.x - boxSize, mouse.y + boxSize - 6);
        ctx.lineTo(mouse.x - boxSize, mouse.y + boxSize);
        ctx.lineTo(mouse.x - boxSize + 6, mouse.y + boxSize);
        ctx.stroke();

        // Bottom Right Corner
        ctx.beginPath();
        ctx.moveTo(mouse.x + boxSize, mouse.y + boxSize - 6);
        ctx.lineTo(mouse.x + boxSize, mouse.y + boxSize);
        ctx.lineTo(mouse.x + boxSize - 6, mouse.y + boxSize);
        ctx.stroke();

        // Draw live coordinates text
        ctx.fillStyle = 'rgba(0, 229, 255, 0.8)';
        ctx.font = '9px monospace';
        ctx.fillText(`LOCK: [X:${mouse.x} Y:${mouse.y} Z:${((mouse.x + mouse.y) % 200).toFixed(0)}mm]`, mouse.x + 35, mouse.y - 12);
        ctx.fillStyle = 'rgba(128, 255, 0, 0.8)';
        ctx.fillText(`FOVEATED LOCK: N1-SYS`, mouse.x + 35, mouse.y + 18);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouse, isXrActive]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      <div 
        className={`absolute rounded-full opacity-20 blur-[120px] transition-all`}
        style={{
          width: isXrActive ? '900px' : '800px',
          height: isXrActive ? '900px' : '800px',
          background: isXrActive 
            ? 'radial-gradient(circle, rgba(128, 255, 0, 0.45) 0%, transparent 70%)' 
            : 'radial-gradient(circle, var(--color-electric-blue) 0%, transparent 70%)',
          left: mouse.x - (isXrActive ? 450 : 400),
          top: mouse.y - (isXrActive ? 450 : 400),
          transition: 'transform 0.1s ease-out',
          mixBlendMode: 'screen'
        }}
      />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-45"
      />

      {/* Static Scanline Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(0,229,255,0.035),rgba(128,255,0,0.015),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none ${isXrActive ? 'opacity-100' : 'opacity-60'}`} />
    </div>
  );
}
