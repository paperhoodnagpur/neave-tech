'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIsTouch, useReducedMotion } from '@/lib/useReducedMotion';

const bars = [38, 55, 62, 78, 85, 72, 68, 90, 82, 95, 88, 74];

const routes = [
  { from: 'Nagpur', to: 'Mumbai', active: true },
  { from: 'Pune', to: 'Delhi', active: true },
  { from: 'Aurangabad', to: 'Nagpur', active: false },
];

export default function HeroDashboard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (isTouch || reduced || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    wrapRef.current.style.transform = `perspective(1200px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  };

  const onLeave = () => {
    if (!wrapRef.current) return;
    wrapRef.current.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center py-6 px-2">
      {/* Glow behind cards */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(62,232,156,0.45) 0%, rgba(22,193,114,0.18) 40%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      <motion.div
        animate={!reduced ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
        className="relative w-full max-w-[320px]"
      >
        <div
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="flex flex-col gap-3"
          style={{ transition: 'transform 0.4s cubic-bezier(.2,.7,.3,1)' }}
        >
          {/* Top mini-metric strip */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="rounded-xl bg-surface border border-line shadow-sm px-4 py-3">
              <div className="text-[10px] text-muted font-mono uppercase tracking-eyebrow">Revenue</div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="font-display text-lg text-ink">₹2.4 Cr</span>
                <span className="text-brand-deep text-[11px] font-mono font-bold">↑ 18%</span>
              </div>
            </div>
            <div className="rounded-xl bg-night text-white shadow-sm px-4 py-3">
              <div className="text-[10px] text-white/50 font-mono uppercase tracking-eyebrow">Govt. Depts</div>
              <div className="mt-1 font-display text-lg">12 Active</div>
            </div>
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
            className="rounded-2xl bg-surface border border-line shadow-[0_24px_64px_-12px_rgba(10,15,12,0.18)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-eyebrow">Fleet Monitor</span>
              </div>
              <span className="font-mono text-[10px] text-brand font-bold">● LIVE</span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 border-b border-line">
              {[
                { value: '2,847', label: 'Vehicles' },
                { value: '94.2%', label: 'Compliance' },
                { value: '18', label: 'Routes' },
              ].map((s, i) => (
                <div key={i} className={`px-4 py-3 ${i < 2 ? 'border-r border-line' : ''}`}>
                  <div className="font-display text-xl text-ink leading-none">{s.value}</div>
                  <div className="mt-1 text-[11px] text-muted">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="px-5 py-4 border-b border-line">
              <div className="text-[10px] text-muted font-mono uppercase tracking-eyebrow mb-2.5">
                Activity (7d)
              </div>
              <div className="flex items-end gap-[3px] h-12">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      backgroundColor:
                        i === 9 ? '#16C172' : 'rgba(22,193,114,0.2)',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      delay: 2.0 + i * 0.04,
                      duration: 0.5,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Routes */}
            <div className="px-5 py-3 flex flex-col gap-2">
              {routes.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] text-ink">
                    {r.from}
                    <span className="text-muted mx-1.5">→</span>
                    {r.to}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      r.active
                        ? 'bg-brand/10 text-brand-deep'
                        : 'bg-line text-muted'
                    }`}
                  >
                    {r.active ? 'Active' : 'Idle'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
