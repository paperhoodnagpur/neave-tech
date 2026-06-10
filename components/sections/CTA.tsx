'use client';

import RevealText from '@/components/RevealText';
import MagneticButton from '@/components/MagneticButton';
import { motion } from 'framer-motion';

const metrics = [
  { value: '50+', label: 'Firms & MSMEs served' },
  { value: '5+', label: 'Years of delivery' },
  { value: '6', label: 'Service lines' },
  { value: '100%', label: 'Founder-led ownership' },
];

const floatVariants = (delay: number) => ({
  animate: {
    y: [0, -8, 0],
    transition: { duration: 4 + delay, ease: 'easeInOut', repeat: Infinity, delay },
  },
});

export default function CTA() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="container-narrow relative">
        <div className="relative rounded-[36px] overflow-hidden p-10 sm:p-14 lg:p-20 border border-brand/20 bg-surface text-ink">

          {/* Light aurora blobs */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(55% 70% at 15% 10%, rgba(62,232,156,0.18), transparent 60%), radial-gradient(50% 60% at 85% 15%, rgba(22,193,114,0.14), transparent 60%), radial-gradient(60% 70% at 50% 110%, rgba(62,232,156,0.12), transparent 60%)',
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-60"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
            style={{
              backgroundImage:
                'radial-gradient(55% 70% at 50% 50%, rgba(62,232,156,0.12), transparent 60%)',
              backgroundSize: '200% 200%',
            }}
          />

          {/* Dot grid */}
          <div aria-hidden className="absolute inset-0 opacity-40" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,138,79,0.2) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }} />

          {/* Ring decorations */}
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full border border-brand/15 opacity-60" />
          <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 w-[280px] h-[280px] rounded-full border border-brand/20 opacity-50" />

          <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left: copy */}
            <div className="flex flex-col items-start gap-7">
              <span className="eyebrow">Let's Build</span>
              <RevealText as="h2" by="word" className="h-display text-[clamp(1.95rem,3.6vw,3.2rem)] text-ink leading-[1.05]">
                Ready to Build Your Digital Infrastructure?
              </RevealText>
              <p className="text-muted text-lg leading-relaxed">
                Tell us what you're operating, where it's bottlenecking, and where it has to be in two years.
                We'll come back with an architecture and a delivery plan — not a pitch.
              </p>
              <div className="pt-3 flex flex-wrap gap-4">
                <MagneticButton href="mailto:contact@neavetechnologies.com" variant="primary">
                  Schedule A Consultation
                </MagneticButton>
                <MagneticButton href="#services" variant="ghost">
                  Explore Services
                </MagneticButton>
              </div>
            </div>

            {/* Right: floating metric cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  variants={floatVariants(i * 0.7)}
                  animate="animate"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.7, 0, 0.2, 1] }}
                  className="rounded-2xl border border-brand/15 bg-surface/70 backdrop-blur-sm p-5 flex flex-col gap-2 shadow-sm"
                >
                  <span className="font-display text-[2.4rem] leading-none text-brand-deep font-bold">{m.value}</span>
                  <span className="text-muted text-sm leading-snug">{m.label}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
