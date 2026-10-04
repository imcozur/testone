import { useRef, useEffect, useCallback, useState } from 'react';
import { planets, Planet } from '../data/planets';

interface SolarSystemCanvasProps {
  isPlaying: boolean;
  speed: number;
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet | null) => void;
}

export default function SolarSystemCanvas({ isPlaying, speed, selectedPlanet, onSelectPlanet }: SolarSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const planetPositionsRef = useRef<Map<string, { x: number; y: number; radius: number }>>(new Map());

  const drawSolarSystem = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    drawStars(ctx, width, height);

    // Draw orbits
    planets.forEach(planet => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw sun
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 35);
    sunGradient.addColorStop(0, '#fff7e0');
    sunGradient.addColorStop(0.3, '#ffcc00');
    sunGradient.addColorStop(0.7, '#ff8800');
    sunGradient.addColorStop(1, '#ff4400');
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();

    // Sun glow
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 55);
    glowGradient.addColorStop(0, 'rgba(255, 200, 0, 0.3)');
    glowGradient.addColorStop(1, 'rgba(255, 200, 0, 0)');
    ctx.beginPath();
    ctx.arc(centerX, centerY, 55, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Draw planets
    const positions = new Map<string, { x: number; y: number; radius: number }>();
    
    planets.forEach(planet => {
      // Calculate angle based on orbital period
      // Faster planets (shorter period) move faster
      const angularSpeed = (2 * Math.PI) / (planet.orbitalPeriod * 0.5);
      const angle = time * angularSpeed;
      
      const x = centerX + Math.cos(angle) * planet.orbitRadius;
      const y = centerY + Math.sin(angle) * planet.orbitRadius;

      positions.set(planet.name, { x, y, radius: planet.radius });

      // Planet shadow/glow
      const isSelected = selectedPlanet?.name === planet.name;
      const isHovered = hoveredPlanet === planet.name;

      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, planet.radius + 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      }

      // Planet body
      const planetGradient = ctx.createRadialGradient(
        x - planet.radius * 0.3, y - planet.radius * 0.3, 0,
        x, y, planet.radius
      );
      planetGradient.addColorStop(0, lightenColor(planet.color, 40));
      planetGradient.addColorStop(1, planet.color);
      
      ctx.beginPath();
      ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = planetGradient;
      ctx.fill();

      // Saturn's rings
      if (planet.name === "土星") {
        ctx.beginPath();
        ctx.ellipse(x, y, planet.radius * 1.8, planet.radius * 0.4, -0.3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(240, 216, 144, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Planet name label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(planet.name, x, y + planet.radius + 14);
    });

    planetPositionsRef.current = positions;
  }, [selectedPlanet, hoveredPlanet]);

  const drawStars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Use deterministic pseudo-random for consistent stars
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const seed1 = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      const seed2 = Math.sin(i * 269.5 + 183.3) * 43758.5453;
      const x = Math.abs(seed1 - Math.floor(seed1)) * width;
      const y = Math.abs(seed2 - Math.floor(seed2)) * height;
      const size = Math.abs(Math.sin(i * 43.7)) * 1.5 + 0.5;
      const alpha = Math.abs(Math.sin(i * 73.1)) * 0.5 + 0.3;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, size, size);
    }
  };

  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${R}, ${G}, ${B})`;
  };

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp;
    }

    if (isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
    }
    
    lastTimeRef.current = timestamp;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    drawSolarSystem(ctx, rect.width, rect.height, timeRef.current);
    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying, speed, drawSolarSystem]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let clickedPlanet: Planet | null = null;

    planetPositionsRef.current.forEach((pos, name) => {
      const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (distance <= pos.radius + 10) {
        clickedPlanet = planets.find(p => p.name === name) || null;
      }
    });

    onSelectPlanet(clickedPlanet);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = false;
    planetPositionsRef.current.forEach((pos, name) => {
      const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (distance <= pos.radius + 10) {
        setHoveredPlanet(name);
        canvas.style.cursor = 'pointer';
        found = true;
      }
    });

    if (!found) {
      setHoveredPlanet(null);
      canvas.style.cursor = 'default';
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      style={{ display: 'block' }}
    />
  );
}
