'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const serviceOptions = [
  'ERP & API Development',
  'Blockchain & AI',
  'IoT Solutions',
  'Cloud Solutions',
  'Digital Marketing, Branding & Design',
  'Web Ecosystem & Security',
  'Not sure yet — help me scope it',
];

const budgetOptions = [
  'Under ₹5 Lakh',
  '₹5–15 Lakh',
  '₹15–50 Lakh',
  '₹50 Lakh+',
  'Ongoing retainer',
];

const timelineOptions = [
  'ASAP',
  'This quarter',
  'Next 3–6 months',
  'Just exploring',
];

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

const initial: FormState = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: serviceOptions[0],
  budget: budgetOptions[1],
  timeline: timelineOptions[1],
  message: '',
};

const fieldBase =
  'w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/70 ' +
  'outline-none transition-colors duration-300 focus:border-brand focus:ring-2 focus:ring-brand/20';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  // MVP: compose a structured email. Swap for a real endpoint (Resend / API
  // route / Formspree) when the backend is ready — see /app/api/contact.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `New project inquiry — ${form.company || form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      `Service interest: ${form.service}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      '',
      'Project details:',
      form.message,
    ].join('\n');
    window.location.href = `mailto:contact@neavetechnologies.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);

    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead');
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
      className="card p-7 sm:p-9 flex flex-col gap-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Full name *</span>
          <input
            required
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder="Jane Sharma"
            className={fieldBase}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Work email *</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="jane@company.com"
            className={fieldBase}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Company / Organisation</span>
          <input
            type="text"
            value={form.company}
            onChange={update('company')}
            placeholder="Acme Pvt Ltd"
            className={fieldBase}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+91 00000 00000"
            className={fieldBase}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Service</span>
          <select value={form.service} onChange={update('service')} className={fieldBase}>
            {serviceOptions.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Budget</span>
          <select value={form.budget} onChange={update('budget')} className={fieldBase}>
            {budgetOptions.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Timeline</span>
          <select value={form.timeline} onChange={update('timeline')} className={fieldBase}>
            {timelineOptions.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm">
        <span className="text-ink/80">What are you building? *</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us what you're operating, where it's bottlenecking, and where it has to be in two years."
          className={`${fieldBase} resize-none`}
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button type="submit" className="btn btn-primary">
          Send inquiry
          <span className="arrow inline-block" aria-hidden>
            ↗
          </span>
        </button>
        <p className="text-xs text-muted max-w-[16rem]">
          We reply within one business day with an architecture &amp; delivery plan — not a pitch.
        </p>
      </div>

      {sent && (
        <p className="text-sm text-brand-deep">
          Thanks — your email client should have opened. Prefer to write directly?{' '}
          <a className="ulink" href="mailto:contact@neavetechnologies.com">
            contact@neavetechnologies.com
          </a>
        </p>
      )}
    </motion.form>
  );
}
