import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { Space_Mono, Bricolage_Grotesque, DM_Sans, Poppins } from 'next/font/google';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Loader from '@/components/Loader';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

// Clash Display stand-in — swap with self-hosted Fontshare files later.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Satoshi stand-in — swap with self-hosted Fontshare files later.
const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neavetechnologies.com'),
  title: {
    default: 'NeaveTech — Enterprise & Government IT Solutions',
    template: '%s · NeaveTech',
  },
  description:
    'NeaveTech builds scalable IT systems for government and enterprise. Custom ERP, IoT, blockchain, cloud, and digital infrastructure engineered in Nagpur, India.',
  keywords: [
    'NeaveTech',
    'Government IT',
    'Enterprise ERP',
    'IoT Solutions',
    'Nagpur software company',
    'Custom ERP',
    'Blockchain',
    'Digital transformation',
  ],
  authors: [{ name: 'NeaveTech' }],
  openGraph: {
    title: 'NeaveTech — Enterprise & Government IT Solutions',
    description:
      'Scalable IT systems for government & enterprise. ERP, IoT, Cloud, AI, Blockchain.',
    url: 'https://neavetechnologies.com',
    siteName: 'NeaveTech',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeaveTech — Enterprise & Government IT Solutions',
    description:
      'Scalable IT systems for government & enterprise. ERP, IoT, Cloud, AI, Blockchain.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.neave.tech',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F9F7' },
    { media: '(prefers-color-scheme: dark)', color: '#090C0A' },
  ],
};

// Runs before paint to apply the saved/system theme and avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ========== CHANGE 1: JSON-LD Structured Data (Organization + LocalBusiness) ==========
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.neave.tech/#organization",
        "name": "NeaveTech",
        "alternateName": ["Neave Tech", "Neave Corporation Pvt. Ltd."],
        "url": "https://www.neave.tech",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.neave.tech/logo.png"
        },
        "email": "mail@neave.tech",
        "telephone": "+91-9284755883",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nagpur",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "description": "NeaveTech builds scalable IT systems for government and enterprise. Custom ERP, IoT, blockchain, cloud, and digital infrastructure engineered in Nagpur, India.",
        "foundingDate": "2023",
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "knowsAbout": [
          "Custom ERP Development",
          "IoT Solutions",
          "Government IT Systems",
          "Cloud Solutions",
          "Blockchain",
          "AI & Automation",
          "Digital Transformation"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.neave.tech/#localbusiness",
        "name": "NeaveTech",
        "image": "https://www.neave.tech/logo.png",
        "url": "https://www.neave.tech",
        "telephone": "+91-9284755883",
        "email": "mail@neave.tech",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nagpur",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "priceRange": "$$",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "10:30",
            "closes": "18:30"
          }
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "ISO Certification"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "MSME Registration"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "MahaIT Empanelment"
          }
        ]
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${spaceMono.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      {/* ========== CHANGE 2: <head> mein schema inject ========== */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-ink">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Apollo Website Tracker */}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`
            function initApollo(){
              var n=Math.random().toString(36).substring(7),
              o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,
              o.async=!0,
              o.defer=!0,
              o.onload=function(){
                window.trackingFunctions.onLoad({appId:"6a7ad137974f74000c611cb7"})
              },
              document.head.appendChild(o)
            }
            initApollo();
          `}
        </Script>

        {/* Meta Pixel base code — fires PageView on every page */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            if (!window.__neaveMetaPageViewTracked) {
              fbq('init', '1396716755074216');
              fbq('track', 'PageView');
              window.__neaveMetaPageViewTracked = true;
            }
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1396716755074216&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Loader />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}