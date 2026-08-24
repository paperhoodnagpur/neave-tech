'use client';

import dynamic from 'next/dynamic';
import RevealText from '@/components/RevealText';
import MagneticButton from '@/components/MagneticButton';
import { motion } from 'framer-motion';

const HeroGlobe = dynamic(() => import('@/components/hero/HeroGlobe'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden pt-[120px] pb-24">
      {/* Aurora background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute inset-x-0 top-0 h-[120%] bg-aurora opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="eyebrow mb-6"
          >
            Enterprise Software Solutions
          </motion.div>
          <RevealText
            as="h1"
            by="word"
            className="h-display text-[clamp(1.75rem,4.1vw,3.3rem)] max-w-[18ch]"
          >
            Building Scalable IT Systems for Government & Enterprise
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.1 }}
            className="mt-8 text-muted max-w-[52ch] text-lg leading-relaxed"
          >
            We engineer high-performance digital infrastructure — custom ERPs, IoT systems,
            workflow digitization, and cloud-native platforms — used by government
            departments and ambitious enterprises across India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#contact" variant="primary">Request Demo</MagneticButton>
            <MagneticButton href="#case-studies" variant="ghost">View Our Work</MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.6 }}
            className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-mono uppercase tracking-eyebrow text-muted"
          >
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand" /> 50+ Clients</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand" /> 10+ Govt Projects</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand" /> 6 Services</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative h-[480px] sm:h-[540px] lg:h-[620px] lg:-mt-20">
          <HeroGlobe />
        </div>
      </div>
    </section>
  );
}
