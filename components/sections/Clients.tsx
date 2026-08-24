'use client';

import Image from 'next/image';
import RevealText from '@/components/RevealText';
import { useReducedMotion } from '@/lib/useReducedMotion';

const row1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const row2 = [10, 11, 12, 13, 14, 15, 16, 17, 18];

function ClientLogo({ index }: { index: number }) {
  return (
    <div className="flex-none w-36 h-20 rounded-xl border border-line bg-white flex items-center justify-center p-3 mx-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-brand/40 hover:bg-brand/5 cursor-pointer">
      <Image
        src={`/client-${index}.png`}
        alt={`Client ${index}`}
        width={120}
        height={56}
        className="object-contain w-full h-full transition-opacity duration-300 hover:opacity-100 opacity-80"
      />
    </div>
  );
}

export default function Clients() {
  const reduced = useReducedMotion();

  return (
    <section className="section overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">Our Esteemed Clients & Prestigious Projects</span>
            <RevealText as="h2" by="word" className="h-display text-[clamp(1.75rem,3.9vw,3rem)] max-w-3xl">
              Trusted by departments, MSMEs, and operators of real infrastructure.
            </RevealText>
          </div>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-brand/30 bg-brand/5 text-brand-deep font-mono text-xs uppercase tracking-eyebrow">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            50+ Firms & MSME Clients
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />
        <div className="overflow-hidden group">
          <div className={`marquee py-3 ${reduced ? '' : 'animate-marquee-left group-hover:[animation-play-state:paused]'}`}>
            {[...row1, ...row1].map((n, i) => <ClientLogo key={`a-${i}`} index={n} />)}
          </div>
        </div>
        <div className="overflow-hidden mt-2 group">
          <div className={`marquee py-3 ${reduced ? '' : 'animate-marquee-right group-hover:[animation-play-state:paused]'}`}>
            {[...row2, ...row2].map((n, i) => <ClientLogo key={`b-${i}`} index={n} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
