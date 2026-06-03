import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { TrustSection } from '@/components/trust-section';
import { FeaturesSection } from '@/components/features-section';
import { HowItWorks } from '@/components/how-it-works';
import { DashboardShowcase } from '@/components/dashboard-showcase';
import { CtaSection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Page() {
  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
<ScrollReveal>
  <TrustSection />
</ScrollReveal>

<ScrollReveal>
  <FeaturesSection />
</ScrollReveal>

<ScrollReveal>
  <HowItWorks />
</ScrollReveal>

<ScrollReveal>
  <DashboardShowcase />
</ScrollReveal>

<ScrollReveal>
  <CtaSection />
</ScrollReveal>
      <Footer />
    </main>
  );
}
