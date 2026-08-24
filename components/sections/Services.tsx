'use client';

import Image from 'next/image';
import RevealText from '@/components/RevealText';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'ERP & API Development',
    slug: 'erp-api-development',
    desc: 'Custom ERPs and robust API ecosystems built around how your organisation actually operates — procurement, HR, finance, and ops under one roof.',
    span: 'lg:col-span-3 lg:row-span-2',
    dark: true,
    tags: ['Custom ERP', 'REST API', 'GraphQL', 'Microservices'],
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="28" height="8" rx="2" />
        <rect x="4" y="16" width="28" height="8" rx="2" />
        <rect x="4" y="28" width="28" height="4" rx="2" />
        <circle cx="9" cy="8" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Blockchain & AI',
    slug: 'blockchain-ai',
    desc: 'Auditable ledgers, applied AI, and intelligent workflow automation.',
    span: 'lg:col-span-3',
    dark: false,
    tags: ['Smart Contracts', 'LLM Integration', 'Audit Trails'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" />
        <polygon points="16,9 23,13 23,19 16,23 9,19 9,13" />
        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'IoT Solutions',
    slug: 'iot-solutions',
    desc: 'Connected devices, real-time telemetry, and live operational dashboards.',
    span: 'lg:col-span-3',
    dark: false,
    tags: ['GPS Tracking', 'MQTT', 'Live Dashboards'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16 C4 9.4 9.4 4 16 4" />
        <path d="M28 16 C28 9.4 22.6 4 16 4" />
        <path d="M8 16 C8 11.6 11.6 8 16 8" />
        <path d="M24 16 C24 11.6 20.4 8 16 8" />
        <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" />
        <line x1="16" y1="19" x2="16" y2="28" />
        <line x1="11" y1="28" x2="21" y2="28" />
      </svg>
    ),
  },
  {
    title: 'Cloud Solutions',
    slug: 'cloud-solutions',
    desc: 'Scalable, secure cloud deployments and DevOps pipelines.',
    span: 'lg:col-span-2',
    dark: false,
    tags: ['AWS / GCP', 'CI/CD', 'Docker'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 22H22a8 8 0 10-7.4-11A6 6 0 1024 22z" />
        <polyline points="19,17 16,14 13,17" />
        <line x1="16" y1="14" x2="16" y2="24" />
      </svg>
    ),
  },
  {
    title: 'Digital Marketing, Branding & Design',
    slug: 'digital-marketing-branding',
    desc: 'Brand systems, content strategy, and growth engineered together.',
    span: 'lg:col-span-2',
    dark: false,
    tags: ['Brand Identity', 'SEO', 'Performance Ads'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22 L6 10 L20 6 L20 26 Z" />
        <path d="M20 12 C23 12 26 13.5 26 16 C26 18.5 23 20 20 20" />
        <line x1="6" y1="26" x2="2" y2="30" />
        <line x1="6" y1="22" x2="2" y2="26" />
      </svg>
    ),
  },
  {
    title: 'Web Ecosystem & Security',
    slug: 'web-ecosystem-security',
    desc: 'Modern web platforms hardened against real-world threats.',
    span: 'lg:col-span-2',
    dark: false,
    tags: ['Next.js', 'Pen Testing', 'SSL / WAF'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3L6 7v9c0 6.6 4.4 12.8 10 14 5.6-1.2 10-7.4 10-14V7L16 3z" />
        <polyline points="12,16 15,19 21,13" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow">Our Services</span>
            <RevealText as="h2" by="word" className="h-display text-[clamp(1.75rem,4.1vw,3.2rem)]">
              Six service lines, one engineering team.
            </RevealText>
          </div>
          <p className="text-muted max-w-md text-lg">
            Cross-discipline by design — most of our engagements span at least two of these.
          </p>
        </div>

        <div className="grid lg:grid-cols-6 lg:auto-rows-[260px] gap-4">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href={`/services/${s.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.7, 0, 0.2, 1] }}
              className={`group relative overflow-hidden rounded-3xl border flex flex-col justify-between min-h-[220px] ${s.span} ${
                s.dark
                  ? 'bg-night border-night text-white p-10 lg:p-12'
                  : 'bg-surface border-line text-ink p-8 lg:p-9'
              }`}
            >
              {/* Dark card — code editor background image */}
              {s.dark && (
                <>
                  <div className="absolute inset-0 pointer-events-none">
                    <Image
                      src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=80"
                      alt=""
                      fill
                      sizes="(max-width:1024px) 100vw, 40vw"
                      className="object-cover opacity-[0.7]"
                    />
                    {/* fade to dark at bottom so text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night" />
                  </div>
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
                </>
              )}

              {/* Light card hover wash */}
              {!s.dark && (
                <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}

              {/* Top row: icon + arrow */}
              <div className="relative flex items-start justify-between">
                <div className={`${s.dark ? 'text-brand-mint' : 'text-brand-deep'} transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5`}>
                  {s.icon}
                </div>
                <span className={`text-lg opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-400 ${s.dark ? 'text-brand-mint' : 'text-brand-deep'}`} aria-hidden>
                  ↗
                </span>
              </div>

              {/* Bottom: title + desc + tags */}
              <div className="relative flex flex-col gap-3">
                <div>
                  <h3 className={`font-display text-[clamp(1.2rem,1.7vw,1.6rem)] tracking-tight leading-tight ${s.dark ? 'text-white' : 'text-ink'}`}>
                    {s.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${s.dark ? 'text-white/60' : 'text-muted'}`}>
                    {s.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        s.dark
                          ? 'border-brand/30 bg-brand/10 text-brand-mint'
                          : 'border-line bg-bg text-muted'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
