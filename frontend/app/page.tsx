import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { TrustSection } from '@/components/trust-section';
import { FeaturesSection } from '@/components/features-section';
import { HowItWorks } from '@/components/how-it-works';
import { DashboardShowcase } from '@/components/dashboard-showcase';
import { CtaSection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default function Page() {
  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <HowItWorks />
      <DashboardShowcase />
      <CtaSection />
      <Footer />
    </main>
  );
}
