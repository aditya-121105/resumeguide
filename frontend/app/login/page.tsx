'use client';

import { Metadata } from 'next';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';

export default function LoginPage() {
  const { openLogin } = useAuthModal();

  useEffect(() => {
    openLogin();
  }, [openLogin]);

  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
