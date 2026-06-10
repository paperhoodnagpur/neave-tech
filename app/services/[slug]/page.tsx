import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/MagneticButton';
import { services, getService } from '@/lib/services';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} · NeaveTech`,
      description: service.summary,
      url: `https://neavetechnologies.com/services/${service.slug}`,
    },
  };
}

export default function ServiceDetailPage({ params }: Params) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter(s => s.slug !== service.slug);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="section pt-[clamp(120px,16vw,200px)] pb-0">
        <div className="container-x">
          <Link href="/services" className="ulink text-sm text-muted hover:text-ink">
            ← All services
          </Link>
          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 flex flex-col gap-5">
              <span className="eyebrow">{service.short}</span>
              <Reveal as="h1" className="h-display text-[clamp(2.1rem,4.9vw,3.7rem)]">
                {service.title}
              </Reveal>
              <p className="text-brand-deep text-lg font-medium">{service.tagline}</p>
              <p className="text-muted text-lg leading-relaxed max-w-2xl">{service.overview}</p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="w-20 h-20 rounded-2xl border border-brand/20 bg-brand/[0.06] grid place-items-center text-brand-deep">
                {service.icon}
              </div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="mt-14 grid sm:grid-cols-3 gap-4">
            {service.outcomes.map(o => (
              <div key={o.label} className="card p-7 flex flex-col gap-2">
                <span className="font-display text-[2.4rem] leading-none text-brand-deep font-bold">
                  {o.value}
                </span>
                <span className="text-muted text-sm leading-snug">{o.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          {/* Main column */}
          <div className="lg:col-span-7 flex flex-col gap-16">
            {/* Problems */}
            <div className="flex flex-col gap-5">
              <span className="eyebrow">What we solve</span>
              <ul className="flex flex-col gap-3">
                {service.problems.map(p => (
                  <li key={p} className="flex gap-3 text-lg leading-relaxed">
                    <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-ink/80">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="flex flex-col gap-6">
              <span className="eyebrow">How we work</span>
              <div className="flex flex-col gap-4">
                {service.process.map(step => (
                  <div key={step.step} className="flex gap-5 card p-6">
                    <span className="font-display text-2xl text-brand-deep shrink-0">{step.step}</span>
                    <div>
                      <h3 className="font-display text-lg tracking-tight leading-tight">{step.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="flex flex-col gap-6">
              <span className="eyebrow">Questions</span>
              <div className="flex flex-col divide-y divide-line border-y border-line">
                {service.faqs.map(f => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                      <span className="font-display text-lg tracking-tight">{f.q}</span>
                      <span className="text-brand-deep text-xl transition-transform duration-300 group-open:rotate-45" aria-hidden>
                        +
                      </span>
                    </summary>
                    <p className="text-muted leading-relaxed mt-3 max-w-xl">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 flex flex-col gap-10 lg:pl-4 lg:sticky lg:top-28 self-start">
            <div className="card p-8 flex flex-col gap-7">
              <div className="flex flex-col gap-4">
                <div className="eyebrow">What you get</div>
                <ul className="flex flex-col gap-3">
                  {service.deliverables.map(d => (
                    <li key={d} className="flex gap-3 text-ink/85">
                      <span className="text-brand-deep shrink-0" aria-hidden>✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="divider" />

              <div className="flex flex-col gap-4">
                <div className="eyebrow">Stack & tooling</div>
                <div className="flex flex-wrap gap-2">
                  {service.stack.map(t => (
                    <span
                      key={t}
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-line bg-bg text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="divider" />

              <div className="flex flex-col gap-4">
                <p className="text-ink/85 leading-relaxed">
                  Tell us where this is bottlenecking. We&apos;ll come back with an architecture and a
                  delivery plan — not a pitch.
                </p>
                <MagneticButton href="/contact" variant="primary">
                  Start a project
                </MagneticButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Other services */}
      <section className="section pt-0">
        <div className="container-x">
          <span className="eyebrow">Explore more</span>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map(o => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group card p-6 flex items-center justify-between gap-4 transition-colors duration-500 hover:border-brand/40"
              >
                <div className="flex items-center gap-4">
                  <span className="text-brand-deep shrink-0">{o.icon}</span>
                  <span className="font-display tracking-tight leading-tight">{o.title}</span>
                </div>
                <span className="text-brand-deep opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
