'use client';

import React, { useEffect, useRef } from 'react';

interface AuroraBackgroundProps {
  colors?: {
    c1: [number, number, number];
    c2: [number, number, number];
    c3: [number, number, number];
  };
  speed?: number;
  intensity?: number;
}

/**
 * AuroraBackground
 * 
 * Renders a full-screen WebGL canvas with an animated aurora borealis effect.
 * Uses a fragment shader with noise functions to create organic moving bands of light.
 * 
 * Colors defaults to Teal/Emerald/DeepBlue palette.
 */
export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  colors = {
    c1: [0.0, 0.9, 0.6], // Emerald/Teal bright
    c2: [0.1, 0.5, 0.8], // Blue/Teal deep
    c3: [0.05, 0.1, 0.2], // Dark Blue/Black
  },
  speed = 1.0,
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const programRef = useRef<WebGLProgram | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Vertex Shader: Simple full-screen quad
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Aurora Effect
    // Based on noise and layered sine waves
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform float u_intensity;

      // Simple pseudo-random noise
      float hash(float n) { 
        return fract(sin(n) * 43758.5453123); 
      }

      float noise(vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        float n = p.x + p.y * 57.0 + 113.0 * p.z;
        return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                       mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
                   mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                       mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float ratio = u_resolution.x / u_resolution.y;
        
        // Correct aspect ratio for noise
        vec2 pos = uv;
        pos.x *= ratio;

        // Base background color (Deep dark)
        vec3 color = u_color3 * 0.5;

        // Aurora bands
        float t = u_time * 0.2;
        
        // Loop for multiple layers
        for (float i = 1.0; i < 4.0; i++) {
            float z = i;
            float n = noise(vec3(pos.x * 0.5 + t * 0.1, pos.y * 0.5 - t * 0.05, z * 2.0 + t * 0.1));
            
            // Wavy vertical bands
            float line = sin(pos.x * 2.0 + t * 0.5 + n * 4.0) * 0.5 + 0.5;
            
            // Falloff at top/bottom
            float mask = smoothstep(0.0, 0.4, uv.y) * smoothstep(1.0, 0.6, uv.y);
            
            // Intensity based on noise
            float aurora = smoothstep(0.4, 0.6, line + n * 0.2);
            
            // Mix colors
            vec3 bandColor = mix(u_color2, u_color1, sin(i * 1.5 + t) * 0.5 + 0.5);
            
            color += bandColor * aurora * mask * (0.3 / i) * u_intensity;
        }

        // Add subtle glow/grain
        float grain = hash(uv.x * uv.y * u_time) * 0.02;
        color += grain;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile Shaders
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // Link Program
    const program = gl.createProgram();
    if (!program) return;
    programRef.current = program;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Full screen quad (-1 to 1)
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uColor1Loc = gl.getUniformLocation(program, 'u_color1');
    const uColor2Loc = gl.getUniformLocation(program, 'u_color2');
    const uColor3Loc = gl.getUniformLocation(program, 'u_color3');
    const uIntensityLoc = gl.getUniformLocation(program, 'u_intensity');

    // Initial Resize
    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2); // Limit DPR for performance
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Handle Reduced Motion
    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);
    
    let startTime = performance.now();

    const render = (time: number) => {
      if (!canvas || !gl) return;

      const currentTime = (time - startTime) * 0.001 * speed;
      // If reduced motion, freeze time at 0 (or a specific offset)
      const t = prefersReducedMotion ? 0 : currentTime;

      gl.uniform1f(uTimeLoc, t);
      gl.uniform3fv(uColor1Loc, colors.c1);
      gl.uniform3fv(uColor2Loc, colors.c2);
      gl.uniform3fv(uColor3Loc, colors.c3);
      gl.uniform1f(uIntensityLoc, intensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      mediaQuery.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(requestRef.current);
      if (programRef.current) {
        gl.deleteProgram(programRef.current);
      }
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [colors, speed, intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none" 
      aria-hidden="true"
    />
  );
};
