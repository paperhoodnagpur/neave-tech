'use client';

import { useRef, MouseEvent } from 'react';
import RevealText from '@/components/RevealText';
import { motion } from 'framer-motion';
import { useIsTouch, useReducedMotion } from '@/lib/useReducedMotion';

const items = [
  {
    tag: 'Public Sector',
    title: 'Government IT Systems',
    body: 'Dashboards, public-service applications, workflow digitization, and transparent reporting layers — built for scale and oversight.',
    bullets: ['Departmental dashboards', 'Citizen-facing portals', 'Compliance & audit trails'],
  },
  {
    tag: 'Enterprise',
    title: 'Enterprise Solutions',
    body: 'Custom ERP, CRM, ops automation, and analytics platforms engineered around how your organization actually runs.',
    bullets: ['Custom ERP & CRM', 'Workflow automation', 'BI & analytics dashboards'],
  },
  {
    tag: 'Infrastructure',
    title: 'Infrastructure & Integration',
    body: 'GPS tracking, IoT monitoring, API ecosystems, and cloud deployment that bind your physical and digital ops together.',
    bullets: ['GPS & fleet tracking', 'IoT device monitoring', 'API & cloud integration'],
  },
];

function CapabilityCard({ item, index }: { item: typeof items[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (isTouch || reduced || !cardRef.current || !glowRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -8;
    const ry = ((x / r.width) - 0.5) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    glowRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(62,232,156,0.45), transparent 60%)`;
  };
  const onLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    glowRef.current.style.background = 'transparent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.7, 0, 0.2, 1] }}
      className="card p-8 lg:p-10 flex flex-col gap-6 will-change-transform"
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(.2,.7,.3,1)' }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-all duration-300" />
      <div className="flex items-center justify-between">
        <span className="eyebrow">{item.tag}</span>
        <span className="font-mono text-muted text-xs">0{index + 1}</span>
      </div>
      <h3 className="font-display text-3xl leading-tight tracking-tight">{item.title}</h3>
      <p className="text-muted leading-relaxed">{item.body}</p>
      <ul className="mt-2 flex flex-col gap-3">
        {item.bullets.map(b => (
          <li key={b} className="flex items-center gap-3 text-sm">
            <span className="w-5 h-5 grid place-items-center rounded-full bg-brand/10 text-brand-deep">
              <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2.5 6.2L4.7 8.4L9.5 3.6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Capabilities() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="flex flex-col gap-3 mb-14 max-w-3xl">
          <span className="eyebrow">Core Capabilities</span>
          <RevealText as="h2" by="word" className="h-display text-[clamp(1.75rem,4.1vw,3.2rem)]">
            Three pillars of engineering, one mission: dependable digital infrastructure.
          </RevealText>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => <CapabilityCard key={it.title} item={it} index={i} />)}
        </div>
      </div>
    </section>
  );
}
