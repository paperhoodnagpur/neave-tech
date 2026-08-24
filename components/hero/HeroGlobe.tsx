'use client';

import createGlobe from 'cobe';
import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, useIsTouch } from '@/lib/useReducedMotion';

export default function HeroGlobe() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const phi        = useRef(1.5);
  const dragging   = useRef<number | null>(null);
  const reduced    = useReducedMotion();
  const isTouch    = useIsTouch();

  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let raf: number;
    const size = () => wrapper.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width:  size(),
      height: size(),
      phi:    phi.current,
      theta:  -0.12,
      dark:   0,
      diffuse: 1.5,
      scale: 1.18,
      mapSamples:    16000,
      mapBrightness: 8,
      baseColor:   [0.93, 0.99, 0.96] as [number, number, number],
      markerColor: [0.086, 0.757, 0.447] as [number, number, number],
      glowColor:   [0.97, 0.99, 0.97] as [number, number, number], // matches bg, no glow
    });

    // Fix cobe's inserted wrapper so it doesn't push layout
    const p = canvas.parentElement;
    if (p && p !== wrapper) {
      p.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    }

    function frame() {
      if (dragging.current === null) phi.current += 0.004;
      const w = size();
      globe.update({ phi: phi.current, width: w, height: w });
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
    };
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = e.clientX;
  }, []);
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging.current === null) return;
    phi.current += (e.clientX - dragging.current) * 0.005;
    dragging.current = e.clientX;
  }, []);
  const onPointerUp = useCallback(() => { dragging.current = null; }, []);

  if (reduced) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-44 h-44 rounded-full border-2 border-brand/30 bg-brand/5 grid place-items-center">
          <span className="font-mono text-[10px] text-brand-deep uppercase tracking-eyebrow">India Network</span>
        </div>
      </div>
    );
  }

  // On touch devices, keep the auto-rotating globe but disable drag-to-rotate.
  const dragHandlers = isTouch
    ? {}
    : {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerLeave: onPointerUp,
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.8 }}
      className="absolute inset-0 flex items-center justify-center"
      {...dragHandlers}
      style={{ cursor: isTouch ? 'default' : 'grab' }}
    >
      <div
        ref={wrapperRef}
        style={{ position: 'relative', width: '115%', aspectRatio: '1 / 1', maxHeight: '115%' }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </motion.div>
  );
}
