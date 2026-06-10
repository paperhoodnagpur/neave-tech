"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const serviceOptions = [
  "ERP & API Development",
  "Blockchain & AI",
  "IoT Solutions",
  "Cloud Solutions",
  "Digital Marketing, Branding & Design",
  "Web Ecosystem & Security",
  "Not sure yet — help me scope it",
];

const budgetOptions = [
  "Under ₹5 Lakh",
  "₹5–15 Lakh",
  "₹15–50 Lakh",
  "₹50 Lakh+",
  "Ongoing retainer",
];

const timelineOptions = [
  "ASAP",
  "This quarter",
  "Next 3–6 months",
  "Just exploring",
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

type Status = "idle" | "loading" | "success" | "error";

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: serviceOptions[0],
  budget: budgetOptions[1],
  timeline: timelineOptions[1],
  message: "",
};

const fieldBase =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/70 " +
  "outline-none transition-colors duration-300 focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm(initial);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const isLoading = status === "loading";

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
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
            onChange={update("name")}
            placeholder="Jane Sharma"
            className={fieldBase}
            disabled={isLoading}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Work email *</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="jane@company.com"
            className={fieldBase}
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Company / Organisation</span>
          <input
            type="text"
            value={form.company}
            onChange={update("company")}
            placeholder="Acme Pvt Ltd"
            className={fieldBase}
            disabled={isLoading}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91 00000 00000"
            className={fieldBase}
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Service</span>
          <select
            value={form.service}
            onChange={update("service")}
            className={fieldBase}
            disabled={isLoading}
          >
            {serviceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Budget</span>
          <select
            value={form.budget}
            onChange={update("budget")}
            className={fieldBase}
            disabled={isLoading}
          >
            {budgetOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-ink/80">Timeline</span>
          <select
            value={form.timeline}
            onChange={update("timeline")}
            className={fieldBase}
            disabled={isLoading}
          >
            {timelineOptions.map((o) => (
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
          onChange={update("message")}
          placeholder="Tell us what you're operating, where it's bottlenecking, and where it has to be in two years."
          className={`${fieldBase} resize-none`}
          disabled={isLoading}
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Sending…" : "Send inquiry"}
          {!isLoading && (
            <span className="arrow inline-block" aria-hidden>
              ↗
            </span>
          )}
        </button>
        <p className="text-xs text-muted max-w-[16rem]">
          We reply within one business day with an architecture &amp; delivery
          plan — not a pitch.
        </p>
      </div>

      {status === "success" && (
        <p className="text-sm text-brand-deep">
          ✓ Message received — we'll be in touch within one business day. Prefer
          to write directly?{" "}
          <a className="ulink" href="mailto:contact@neavetechnologies.com">
            contact@neavetechnologies.com
          </a>
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-500">
          {errorMsg} You can also reach us at{" "}
          <a className="ulink" href="mailto:contact@neavetechnologies.com">
            contact@neavetechnologies.com
          </a>
        </p>
      )}
    </motion.form>
  );
}
