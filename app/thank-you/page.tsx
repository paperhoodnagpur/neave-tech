import Link from 'next/link';
import LeadTracking from './LeadTracking';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-bg px-6 py-24 sm:py-32">
      <LeadTracking />
      <section className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-deep">Inquiry received</p>
        <h1 className="mt-5 font-display text-5xl tracking-tight text-ink sm:text-6xl">
          Thank you.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Your inquiry has been sent successfully.
        </p>
        <Link href="/" className="btn btn-primary mt-10 inline-flex">
          Back to home
        </Link>
      </section>
    </main>
  );
}
