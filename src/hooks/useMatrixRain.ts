import { useEffect, useRef } from 'react';

interface MatrixRainOptions {
  color?: string;
  fontSize?: number;
  speed?: number;
}

export const useMatrixRain = (canvasRef: React.RefObject<HTMLCanvasElement | null>, options: MatrixRainOptions = {}) => {
  const { color = '#0ea5e9', fontSize = 14, speed = 1 } = options;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const chars = '0123456789ABCDEF';

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color; // Text color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        // x = i * fontSize, y = value of drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it has crossed screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
      }
    };

    let animationId: number;
    const animate = () => {
      // Throttle speed
      setTimeout(() => {
        animationId = requestAnimationFrame(animate);
        draw();
      }, 1000 / (20 * speed)); // Adjust FPS based on speed
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, color, fontSize, speed]);
};
