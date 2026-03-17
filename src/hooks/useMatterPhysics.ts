import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export const useMatterPhysics = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Module aliases
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    // Create engine
    const engine = Engine.create();
    engine.gravity.y = 0.5; // Slight gravity
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    });
    renderRef.current = render;

    // Create bodies
    // We'll add some "floating" tech shapes
    const shapes = [];
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * -500; // Start above screen
        const size = Math.random() * 20 + 10;
        
        const body = Bodies.polygon(x, y, Math.floor(Math.random() * 3) + 3, size, {
            frictionAir: 0.05,
            restitution: 0.6,
            render: {
                fillStyle: Math.random() > 0.5 ? '#8b5cf6' : '#22d3ee', // Violet or Cyan
                opacity: 0.3
            }
        });
        shapes.push(body);
    }

    // Add invisible ground
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true, render: { visible: false } });
    const wallLeft = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { visible: false } });
    const wallRight = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { visible: false } });

    // Central "Login Box" collision object
    // Assuming login box is roughly 420x500 centered
    const loginBox = Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 440, 600, { 
        isStatic: true, 
        render: { 
            visible: false, // Invisible because the React component renders the visual part
            fillStyle: 'transparent'
        },
        label: 'LoginBox'
    });

    Composite.add(engine.world, [...shapes, ground, wallLeft, wallRight, loginBox]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the engine
    Render.run(render);
    
    // Create runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Resize handler
    const handleResize = () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
        Matter.Body.setPosition(wallRight, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
        Matter.Body.setPosition(loginBox, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
          render.canvas.remove();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);
};
