import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Capabilities from '@/components/sections/Capabilities';
import CaseStudies from '@/components/sections/CaseStudies';
import Services from '@/components/sections/Services';
import WhyUs from '@/components/sections/WhyUs';
import Founder from '@/components/sections/Founder';
import Clients from '@/components/sections/Clients';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Capabilities />
      <CaseStudies />
      <Services />
      <WhyUs />
      <Founder />
      <Clients />
      <CTA />
      <Footer />
    </main>
  );
}
