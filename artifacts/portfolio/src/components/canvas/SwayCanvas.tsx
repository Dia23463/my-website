import { useEffect, useRef } from "react";

type Node = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

type Pulse = {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
};

export function SwayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];

    const seedNodes = () => {
      const targetCount = Math.max(60, Math.min(120, Math.floor((width * height) / 14000)));
      nodes = [];
      for (let i = 0; i < targetCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          baseX: x,
          baseY: y,
          x,
          y,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.14,
          size: 0.6 + Math.random() * 1.5,
        });
      }
    };

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };
    setSize();
    window.addEventListener("resize", setSize);

    let mx = width / 2;
    let my = height / 2;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      let bestIdx = -1;
      let bestD2 = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (j === fromIdx) continue;
        const dx = nodes[j].x - nodes[fromIdx].x;
        const dy = nodes[j].y - nodes[fromIdx].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000 && d2 < bestD2 && Math.random() < 0.6) {
          bestD2 = d2;
          bestIdx = j;
        }
      }
      if (bestIdx === -1) return;
      pulses.push({
        fromIdx,
        toIdx: bestIdx,
        progress: 0,
        speed: 0.006 + Math.random() * 0.012,
      });
    };

    const CONNECT_DIST = 140;
    let raf = 0;
    let last = performance.now();
    let pulseTimer = 0;

    const render = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      // Base black wash
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Soft warm aurora to keep continuity with the rest of the page
      const aurora = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        0,
        width * 0.5,
        height * 0.42,
        Math.max(width, height) * 0.75
      );
      aurora.addColorStop(0, "rgba(120, 90, 60, 0.16)");
      aurora.addColorStop(0.45, "rgba(60, 50, 90, 0.08)");
      aurora.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, width, height);

      // Drift + parallax
      const parX = (mx / width - 0.5) * 16;
      const parY = (my / height - 0.5) * 16;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.baseX += n.vx * (dt / 16);
        n.baseY += n.vy * (dt / 16);
        if (n.baseX < -20) n.baseX = width + 20;
        if (n.baseX > width + 20) n.baseX = -20;
        if (n.baseY < -20) n.baseY = height + 20;
        if (n.baseY > height + 20) n.baseY = -20;
        n.x = n.baseX + parX;
        n.y = n.baseY + parY;
      }

      // Connection lines (graph edges)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / CONNECT_DIST) * 0.18;
            ctx.strokeStyle = `rgba(232, 223, 208, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes with soft glow
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const r = n.size;
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 9);
        glow.addColorStop(0, "rgba(255, 226, 180, 0.55)");
        glow.addColorStop(0.4, "rgba(255, 200, 150, 0.10)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 240, 220, 0.95)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // Data pulses travelling along edges
      pulseTimer += dt;
      if (pulseTimer > 240 && pulses.length < 16) {
        spawnPulse();
        pulseTimer = 0;
      }

      ctx.globalCompositeOperation = "lighter";
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed * (dt / 16);
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        if (!a || !b) {
          pulses.splice(i, 1);
          continue;
        }
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;

        // Bright travelling pulse with comet trail
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 16);
        pg.addColorStop(0, "rgba(255, 245, 215, 0.95)");
        pg.addColorStop(0.4, "rgba(255, 205, 140, 0.35)");
        pg.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full hero-glow"
      style={{ zIndex: 0 }}
    />
  );
}
