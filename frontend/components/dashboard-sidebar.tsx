'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Home, Briefcase, MapPin, Settings, LogOut, Menu, X, FileText, GraduationCap, TrendingUp, Zap, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    { href: '/dashboard/resume-analysis', label: 'Resume Analysis', icon: FileText },
    { href: '/dashboard/skill-gap', label: 'Skill Gap Analysis', icon: Zap },
    { href: '/dashboard/target-roles', label: 'Target Roles', icon: Briefcase },
    { href: '/dashboard/career-roadmap', label: 'Career Roadmap', icon: MapPin },
    { href: '/dashboard/projects', label: 'Projects', icon: TrendingUp },
    { href: '/dashboard/certifications', label: 'Certifications', icon: GraduationCap },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r border-border bg-card md:flex flex-col">
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

        {/* Footer */}
        <div className="border-t border-border px-3 py-4 space-y-2">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive('/dashboard/settings')
                ? 'bg-primary/10 text-primary'
                : 'text-foreground/70 hover:bg-background hover:text-foreground'
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-foreground/70 hover:text-foreground"
            size="sm"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
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

          <div className="border-t border-border px-3 py-4 space-y-2">
            <Link
              href="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-foreground/70 hover:bg-background hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground/70 hover:text-foreground"
              size="sm"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </aside>
      )}
    </>
  );
}
