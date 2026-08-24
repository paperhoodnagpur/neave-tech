'use client';

import { useEffect } from 'react';

export default function LeadTracking() {
  useEffect(() => {
    if (window.sessionStorage.getItem('neaveLeadSubmitted') !== 'true') return;

    let attempts = 0;
    let timer: number | undefined;
    const trackLead = () => {
      if (typeof (window as any).fbq === 'function') {
        // Remove before tracking so a refresh cannot create another lead.
        window.sessionStorage.removeItem('neaveLeadSubmitted');
        (window as any).fbq('track', 'Lead');
        return;
      }

      attempts += 1;
      if (attempts < 20) timer = window.setTimeout(trackLead, 100);
    };

    trackLead();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return null;
}
