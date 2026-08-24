'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useReducedMotion, useIsTouch } from '@/lib/useReducedMotion';
import RevealText from '@/components/RevealText';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Parallax text: desktop only — too subtle to matter on mobile and costs scroll perf
      if (!isTouch && bigTextRef.current) {
        gsap.fromTo(
          bigTextRef.current,
          { xPercent: 8 },
          {
            xPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: photoRef.current, start: 'top 80%', once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, isTouch]);

  return (
    <section id="founder" ref={sectionRef} className="section relative overflow-hidden">
      {/* Giant background text */}
      <div
        ref={bigTextRef}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(8rem,22vw,22rem)] tracking-tighter leading-none text-ink/[0.04] select-none"
      >
        GAURESH BAKANE
      </div>

      <div className="container-x grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="eyebrow">Our Founder</span>
          <RevealText as="h2" by="word" className="h-display text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.05]">
            Gauresh Bakane
          </RevealText>
          <div className="font-mono text-xs uppercase tracking-eyebrow text-brand-deep">Founder & CEO</div>
          <div className="divider" />
          <p className="text-muted text-lg leading-relaxed max-w-xl">
            Years of experience building scalable business operations and direct exposure to government
            systems and on-ground execution. The focus is consistent: high-impact infrastructure that
            creates long-term value for the institutions it serves.
          </p>
          <p className="text-muted text-lg leading-relaxed max-w-xl">
            Hands-on across architecture, delivery, and strategy — every major engagement has founder-level
            ownership behind it.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div
            ref={photoRef}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-ink/10"
          >
            <Image
              src="/founder.png"
              alt="Gauresh Bakane — Founder & CEO"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white/85">
              <div>
                <div className="font-mono text-xs uppercase tracking-eyebrow">Nagpur, IN</div>
              </div>
              <div className="font-mono text-xs uppercase tracking-eyebrow">EST. 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
