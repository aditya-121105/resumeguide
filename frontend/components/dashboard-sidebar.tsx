'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Menu,
  X,
  FileText,
  PlusCircle,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/dashboard/analyses',
    label: 'Analyses',
    icon: BarChart3,
  },
  {
    href: '/dashboard/resumes',
    label: 'Resumes',
    icon: FileText,
  },
  {
    href: '/dashboard/analyses/new',
    label: 'New Analysis',
    icon: PlusCircle,
  },
];
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
  className="
    fixed
    left-0
    top-0
    hidden
    h-screen
    w-64
    border-r
    border-border
    bg-card
    md:flex
    flex-col
    z-30
  "
>
        {/* Logo */}
        <div className="border-b border-border px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">RG</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/70 hover:bg-background hover:text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>


      </aside>

      {/* Mobile Menu Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <aside className="fixed inset-0 z-30 w-64 border-r border-border bg-card md:hidden flex flex-col pt-20">
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-background hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>


        </aside>
      )}
    </>
  );
}
