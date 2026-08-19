'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 50, suffix: '+',
    label: 'Clients & MSME Firms',
    sub: 'across Maharashtra & beyond',
    bar: 82,
  },
  {
    value: 6, suffix: '',
    label: 'Core Service Lines',
    sub: 'ERP · IoT · Cloud · AI · Web · Marketing',
    bar: 60,
  },
  {
    value: 10, suffix: '+',
    label: 'Government Projects',
    sub: 'state departments & public sector',
    bar: 74,
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 2,
      ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.v).toString();
      },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [value]);
  return (
    <span className="inline-flex items-baseline gap-1">
      <span ref={ref}>0</span>
      <span>{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section relative">
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="container-x">
        <div className="grid sm:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.7, 0, 0.2, 1] }}
              className="group relative rounded-3xl border border-line bg-surface p-10 lg:p-12 flex flex-col gap-5 overflow-hidden transition-shadow duration-500 hover:shadow-[0_20px_60px_-12px_rgba(22,193,114,0.18)]"
            >
              {/* Hover background wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top accent bar */}
              <motion.div
                className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-brand to-brand-mint rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.bar}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
              />

              {/* Index */}
              <div className="relative flex items-center justify-between">
                <span className="eyebrow">0{i + 1} / 03</span>
                <span className="w-7 h-7 rounded-full border border-brand/25 bg-brand/8 grid place-items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                </span>
              </div>

              {/* Number */}
              <div className="relative gradient-text font-display text-[clamp(3.2rem,6vw,5.5rem)] leading-none tracking-tight">
                <Counter value={s.value} suffix={s.suffix} />
              </div>

              {/* Label + sub */}
              <div className="relative flex flex-col gap-1">
                <div className="font-medium text-ink">{s.label}</div>
                <div className="text-xs text-muted font-mono">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
