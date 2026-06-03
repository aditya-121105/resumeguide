'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuthModal } from '@/contexts/auth-modal-context'

export function CtaSection() {
  const { openLogin } = useAuthModal()
    return (

    <section className="relative w-full overflow-hidden bg-gradient-to-b from-background to-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            Ready to <span className="text-primary">Transform</span> Your Career?
          </h2>
          <p className="mt-6 text-xl text-foreground/70">
            Get instant AI-powered insights about your resume and receive a personalized career roadmap—completely free.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">


            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                onClick={openLogin}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

          </div>


        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
    </section>
  );
}
