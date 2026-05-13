import { useEffect, useRef } from "react";

function WaterCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;
    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.002;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();

        const y = canvas.height * 0.25 + i * 95;

        for (let x = 0; x <= canvas.width; x += 12) {
          const distanceFromMouse = Math.abs(x - mouse.x);
          const mouseWave = Math.max(0, 90 - distanceFromMouse) * 0.06;

          const wave =
            Math.sin(x * 0.012 + time + i) * 14 +
            Math.sin(x * 0.02 + time * 0.7) * 8 +
            mouseWave;

          const finalY = y + wave;

          if (x === 0) {
            ctx.moveTo(x, finalY);
          } else {
            ctx.lineTo(x, finalY);
          }
        }

        ctx.strokeStyle = `rgba(34, 211, 238, ${0.10 - i * 0.012})`;
        ctx.lineWidth = 1.4;
        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(34, 211, 238, 0.45)";
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2] h-screen w-screen opacity-100 mix-blend-screen"
    />
  );
}

export default WaterCanvas;