'use client';

import { ReactNode, createElement } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
};

/**
 * Lightweight framer-motion reveal. Mirrors the look of <RevealText> but
 * avoids the gsap import, which breaks Next's static-paths worker on routes
 * that use generateStaticParams.
 */
export default function Reveal({ children, as = 'h2', className, delay = 0 }: Props) {
  const MotionTag = motion(as as 'h2');
  return createElement(
    MotionTag,
    {
      className,
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0.8, delay, ease: [0.7, 0, 0.2, 1] },
    },
    children
  );
}
