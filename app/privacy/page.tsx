import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import RevealText from "@/components/RevealText";

export const metadata: Metadata = {
  title: "Legal Policies — Neave Tech",
  description:
    "Terms & Conditions, Privacy Policy, Refund & Cancellation Policy, Shipping & Delivery Policy, Pricing Policy and other legal policies for Neave Tech.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Legal Policies — Neave Tech",
    description:
      "Legal policies governing the website, products and services offered by Neave Tech.",
    url: "https://neave.tech/privacy",
  },
};

const policySections = [
  { id: "terms", label: "Terms & Conditions" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "refund", label: "Refund & Cancellation" },
  { id: "shipping", label: "Shipping / Delivery" },
  { id: "pricing", label: "Pricing Policy" },
  { id: "services", label: "Products & Services" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />

      <section className="section pt-[clamp(120px,16vw,200px)]">
        <div className="container-x">
          {/* Header */}
          <div className="max-w-3xl mb-14">
            <span className="eyebrow">Legal Policies</span>

            <RevealText
              as="h1"
              by="word"
              className="h-display text-[clamp(2.1rem,4.9vw,3.9rem)] mt-4"
            >
              Legal Policies
            </RevealText>

            <p className="text-muted text-lg leading-relaxed mt-6">
              Neave Tech is a technology brand operated by Neave Corporation
              Pvt. Ltd. These Legal Policies apply to the website, products, and
              services offered under the Neave Tech brand.
            </p>

            <div className="mt-6 text-sm text-muted space-y-1">
              <p>
                <span className="text-ink/80">Legal Entity:</span> Neave
                Corporation Pvt. Ltd.
              </p>
              <p>
                <span className="text-ink/80">Brand:</span> Neave Tech
              </p>
            </div>
          </div>

          {/* Policy Navigation */}
          <div className="card p-6 sm:p-8 mb-12">
            <div className="eyebrow mb-4">On this page</div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {policySections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="ulink text-ink/80 hover:text-ink"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>

          {/* Policy Content */}
          <div className="max-w-4xl space-y-16">
            {/* Terms & Conditions */}
            <section id="terms" className="scroll-mt-28">
              <div className="eyebrow mb-4">01</div>

              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">
                Terms & Conditions
              </h2>

              <div className="space-y-5 text-ink/80 leading-relaxed">
                <p>
                  Neave Corporation Pvt. Ltd., operating under the brand name
                  Neave Tech, provides IT consulting, software development,
                  website development, mobile application development, digital
                  marketing, UI/UX design, branding, cloud solutions, AI
                  solutions, cybersecurity services, ERP/CRM solutions and other
                  technology services.
                </p>

                <p>By using our website or services, you agree to:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate information.</li>
                  <li>Use our services only for lawful purposes.</li>
                  <li>Respect our intellectual property rights.</li>
                  <li>
                    Not misuse or attempt to compromise our website or systems.
                  </li>
                </ul>

                <p>
                  Project deliverables, timelines, payment terms and scope of
                  work are governed by the individual proposal, quotation or
                  agreement signed between Neave Corporation Pvt. Ltd. (Neave
                  Tech) and the client.
                </p>

                <p>
                  All content, graphics, logos, software and materials on this
                  website remain the property of Neave Corporation Pvt. Ltd.,
                  unless otherwise agreed in writing.
                </p>

                <p>
                  These Terms shall be governed by the laws of India. Any
                  disputes shall be subject to the jurisdiction of the competent
                  courts of Pune, Maharashtra.
                </p>
              </div>
            </section>

            <div className="divider" />

            {/* Privacy Policy */}
            <section id="privacy" className="scroll-mt-28">
              <div className="eyebrow mb-4">02</div>

              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">
                Privacy Policy
              </h2>

              <div className="space-y-5 text-ink/80 leading-relaxed">
                <p>
                  Neave Corporation Pvt. Ltd. (Neave Tech) values your privacy.
                </p>

                <p>We may collect:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Name</li>
                  <li>Company Name</li>
                  <li>Email Address</li>
                  <li>Phone Number</li>
                  <li>Project Requirements</li>
                  <li>Information voluntarily shared through forms or email</li>
                </ul>

                <p>Your information may be used for:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing requested services</li>
                  <li>Customer support</li>
                  <li>Preparing quotations</li>
                  <li>Project-related communication</li>
                  <li>Improving our services</li>
                </ul>

                <p>
                  We do not sell or rent customer information to third parties.
                </p>

                <p>
                  Information may be shared with trusted service providers where
                  necessary to provide our services or where legally required.
                </p>

                <p>
                  We implement reasonable technical and organizational measures
                  to protect personal information.
                </p>
              </div>
            </section>

            <div className="divider" />

            {/* Refund & Cancellation */}
            <section id="refund" className="scroll-mt-28">
              <div className="eyebrow mb-4">03</div>

              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">
                Refund & Cancellation Policy
              </h2>

              <div className="space-y-5 text-ink/80 leading-relaxed">
                <p>
                  As Neave Corporation Pvt. Ltd. (Neave Tech) provides
                  customized digital and technology services, refunds are
                  evaluated on a case-by-case basis.
                </p>

                <h3 className="font-display text-xl text-ink">Cancellation</h3>

                <p>
                  Clients may request cancellation before project execution
                  begins.
                </p>

                <p>
                  Once project execution has commenced, applicable cancellation
                  charges may apply based on the work completed and the terms
                  agreed in the proposal or agreement.
                </p>

                <h3 className="font-display text-xl text-ink">Refund</h3>

                <p>
                  Refunds, where approved, will generally be processed within
                  5–7 working days to the original payment method or bank
                  account.
                </p>

                <p>Refunds are generally not applicable for:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Completed milestones</li>
                  <li>Custom software or development work already performed</li>
                  <li>Digital marketing campaigns already executed</li>
                  <li>Third-party licence or hosting charges</li>
                  <li>Domain registration charges</li>
                </ul>
              </div>
            </section>

            <div className="divider" />

            {/* Shipping / Delivery */}
            <section id="shipping" className="scroll-mt-28">
              <div className="eyebrow mb-4">04</div>

              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">
                Shipping / Delivery Policy
              </h2>

              <div className="space-y-5 text-ink/80 leading-relaxed">
                <p>
                  Neave Corporation Pvt. Ltd. (Neave Tech) provides digital and
                  technology services only.
                </p>

                <p>
                  No physical products are sold or shipped through this website.
                </p>

                <p>
                  Project deliverables are provided electronically through
                  email, secure download links, cloud platforms or client
                  portals.
                </p>

                <p>
                  Delivery timelines depend on the project scope and will be
                  communicated to the client and specified in the applicable
                  proposal or agreement.
                </p>
              </div>
            </section>

            <div className="divider" />

            {/* Pricing */}
            <section id="pricing" className="scroll-mt-28">
              <div className="eyebrow mb-4">05</div>

              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">
                Pricing Policy
              </h2>

              <div className="space-y-5 text-ink/80 leading-relaxed">
                <p>Neave Tech follows a consultation-based pricing model.</p>

                <p>
                  Since each project has different requirements and complexity:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Pricing is shared after understanding the client&apos;s
                    requirements.
                  </li>
                  <li>
                    A detailed quotation or proposal is provided before project
                    commencement.
                  </li>
                  <li>
                    Applicable charges are communicated to the client in
                    advance.
                  </li>
                  <li>
                    Applicable GST and other taxes, if any, will be mentioned
                    separately in the invoice.
                  </li>
                </ul>

                <p>
                  For a quotation, please{" "}
                  <Link href="/contact" className="ulink text-ink">
                    contact our team
                  </Link>
                  .
                </p>
              </div>
            </section>

            <div className="divider" />

            {/* Products & Services */}
            <section id="services" className="scroll-mt-28">
              <div className="eyebrow mb-4">06</div>

              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">
                Products & Services
              </h2>

              <div className="space-y-5 text-ink/80 leading-relaxed">
                <p>
                  Neave Corporation Pvt. Ltd., through its Neave Tech brand,
                  offers:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Custom Software Development</li>
                  <li>Website Development</li>
                  <li>Mobile Application Development</li>
                  <li>UI/UX Design</li>
                  <li>ERP & CRM Solutions</li>
                  <li>Cloud Services</li>
                  <li>Cybersecurity Solutions</li>
                  <li>AI & Automation Solutions</li>
                  <li>Blockchain Development</li>
                  <li>Digital Marketing</li>
                  <li>SEO</li>
                  <li>Social Media Marketing</li>
                  <li>Branding & Graphic Design</li>
                  <li>IT Consulting</li>
                  <li>Website Maintenance & Support</li>
                </ul>

                <p>
                  Service availability depends on project requirements and
                  mutual agreement.
                </p>
              </div>
            </section>

            <div className="divider" />

            {/* Contact */}
            <section id="contact" className="scroll-mt-28">
              <div className="eyebrow mb-4">07</div>

              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">
                Contact Us
              </h2>

              <div className="card p-7 sm:p-9">
                <div className="space-y-4 text-ink/80">
                  <div>
                    <p className="font-display text-xl text-ink">Neave Tech</p>
                    <p className="text-muted mt-1">
                      A brand of Neave Corporation Pvt. Ltd.
                    </p>
                  </div>

                  <div className="divider" />

                  <div className="space-y-3">
                    <p>
                      <span className="text-muted">Email:</span>{" "}
                      <a
                        href="mailto:mail@neave.tech"
                        className="ulink text-ink"
                      >
                        mail@neave.tech
                      </a>
                    </p>

                    <p>
                      <span className="text-muted">Phone:</span>{" "}
                      <a href="tel:+919284755883" className="ulink text-ink">
                        +91 9284755883
                      </a>
                    </p>

                    <p>
                      <span className="text-muted">Address:</span>
                      <br />
                      NR Sayaji Hotel, O-201,
                      <br />
                      S. No. 170, Pristine Prolife 2,
                      <br />
                      Wakad, Pune, Maharashtra – 411057, India
                    </p>

                    <p>
                      <span className="text-muted">Website:</span>{" "}
                      <a href="https://neave.tech" className="ulink text-ink">
                        www.neave.tech
                      </a>
                    </p>

                    <p>
                      <span className="text-muted">Business Hours:</span>
                      <br />
                      Monday – Friday
                      <br />
                      10:30 AM – 6:30 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-5">
            <p className="text-sm text-muted">
              Have questions about these policies?
            </p>

            <Link href="/contact" className="btn btn-primary">
              Contact us
              <span className="arrow inline-block" aria-hidden>
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
