'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!ref.current || !barRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        // Reveal page
        gsap.to(ref.current, {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => setDone(true),
        });
      },
    });
    tl.fromTo(barRef.current, { width: '0%' }, { width: '100%', duration: 1.4, ease: 'power2.inOut' });
    tl.to({}, { duration: 0.2 });
  }, []);

  if (done) return null;
  return (
    <div
      ref={ref}
      className="loader"
      style={{ background: '#0A0F0C' }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <Image src="/logo.png" alt="NeaveTech" fill priority sizes="64px" style={{ objectFit: 'contain' }} />
        </div>
        <div className="w-[220px] h-px bg-white/15 overflow-hidden">
          <div ref={barRef} className="h-full bg-brand-mint" />
        </div>
        <div className="text-white/40 text-xs tracking-[0.3em] font-mono">NEAVETECH</div>
      </div>
    </div>
  );
}
