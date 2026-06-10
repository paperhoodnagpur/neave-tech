'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import clsx from 'clsx';
import { useReducedMotion } from '@/lib/useReducedMotion';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  by?: 'char' | 'word' | 'line';
  delay?: number;
};

export default function RevealText({
  children,
  as: Tag = 'h2',
  className,
  by = 'word',
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const el = ref.current;
    const parts = by === 'char'
      ? children.split('').map(c => (c === ' ' ? ' ' : c))
      : children.split(' ');
    el.innerHTML = '';
    parts.forEach((p, i) => {
      const outer = document.createElement('span');
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      outer.style.verticalAlign = 'top';
      outer.style.paddingBottom = '0.18em';
      if (by === 'word') outer.style.marginRight = '0.25em';
      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(110%)';
      inner.textContent = p;
      outer.appendChild(inner);
      el.appendChild(outer);
    });
    const inners = el.querySelectorAll('span > span');
    const tween = gsap.to(inners, {
      y: 0,
      duration: 1.05,
      ease: 'expo.out',
      stagger: 0.035,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children, by, delay, reduced]);

  return (
    // @ts-expect-error generic dynamic tag
    <Tag ref={ref} className={clsx(className)}>
      {children}
    </Tag>
  );
}
