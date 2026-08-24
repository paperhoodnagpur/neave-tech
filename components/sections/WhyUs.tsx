'use client';

import { motion } from 'framer-motion';
import RevealText from '@/components/RevealText';
import MagneticButton from '@/components/MagneticButton';

const reasons = [
  {
    title: 'Execution-Focused, Not Just Consulting',
    body: 'We ship working systems. No 200-page decks that never see production — every engagement ends with software live in your environment.',
  },
  {
    title: 'Deep Understanding of Government Workflows',
    body: 'Years of direct exposure to how government departments actually operate — procurement, approvals, reporting, audit. We build for it, not around it.',
  },
  {
    title: 'Scalable Architecture Mindset',
    body: 'Every system is designed for the org you become, not the one you are today — clean separation, observable services, predictable cost curves.',
  },
  {
    title: 'Fast Deployment Cycles',
    body: 'Tight feedback loops with stakeholders mean weeks-not-quarters between concept and a working pilot in the hands of real users.',
  },
  {
    title: 'Direct Founder Involvement',
    body: 'Gauresh Bakane is hands-on across every major engagement — strategy, architecture, and execution stay anchored to one accountable owner.',
  },
];

export default function WhyUs() {
  return (
    <section className="section bg-surface relative">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
      <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-7">
          <span className="eyebrow">Why NeaveTech</span>
          <RevealText as="h2" by="word" className="h-display text-[clamp(1.75rem,3.9vw,3rem)]">
            Why Organizations Work With Us
          </RevealText>
          <div className="divider" />
          <p className="text-muted text-lg leading-relaxed max-w-md">
            We're a small, senior team. You talk to the people writing the code, and our incentives stay aligned with yours.
          </p>
          <div className="pt-2"><MagneticButton href="#contact" variant="primary">Schedule A Consultation</MagneticButton></div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.7, 0, 0.2, 1] }}
              className="border-b border-line py-8 lg:py-10 flex gap-6"
            >
              <div className="shrink-0 mt-1">
                <div className="w-11 h-11 rounded-full border border-brand/30 bg-brand/5 grid place-items-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" className="text-brand-deep">
                    <path d="M3 7.5L6 10.5L11 4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-tight">{r.title}</h3>
                <p className="mt-3 text-muted leading-relaxed max-w-prose">{r.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
