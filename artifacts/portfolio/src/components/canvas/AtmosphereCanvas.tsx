import { useEffect, useRef } from "react";

export function AtmosphereCanvas() {
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
      baseOpacity: number;
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
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * (Math.random() < 0.55 ? 0.6 : 1),
          r: 0.4 + Math.random() * 1.4,
          baseOpacity: 0.18 + Math.random() * 0.45,
          speedX: (Math.random() - 0.5) * 0.14,
          speedY: -0.04 - Math.random() * 0.18,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let animationFrameId: number;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
        const currentOpacity = p.baseOpacity * twinkle;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.4);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
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
