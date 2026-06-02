'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthModal } from '@/contexts/auth-modal-context';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openLogin } = useAuthModal();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">RG</span>
            </div>
            <span className="text-xl font-bold text-foreground">ResumeGuide</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-foreground/70 transition hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground/70 transition hover:text-foreground">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-foreground/70 transition hover:text-foreground">
              Pricing
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden gap-4 md:flex md:items-center">
            <Button variant="ghost" size="sm" onClick={openLogin}>
              Login
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Free Analysis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border bg-background pb-4 md:hidden">
            <div className="flex flex-col gap-4 px-2 py-4">
              <a href="#features" className="text-sm font-medium text-foreground/70">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-foreground/70">
                How It Works
              </a>
              <a href="#pricing" className="text-sm font-medium text-foreground/70">
                Pricing
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    openLogin();
                    setIsOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Free Analysis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
