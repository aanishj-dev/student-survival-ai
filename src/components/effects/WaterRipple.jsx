import { useEffect, useRef } from "react";

function WaterRipple() {
  const canvasRef = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    let animationFrame;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const addRipple = (event) => {
      const rect = canvas.getBoundingClientRect();

      ripples.current.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        radius: 0,
        opacity: 0.45,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((ripple) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);

        ctx.strokeStyle = `rgba(125, 249, 255, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(34, 211, 238, 0.8)";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ripple.radius += 1.8;
        ripple.opacity -= 0.008;
      });

      ripples.current = ripples.current.filter((ripple) => ripple.opacity > 0);

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    parent.addEventListener("mousemove", addRipple);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      parent.removeEventListener("mousemove", addRipple);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full opacity-80"
    />
  );
}

export default WaterRipple;