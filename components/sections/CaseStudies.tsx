'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import RevealText from '@/components/RevealText';
import { useReducedMotion, useIsTouch } from '@/lib/useReducedMotion';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const studies = [
  {
    no: '01',
    tag: 'Public Sector · Mobility',
    title: 'Transport Tracking System',
    body: 'Real-time GPS fleet monitoring for a state transport department — geofencing, route deviation alerts, and live audit dashboards across thousands of vehicles.',
    image: '/case1.png',
  },
  {
    no: '02',
    tag: 'Public Sector · Workflow',
    title: 'Digital Workflow System',
    body: 'End-to-end digitization of departmental approvals and reporting: paperless case routing, signature workflows, and ministerial-level KPI dashboards.',
    image: '/case2.png',
  },
  {
    no: '03',
    tag: 'Enterprise · ERP',
    title: 'Business ERP System',
    body: 'A custom ERP unifying procurement, HR, inventory, and finance under a single operational dashboard — purpose-built for a fast-growing manufacturer.',
    image: '/case3.png',
  },
];

function ImagePanel({ image, no }: { image: string; no: string }) {
  return (
    <div className="relative overflow-hidden">
      <Image
        src={image}
        alt={`Case Study ${no}`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        priority={no === '01'}
      />
    </div>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    if (reduced || isTouch) return;
    const section = sectionRef.current;
    if (!section) return;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      const total = cards.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${total * 100}%`,
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const i = Math.min(total - 1, Math.floor(self.progress * total));
            setActive(i);
          },
        },
      });

      cards.forEach((c, i) => {
        if (i === 0) return;
        tl.fromTo(
          c,
          { yPercent: 100, opacity: 0.6, scale: 0.96 },
          { yPercent: 0, opacity: 1, scale: 1, ease: 'power2.inOut' },
          i - 1
        );
        tl.to(cards[i - 1], { scale: 0.94, yPercent: -6, opacity: 0.7, ease: 'power2.inOut' }, i - 1);
      });
    }, section);

    return () => ctx.revert();
  }, [reduced, isTouch]);

  // ── Mobile / reduced-motion fallback ──────────────────────────────
  if (isTouch || reduced) {
    return (
      <section id="case-studies" className="section">
        <div className="container-x">
          <div className="flex flex-col gap-3 mb-10 max-w-2xl">
            <span className="eyebrow">Selected Case Studies</span>
            <RevealText as="h2" by="word" className="h-display text-[clamp(1.75rem,4.1vw,3.2rem)]">
              Systems we built, in production, at scale.
            </RevealText>
          </div>
          <div className="flex flex-col gap-6">
            {studies.map((s, i) => (
              <motion.div
                key={s.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.7, 0, 0.2, 1] }}
                className="rounded-3xl overflow-hidden border border-line bg-surface shadow-sm"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="p-8 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-4xl text-ink/15">{s.no}</span>
                      <span className="eyebrow">{s.tag}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl tracking-tight leading-tight">{s.title}</h3>
                      <p className="mt-3 text-muted leading-relaxed">{s.body}</p>
                    </div>
                    <a className="ulink inline-flex items-center gap-2 text-ink font-medium" href="#contact">
                      View Case Study <span aria-hidden>→</span>
                    </a>
                  </div>
                  <div className="relative min-h-[220px]">
                    <ImagePanel image={s.image} no={s.no} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: GSAP pinned stacking ─────────────────────────────────
  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div className="container-x pt-24 lg:pt-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="eyebrow">Selected Case Studies</span>
            <RevealText as="h2" by="word" className="h-display text-[clamp(1.75rem,4.1vw,3.2rem)]">
              Systems we built, in production, at scale.
            </RevealText>
          </div>
          <div className="flex items-center gap-2">
            {studies.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-10 bg-brand' : 'w-3 bg-line'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container-x relative h-[68svh] min-h-[520px]">
        {studies.map((s, i) => (
          <div
            key={s.no}
            ref={el => { cardsRef.current[i] = el; }}
            className="absolute inset-0 rounded-3xl overflow-hidden border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(10,15,12,0.25)]"
            style={{ zIndex: i + 1 }}
          >
            <div className="grid lg:grid-cols-2 h-full">
              {/* Text panel */}
              <div className="p-10 lg:p-14 flex flex-col justify-between gap-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl text-ink/15">{s.no}</span>
                  <span className="eyebrow">{s.tag}</span>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(2rem,3.2vw,3rem)] tracking-tight leading-[1.05]">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-muted text-lg leading-relaxed max-w-xl">{s.body}</p>
                </div>
                <a className="ulink inline-flex items-center gap-2 text-ink font-medium" href="#contact">
                  View Case Study <span aria-hidden>→</span>
                </a>
              </div>
              {/* Image panel */}
              <ImagePanel image={s.image} no={s.no} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
