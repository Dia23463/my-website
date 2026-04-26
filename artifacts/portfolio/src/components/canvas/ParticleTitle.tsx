import { useEffect, useRef } from "react";

export function ParticleTitle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let mouse = { x: -1000, y: -1000 };

    const init = async () => {
      await document.fonts.load('italic 80px "Instrument Serif"');
      
      const width = canvas.offsetWidth;
      const height = 230;
      canvas.width = width;
      canvas.height = height;

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext('2d');
      if (!octx) return;

      const fontSize = Math.min(width * 0.086, 90);
      octx.font = `italic ${fontSize}px "Instrument Serif"`;
      octx.fillStyle = 'white';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';

      octx.fillText("I Build. I Write.", width / 2, height / 2 - fontSize * 0.6);
      octx.fillText("I Figure Things Out.", width / 2, height / 2 + fontSize * 0.6);

      const imageData = octx.getImageData(0, 0, width, height);
      const data = imageData.data;

      particles = [];
      for (let y = 0; y < height; y += 3) {
        for (let x = 0; x < width; x += 3) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 100) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.5 + 0.5
            });
          }
        }
      }

      render();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 80;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * 5;
        let directionY = forceDirectionY * force * 5;

        if (distance < maxDistance) {
          p.x -= directionX;
          p.y -= directionY;
        } else {
          if (p.x !== p.baseX) {
            p.x -= (p.x - p.baseX) * 0.1;
          }
          if (p.y !== p.baseY) {
            p.y -= (p.y - p.baseY) * 0.1;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    init();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    const handleResize = () => {
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[230px] cursor-none bg-transparent"
    />
  );
}
