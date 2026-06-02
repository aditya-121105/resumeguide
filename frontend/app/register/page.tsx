'use client';

import { useAuthModal } from '@/contexts/auth-modal-context';
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';

export default function RegisterPage() {
  const { openRegister } = useAuthModal();

  useEffect(() => {
    openRegister();
  }, [openRegister]);

  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
