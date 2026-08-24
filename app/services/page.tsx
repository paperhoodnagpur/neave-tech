import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — Six Lines, One Engineering Team",
  description:
    "ERP & API development, Blockchain & AI, IoT, Cloud, Digital Marketing, and Web & Security. Cross-discipline engineering for government and enterprise from NeaveTech.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "NeaveTech Services — Six Lines, One Engineering Team",
    description:
      "ERP, IoT, Cloud, Blockchain & AI, Web & Security, and Digital Marketing — engineered together for government and enterprise.",
    url: "https://neave.tech/services",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      <section className="section pt-[clamp(120px,16vw,200px)]">
        <div className="container-x">
          <div className="flex flex-col gap-4 max-w-2xl mb-14">
            <span className="eyebrow">Our Services</span>
            <RevealText
              as="h1"
              by="word"
              className="h-display text-[clamp(2.1rem,4.9vw,3.9rem)]"
            >
              Six service lines, one engineering team.
            </RevealText>
            <p className="text-muted text-lg leading-relaxed">
              Cross-discipline by design — most of our engagements span at least
              two of these. Pick a starting point; we&apos;ll tell you what it
              actually needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group card p-8 flex flex-col gap-5 min-h-[280px] justify-between transition-colors duration-500 hover:border-brand/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative flex items-start justify-between">
                  <div className="text-brand-deep transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5">
                    {s.icon}
                  </div>
                  <span
                    className="text-lg text-brand-deep opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400"
                    aria-hidden
                  >
                    ↗
                  </span>
                </div>
                <div className="relative">
                  <h2 className="font-display text-[clamp(1.2rem,1.7vw,1.5rem)] tracking-tight leading-tight">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {s.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4">
            <MagneticButton href="/contact" variant="primary">
              Start a project
            </MagneticButton>
            <MagneticButton href="/#case-studies" variant="ghost">
              See our work
            </MagneticButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
