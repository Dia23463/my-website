import { useEffect, useRef } from "react";

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      r: number;
      speedX: number;
      speedY: number;
      phase: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push(createParticle());
      }
    };

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height * (0.55 + Math.random() * 0.13),
        r: 0.1 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: -0.1 - Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      };
    };

    resize();
    window.addEventListener("resize", resize);

    let animationFrameId: number;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        const heightFactor = p.y / canvas.height;
        
        if (heightFactor < 0.44) {
          particles[i] = createParticle();
        }

        let opacity = 1;
        if (heightFactor < 0.6 && heightFactor > 0.5) {
          opacity = (heightFactor - 0.5) * 10; 
        } else if (heightFactor <= 0.5) {
          opacity = 0;
        }

        if (opacity > 0) {
          const twinkle = Math.sin(time * 0.003 + p.phase) * 0.5 + 0.5;
          const currentOpacity = opacity * twinkle * 0.8;

          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.2);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none w-full h-full"
    />
  );
}
