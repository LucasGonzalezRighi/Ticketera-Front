'use client';

import React, { useRef } from 'react';
import { useMatrixRain } from '@/hooks/useMatrixRain';
import { useMatterPhysics } from '@/hooks/useMatterPhysics';

export const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const physicsRef = useRef<HTMLDivElement>(null);

  // Initialize effects
  useMatrixRain(canvasRef, { color: '#0f172a', fontSize: 16, speed: 0.8 }); // Dark slate rain (subtle)
  useMatterPhysics(physicsRef);

  return (
    <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden pointer-events-none">
      {/* Matrix Rain Layer - Low Opacity */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-40"
      />
      
      {/* Matter.js Physics Layer */}
      <div 
        ref={physicsRef} 
        className="absolute inset-0 z-10 pointer-events-auto"
      />

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)] pointer-events-none" />
    </div>
  );
};
