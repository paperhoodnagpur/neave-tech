'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsTouch, useReducedMotion } from '@/lib/useReducedMotion';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isTouch || reduced) {
      document.documentElement.classList.remove('has-cursor');
      return;
    }
    document.documentElement.classList.add('has-cursor');

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      const interactive = t.closest('a, button, [role=button], [data-cursor=hover]');
      if (interactive) {
        ring.classList.add('is-hover');
      } else {
        ring.classList.remove('is-hover');
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [isTouch, reduced]);

  if (!mounted || isTouch || reduced) return null;
  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring"
      />
      <div ref={dotRef} aria-hidden className="cursor-dot" />
      <style jsx>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background: #0E8A4F;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(10, 15, 12, 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        :global(.cursor-ring.is-hover) {
          width: 56px;
          height: 56px;
          margin-left: -12px;
          margin-top: -12px;
          border-color: #16C172;
          background: rgba(62, 232, 156, 0.15);
        }
      `}</style>
    </>
  );
}
