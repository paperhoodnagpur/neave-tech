import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import RevealText from "@/components/RevealText";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Tell NeaveTech what you are building. We reply within one business day with an architecture and delivery plan for your ERP, IoT, cloud, blockchain, or web project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact NeaveTech — Start a Project",
    description:
      "Tell us what you are building. We reply within one business day with an architecture and delivery plan — not a pitch.",
    url: "https://neave.tech/contact",
  },
};

const steps = [
  {
    title: "You send the brief",
    desc: "A few lines on what you operate and where it bottlenecks. No NDA needed to talk.",
  },
  {
    title: "We scope it",
    desc: "Within one business day you get an architecture sketch and a realistic delivery plan.",
  },
  {
    title: "We build, founder-led",
    desc: "One engineering team across all six service lines — no handoffs, no agency layers.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="section pt-[clamp(120px,16vw,200px)]">
        <div className="container-x">
          <div className="flex flex-col gap-4 max-w-2xl mb-14">
            <span className="eyebrow">Contact</span>
            <RevealText
              as="h1"
              by="word"
              className="h-display text-[clamp(2.1rem,4.9vw,3.9rem)]"
            >
              Let&apos;s build your digital infrastructure.
            </RevealText>
            <p className="text-muted text-lg leading-relaxed">
              Tell us what you&apos;re operating, where it&apos;s bottlenecking,
              and where it has to be in two years. We&apos;ll come back with an
              architecture and a delivery plan.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-5 flex flex-col gap-10 lg:pt-2">
              <div className="flex flex-col gap-4">
                <div className="eyebrow">What happens next</div>
                <ol className="flex flex-col gap-5">
                  {steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full border border-brand/30 bg-brand/10 text-brand-deep grid place-items-center font-mono text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-lg tracking-tight leading-tight">
                          {s.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed mt-1">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="divider" />

              <div className="flex flex-col gap-4">
                <div className="eyebrow">Reach us directly</div>
                <ul className="flex flex-col gap-3 text-ink/80">
                  <li>
                    <a className="ulink" href="mailto:mail@neave.tech">
                      mail@neave.tech
                    </a>
                  </li>
                  <li>
                    <a className="ulink" href="tel:+919284755883">
                      +91 928-475-5883
                    </a>
                  </li>
                  <li className="text-muted">Nagpur, Maharashtra, India</li>
                </ul>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-muted">
                  <span className="w-2 h-2 rounded-full bg-brand" /> Available
                  for new engagements
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
