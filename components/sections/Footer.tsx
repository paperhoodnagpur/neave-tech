'use client';

import Image from 'next/image';
import Link from 'next/link';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/#case-studies', label: 'Portfolio' },
  { href: '/#founder', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
const services = [
  'ERP & API Development',
  'Blockchain & AI',
  'IoT Solutions',
  'Cloud Solutions',
  'Digital Marketing, Branding & Design',
  'Web Ecosystem & Security',
];

export default function Footer() {
  return (
    <footer className="relative bg-bg border-t border-line pt-20 pb-10">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative w-8 h-8">
                <Image src="/logo.png" alt="" fill sizes="32px" style={{ objectFit: 'contain' }} />
              </span>
              <span className="font-display text-lg tracking-tight">
                Neave<span className="text-brand-deep">Tech</span>
              </span>
            </Link>
            <p className="text-muted text-lg leading-relaxed max-w-md">
              High-performance digital infrastructure for government & enterprise.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
              <span className="w-2 h-2 rounded-full bg-brand" /> Available for new engagements
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="eyebrow">Navigation</div>
            <ul className="mt-2 flex flex-col gap-2">
              {nav.map(n => (
                <li key={n.href}><a className="ulink text-ink/80 hover:text-ink" href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="eyebrow">Services</div>
            <ul className="mt-2 flex flex-col gap-2">
              {services.map(s => (
                <li key={s}><a className="ulink text-ink/80 hover:text-ink" href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="eyebrow">Contact</div>
            <ul className="mt-2 flex flex-col gap-2 text-ink/80">
              <li><a className="ulink" href="mailto:contact@neavetechnologies.com">contact@neavetechnologies.com</a></li>
              <li><a className="ulink" href="tel:+910000000000">+91 00000 00000</a></li>
              <li className="text-muted">Nagpur, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-muted">© 2025 NeaveTech. All rights reserved.</div>
          <div className="flex items-center gap-5 text-sm text-muted">
            <a href="#" className="ulink">Privacy</a>
            <a href="#" className="ulink">Terms</a>
            <a href="#" className="ulink">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
