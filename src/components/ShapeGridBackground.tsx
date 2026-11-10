import React, { useEffect, useRef } from 'react';

interface ShapeGridBackgroundProps {
  className?: string;
}

interface GridCell {
  column: number;
  row: number;
}

export const ShapeGridBackground: React.FC<ShapeGridBackgroundProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const cellSize = 42;
    const trailLength = 6;
    const highlightedCells = new Map<string, number>();
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrameTime = 0;
    let lastAnimationTime = 0;
    let drift = 0;
    let pointerCell: GridCell | null = null;
    let trail: GridCell[] = [];
    let visible = false;

    const cellKey = ({ column, row }: GridCell) => `${column},${row}`;

    const updateHighlights = () => {
      const currentCells = new Map<string, number>();
      if (pointerCell) currentCells.set(cellKey(pointerCell), 1);
      trail.forEach((cell, index) => {
        const key = cellKey(cell);
        if (!currentCells.has(key)) {
          currentCells.set(key, (trail.length - index) / (trail.length + 1));
        }
      });

      for (const [key, strength] of highlightedCells) {
        const nextStrength = strength + ((currentCells.get(key) ?? 0) - strength) * 0.18;
        if (nextStrength < 0.006) highlightedCells.delete(key);
        else highlightedCells.set(key, nextStrength);
      }

      for (const [key, strength] of currentCells) {
        if (!highlightedCells.has(key)) highlightedCells.set(key, strength * 0.18);
      }
    };

    const draw = (timestamp: number, animate: boolean) => {
      if (!width || !height) return;

      if (animate && lastAnimationTime) {
        drift = (drift + (timestamp - lastAnimationTime) * 0.035) % cellSize;
      }
      lastAnimationTime = timestamp;
      updateHighlights();
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(7, 13, 30, 0.65)';
      context.fillRect(0, 0, width, height);

      const startX = -cellSize - drift;
      const startY = -cellSize;
      const columns = Math.ceil(width / cellSize) + 3;
      const rows = Math.ceil(height / cellSize) + 2;

      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          const x = startX + column * cellSize;
          const y = startY + row * cellSize;
          const alpha = highlightedCells.get(`${column - 1},${row - 1}`) ?? 0;
          if (alpha > 0) {
            context.fillStyle = `rgba(56, 189, 248, ${alpha * 0.16})`;
            context.fillRect(x, y, cellSize, cellSize);
          }
          context.strokeStyle = 'rgba(148, 163, 184, 0.16)';
          context.lineWidth = 1;
          context.strokeRect(x, y, cellSize, cellSize);
        }
      }

      const vignette = context.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.hypot(width, height) / 2
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(7, 13, 30, 0.65)');
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5, 2400 / Math.max(width, height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now(), false);
    };

    const animate = (timestamp: number) => {
      if (
        !visible ||
        motionPreference.matches ||
        document.visibilityState === 'hidden'
      ) {
        frameId = 0;
        return;
      }

      if (timestamp - lastFrameTime >= 33) {
        draw(timestamp, true);
        lastFrameTime = timestamp;
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (
        !visible ||
        motionPreference.matches ||
        document.visibilityState === 'hidden' ||
        frameId
      ) {
        return;
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const handleMotionChange = () => {
      stopAnimation();
      lastAnimationTime = 0;
      draw(performance.now(), false);
      startAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') stopAnimation();
      else startAnimation();
    };

    const clearPointer = () => {
      if (pointerCell && trailLength > 0) {
        trail.unshift(pointerCell);
        trail = trail.slice(0, trailLength);
      }
      pointerCell = null;
      if (motionPreference.matches) draw(performance.now(), false);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        if (pointerCell) clearPointer();
        return;
      }

      const nextCell = {
        column: Math.floor((event.clientX - bounds.left + drift) / cellSize),
        row: Math.floor((event.clientY - bounds.top) / cellSize),
      };
      if (
        pointerCell &&
        (pointerCell.column !== nextCell.column || pointerCell.row !== nextCell.row)
      ) {
        trail.unshift(pointerCell);
        trail = trail.slice(0, trailLength);
      }
      pointerCell = nextCell;
      if (motionPreference.matches) draw(performance.now(), false);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) clearPointer();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startAnimation();
      else stopAnimation();
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    motionPreference.addEventListener('change', handleMotionChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerout', handlePointerOut);
    resize();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionPreference.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`shape-grid-canvas ${className}`.trim()}
      aria-hidden="true"
    />
  );
};
