'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import ThemeToggle from './ThemeToggle';
import clsx from 'clsx';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/#case-studies', label: 'Portfolio' },
  { href: '/#founder', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'backdrop-blur-md bg-surface/80 border-b border-line'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container-x flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative w-8 h-8">
              <Image src="/logo.png" alt="" fill sizes="32px" style={{ objectFit: 'contain' }} />
            </span>
            <span className="font-display text-lg tracking-tight">
              Neave<span className="text-brand-deep">Tech</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="ulink text-sm text-ink/80 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton href="/contact" variant="primary">Request Demo</MagneticButton>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              className="relative w-10 h-10 grid place-items-center"
              onClick={() => setOpen(o => !o)}
            >
              <span
                className={clsx(
                  'block w-6 h-px bg-ink absolute transition-all',
                  open ? 'rotate-45 top-1/2' : 'top-[14px]'
                )}
              />
              <span
                className={clsx(
                  'block w-6 h-px bg-ink absolute transition-all',
                  open ? '-rotate-45 top-1/2' : 'bottom-[14px]'
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-bg md:hidden flex flex-col"
          >
            <div className="h-[72px]" />
            <nav className="flex-1 flex flex-col items-start justify-center gap-6 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
                  className="font-display text-4xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="pt-6"
              >
                <MagneticButton href="/contact" variant="primary">Request Demo</MagneticButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
