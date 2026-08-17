import { useEffect, useRef } from 'react';

export default function RainEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = globalThis.innerWidth;
      canvas.height = globalThis.innerHeight;
    };
    resize();
    globalThis.addEventListener('resize', resize);

    // Crea le gocce
    const drops = Array.from({ length: 200 }, () => ({
      x: Math.random() * globalThis.innerWidth,
      y: Math.random() * globalThis.innerHeight,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 8 + 6,
      opacity: Math.random() * 0.4 + 0.1,
      width: Math.random() * 1.2 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach(drop => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 210, 255, ${drop.opacity})`;
        ctx.lineWidth = drop.width;
        ctx.lineCap = 'round';
        // Leggera inclinazione per effetto vento
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.length * 0.15, drop.y + drop.length);
        ctx.stroke();

        // Muovi la goccia verso il basso
        drop.y += drop.speed;
        drop.x += drop.speed * 0.08; // leggero drift laterale

        // Reset quando esce dallo schermo
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      globalThis.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
    />
  );
}
