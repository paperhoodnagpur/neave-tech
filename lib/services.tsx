import type { ReactNode } from 'react';

export type Service = {
  slug: string;
  title: string;
  /** Short label for nav / cards */
  short: string;
  tagline: string;
  /** One–two lines for the index grid */
  summary: string;
  /** Longer intro for the detail hero */
  overview: string;
  /** Pain points this service removes */
  problems: string[];
  /** How an engagement runs, start to finish */
  process: { step: string; title: string; desc: string }[];
  /** What the client actually receives */
  deliverables: string[];
  /** Tech / tooling chips */
  stack: string[];
  /** Outcome-oriented value props */
  outcomes: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
  /** Slug of a related case study section anchor on the homepage, for now */
  relatedCase?: string;
  icon: ReactNode;
};

export const services: Service[] = [
  {
    slug: 'erp-api-development',
    title: 'ERP & API Development',
    short: 'ERP & API',
    tagline: 'Your whole operation, under one roof.',
    summary:
      'Custom ERPs and robust API ecosystems built around how your organisation actually operates — procurement, HR, finance, and ops in one system.',
    overview:
      'Off-the-shelf ERPs force your processes to bend around their assumptions. We build the inverse: a system shaped around how your teams already work — procurement, HR, inventory, and finance unified behind a single operational dashboard, with a clean API layer so every other tool you run can talk to it.',
    problems: [
      'Data scattered across spreadsheets, legacy tools, and people’s heads',
      'Approvals and reporting that still move on paper or email',
      'No single source of truth for finance, inventory, or headcount',
      'Existing software that can’t integrate with anything new',
    ],
    process: [
      { step: '01', title: 'Operational audit', desc: 'We map your real workflows — not the org chart — to find where work actually bottlenecks.' },
      { step: '02', title: 'Architecture', desc: 'A data model and API contract designed for the next two years, not just today.' },
      { step: '03', title: 'Iterative build', desc: 'Modules ship in working increments so your team validates as we go.' },
      { step: '04', title: 'Rollout & handover', desc: 'Migration, training, and documentation so the system outlives the engagement.' },
    ],
    deliverables: [
      'Custom ERP with role-based modules',
      'Documented REST / GraphQL API layer',
      'Admin dashboards & reporting',
      'Data migration from legacy systems',
      'Team training & technical documentation',
    ],
    stack: ['Custom ERP', 'REST API', 'GraphQL', 'Microservices', 'PostgreSQL', 'Role-based access'],
    outcomes: [
      { value: 'One', label: 'Source of truth across departments' },
      { value: '40%+', label: 'Less manual reconciliation work' },
      { value: 'Days→Hrs', label: 'Approval cycles compressed' },
    ],
    faqs: [
      { q: 'Can you integrate with our existing software?', a: 'Yes — the API layer is designed so legacy tools, accounting software, and third-party services connect cleanly rather than being ripped out.' },
      { q: 'How long does an ERP build take?', a: 'A focused module set is typically 8–16 weeks; we ship working increments so value lands well before the full rollout.' },
      { q: 'Do you migrate our old data?', a: 'Migration, cleanup, and validation of legacy data is part of every rollout.' },
    ],
    relatedCase: 'case-studies',
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
    slug: 'blockchain-ai',
    title: 'Blockchain & AI',
    short: 'Blockchain & AI',
    tagline: 'Auditable by design, intelligent by default.',
    summary: 'Auditable ledgers, applied AI, and intelligent workflow automation built for trust and scale.',
    overview:
      'Two technologies, one goal: removing manual, error-prone, or un-auditable work. Blockchain gives you tamper-evident records where provenance matters; applied AI takes the repetitive judgement work off your team’s plate. We focus on the practical end — systems that ship and hold up to audit.',
    problems: [
      'Records that can be disputed or quietly altered',
      'Manual review work that doesn’t scale with volume',
      'AI pilots that never make it to production',
      'No audit trail for high-stakes transactions',
    ],
    process: [
      { step: '01', title: 'Use-case fit', desc: 'We pressure-test whether a ledger or model actually beats a simpler approach — and tell you if it doesn’t.' },
      { step: '02', title: 'Prototype', desc: 'A working proof on your real data before any large commitment.' },
      { step: '03', title: 'Productionise', desc: 'Hardening, monitoring, and the guardrails that take a demo to deployment.' },
      { step: '04', title: 'Operate', desc: 'Evaluation pipelines and audit tooling so the system stays trustworthy.' },
    ],
    deliverables: [
      'Smart contracts & on-chain audit trails',
      'LLM integration into your workflows',
      'Document & data extraction pipelines',
      'Evaluation and monitoring tooling',
      'Security & audit review',
    ],
    stack: ['Smart Contracts', 'LLM Integration', 'Audit Trails', 'RAG', 'Vector Search', 'Solidity'],
    outcomes: [
      { value: '100%', label: 'Tamper-evident audit history' },
      { value: 'Hrs→Min', label: 'Document processing time' },
      { value: 'Prod', label: 'AI that ships, not just pilots' },
    ],
    faqs: [
      { q: 'Do we actually need blockchain?', a: 'Often not — and we’ll say so. We only recommend a ledger where provenance, multi-party trust, or audit requirements genuinely justify it.' },
      { q: 'Will the AI hallucinate on our data?', a: 'We ground models in your own sources with retrieval and add evaluation guardrails so outputs stay verifiable.' },
      { q: 'Can this run on our infrastructure?', a: 'Yes — deployments can be cloud, on-prem, or hybrid depending on your data-residency needs.' },
    ],
    relatedCase: 'case-studies',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" />
        <polygon points="16,9 23,13 23,19 16,23 9,19 9,13" />
        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    slug: 'iot-solutions',
    title: 'IoT Solutions',
    short: 'IoT',
    tagline: 'See your fleet, floor, and field in real time.',
    summary: 'Connected devices, real-time telemetry, and live operational dashboards across vehicles, sensors, and machines.',
    overview:
      'When your assets are moving — vehicles, machinery, sensors in the field — decisions are only as good as how fresh your data is. We build the full path: devices to ingestion to live dashboards, with geofencing, alerts, and audit history that hold up at scale.',
    problems: [
      'No live visibility into vehicles, machines, or field assets',
      'Telemetry that arrives too late to act on',
      'Alerts buried in noise instead of surfacing what matters',
      'Dashboards that can’t handle thousands of devices',
    ],
    process: [
      { step: '01', title: 'Signal design', desc: 'We decide exactly what to measure and how often — the foundation of a system that scales.' },
      { step: '02', title: 'Pipeline', desc: 'Reliable ingestion that holds up when thousands of devices report at once.' },
      { step: '03', title: 'Dashboards & alerts', desc: 'Live operational views with geofencing, thresholds, and route logic.' },
      { step: '04', title: 'Scale & audit', desc: 'Historical storage and reporting for compliance and after-the-fact review.' },
    ],
    deliverables: [
      'Device integration & telemetry pipeline',
      'Real-time operational dashboards',
      'Geofencing & deviation alerts',
      'Historical reporting & audit logs',
      'Scalable ingestion infrastructure',
    ],
    stack: ['GPS Tracking', 'MQTT', 'Live Dashboards', 'Time-series DB', 'Geofencing', 'WebSockets'],
    outcomes: [
      { value: '1000s', label: 'Of devices monitored live' },
      { value: 'Real-time', label: 'Telemetry & alerting' },
      { value: 'Full', label: 'Audit history retained' },
    ],
    faqs: [
      { q: 'Can you work with our existing hardware?', a: 'Yes — we integrate with most GPS units, sensors, and controllers that can emit over standard protocols like MQTT or HTTP.' },
      { q: 'How many devices can it handle?', a: 'Architectures are built to scale to thousands of concurrent devices; we size the pipeline to your fleet.' },
      { q: 'Do you offer the dashboards too?', a: 'Yes — live operational dashboards and reporting are part of the delivery, not a separate add-on.' },
    ],
    relatedCase: 'case-studies',
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
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    short: 'Cloud',
    tagline: 'Infrastructure that scales without surprises.',
    summary: 'Scalable, secure cloud deployments and DevOps pipelines that ship reliably and recover gracefully.',
    overview:
      'The cloud only pays off when it’s set up deliberately. We design deployments that scale with demand, stay secure by default, and ship through automated pipelines — so releases are routine and recovery is planned, not improvised.',
    problems: [
      'Manual, risky deployments that break under pressure',
      'Bills that grow faster than usage',
      'No clear recovery plan when something fails',
      'Security and access configured ad-hoc',
    ],
    process: [
      { step: '01', title: 'Assessment', desc: 'We review your workloads, cost drivers, and risk surface before touching anything.' },
      { step: '02', title: 'Architecture', desc: 'Infrastructure-as-code blueprints sized for real demand, not worst-case guesses.' },
      { step: '03', title: 'Pipelines', desc: 'CI/CD so every release is automated, tested, and reversible.' },
      { step: '04', title: 'Observability', desc: 'Monitoring, alerting, and backups so problems surface before users do.' },
    ],
    deliverables: [
      'Cloud architecture (AWS / GCP)',
      'Infrastructure-as-code setup',
      'CI/CD pipelines',
      'Monitoring, logging & alerting',
      'Backup & disaster-recovery plan',
    ],
    stack: ['AWS / GCP', 'CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'Observability'],
    outcomes: [
      { value: 'Auto', label: 'Deployments via CI/CD' },
      { value: '99.9%', label: 'Uptime targets' },
      { value: 'Lower', label: 'Cloud spend, right-sized' },
    ],
    faqs: [
      { q: 'AWS or GCP?', a: 'Either — we recommend based on your existing tooling, team familiarity, and cost profile rather than a fixed preference.' },
      { q: 'Can you reduce our current cloud bill?', a: 'Usually. Right-sizing, autoscaling, and removing idle resources are part of the assessment.' },
      { q: 'Do you offer ongoing management?', a: 'Yes — retainer-based monitoring and operations are available after the initial setup.' },
    ],
    relatedCase: 'case-studies',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 22H22a8 8 0 10-7.4-11A6 6 0 1024 22z" />
        <polyline points="19,17 16,14 13,17" />
        <line x1="16" y1="14" x2="16" y2="24" />
      </svg>
    ),
  },
  {
    slug: 'digital-marketing-branding',
    title: 'Digital Marketing, Branding & Design',
    short: 'Marketing & Design',
    tagline: 'Brand, content, and growth — engineered together.',
    summary: 'Brand systems, content strategy, and growth engineered together so your presence matches the product behind it.',
    overview:
      'Most agencies treat brand, content, and performance as separate line items. We run them as one system: an identity that holds up everywhere, content with a point of view, and growth channels measured against real outcomes — so the marketing matches the engineering.',
    problems: [
      'A brand that looks inconsistent across touchpoints',
      'Marketing spend with no clear attribution',
      'Content published without a strategy behind it',
      'A site that doesn’t convert the traffic it gets',
    ],
    process: [
      { step: '01', title: 'Positioning', desc: 'We get clear on who you’re for and why you win before designing anything.' },
      { step: '02', title: 'Identity system', desc: 'A brand system — not just a logo — that stays coherent everywhere it appears.' },
      { step: '03', title: 'Content & SEO', desc: 'A content engine and search foundation that compounds over time.' },
      { step: '04', title: 'Performance', desc: 'Paid and organic channels measured against outcomes, then tuned.' },
    ],
    deliverables: [
      'Brand identity & guidelines',
      'Website & landing page design',
      'SEO foundation & content strategy',
      'Performance ad campaigns',
      'Analytics & attribution setup',
    ],
    stack: ['Brand Identity', 'SEO', 'Performance Ads', 'Content Strategy', 'Analytics', 'Design Systems'],
    outcomes: [
      { value: 'One', label: 'Coherent brand system' },
      { value: 'Organic', label: 'Search growth that compounds' },
      { value: 'Tracked', label: 'Spend tied to outcomes' },
    ],
    faqs: [
      { q: 'Do you only design, or run campaigns too?', a: 'Both — we cover the full path from brand and site design through to running and tuning paid and organic campaigns.' },
      { q: 'Can you work with our existing brand?', a: 'Yes — we can evolve and systematise what you have rather than starting from scratch.' },
      { q: 'How do you measure success?', a: 'Against outcomes you care about — qualified leads, search visibility, conversion — with attribution set up from day one.' },
    ],
    relatedCase: 'case-studies',
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
    slug: 'web-ecosystem-security',
    title: 'Web Ecosystem & Security',
    short: 'Web & Security',
    tagline: 'Modern web platforms, hardened for the real world.',
    summary: 'Modern web platforms hardened against real-world threats — fast, accessible, and secure by default.',
    overview:
      'A web platform is a front door and an attack surface at the same time. We build fast, accessible sites and applications on a modern stack, then harden them — penetration testing, WAF, and SSL — so performance and security aren’t a trade-off.',
    problems: [
      'Slow, dated sites that lose visitors and rankings',
      'Security handled as an afterthought, if at all',
      'No testing against real-world attack patterns',
      'Platforms that can’t keep up as you grow',
    ],
    process: [
      { step: '01', title: 'Build', desc: 'Fast, accessible front-ends on a modern, maintainable stack.' },
      { step: '02', title: 'Harden', desc: 'SSL, WAF, and secure defaults baked in from the first commit.' },
      { step: '03', title: 'Test', desc: 'Penetration testing against real-world attack patterns before launch.' },
      { step: '04', title: 'Monitor', desc: 'Ongoing scanning and patching so the platform stays secure post-launch.' },
    ],
    deliverables: [
      'Modern web platform (Next.js)',
      'Penetration test & report',
      'SSL / WAF configuration',
      'Performance & accessibility pass',
      'Ongoing security monitoring',
    ],
    stack: ['Next.js', 'Pen Testing', 'SSL / WAF', 'OWASP', 'Performance', 'Accessibility'],
    outcomes: [
      { value: 'Fast', label: 'Core Web Vitals in the green' },
      { value: 'Tested', label: 'Against OWASP threats' },
      { value: 'Secure', label: 'By default, not by patch' },
    ],
    faqs: [
      { q: 'Can you audit our existing site’s security?', a: 'Yes — a standalone penetration test and report is available even if we didn’t build the platform.' },
      { q: 'Why Next.js?', a: 'It gives us speed, SEO, and accessibility out of the box — but we’ll match the stack to your needs where it makes sense.' },
      { q: 'Do you handle ongoing security?', a: 'Yes — continuous scanning, patching, and monitoring are available on retainer.' },
    ],
    relatedCase: 'case-studies',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3L6 7v9c0 6.6 4.4 12.8 10 14 5.6-1.2 10-7.4 10-14V7L16 3z" />
        <polyline points="12,16 15,19 21,13" />
      </svg>
    ),
  },
];

export function getService(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
