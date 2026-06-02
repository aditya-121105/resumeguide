'use client';

import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">RG</span>
              </div>
              <span className="text-lg font-bold text-foreground">ResumeGuide</span>
            </div>
            <p className="text-sm text-foreground/60">
              AI-powered career intelligence platform for job seekers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/60">
            © 2024 ResumeGuide. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition">
              Twitter
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
