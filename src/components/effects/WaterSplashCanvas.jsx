import { useEffect, useRef } from "react";

function WaterSplashCanvas() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    let animationFrame;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createSplash = (event) => {
      const now = Date.now();

      if (now - lastSpawn.current < 90) return;

      lastSpawn.current = now;

      const rect = canvas.getBoundingClientRect();

      const margin = 80;

      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      // STOP particles near edges
      x = Math.max(margin, Math.min(rect.width - margin, x));
      y = Math.max(margin, Math.min(rect.height - margin, y));

      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.42 + 0.18;

        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 0.12,
          size: Math.random() * 6 + 2,
          life: 0.7,
          decay: Math.random() * 0.002 + 0.0009,
        });
      }
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.clearRect(0, 0, width, height);

      // HARD CLIP INSIDE BOX
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      ctx.clip();

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.012;
        p.life -= p.decay;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size
        );

        gradient.addColorStop(0, `rgba(255,255,255,${p.life * 0.9})`);
        gradient.addColorStop(0.35, `rgba(125,249,255,${p.life * 0.65})`);
        gradient.addColorStop(1, "rgba(34,211,238,0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 16;
        ctx.shadowColor = "rgba(34,211,238,0.6)";
        ctx.fill();
      });

      ctx.restore();

      // REMOVE particles outside box
      particles.current = particles.current.filter(
        (p) =>
          p.life > 0 &&
          p.x > 0 &&
          p.x < width &&
          p.y > 0 &&
          p.y < height
      );

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    parent.addEventListener("mousemove", createSplash);
    parent.addEventListener("click", createSplash);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);

      parent.removeEventListener("mousemove", createSplash);
      parent.removeEventListener("click", createSplash);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 h-full w-full overflow-hidden rounded-[3rem] pointer-events-none opacity-70 mix-blend-screen"
    />
  );
}

export default WaterSplashCanvas;