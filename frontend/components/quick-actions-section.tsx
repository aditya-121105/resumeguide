'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuickAction } from '@/types/dashboard';
import * as Icons from 'lucide-react';

interface QuickActionsSectionProps {
  actions: QuickAction[];
  onUploadClick?: () => void;
}

export function QuickActionsSection({ actions, onUploadClick }: QuickActionsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      Upload: Icons.Upload,
      Briefcase: Icons.Briefcase,
      MapPin: Icons.MapPin,
      BarChart3: Icons.BarChart3,
    };
    return iconMap[iconName] || Icons.ArrowRight;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Get started with your career development
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action, index) => {
          const IconComponent = getIcon(action.icon);

          return (
            <motion.div
              key={action.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (action.title === 'Upload Resume' && onUploadClick) {
                  onUploadClick();
                }
              }}
            >
              <Card className="relative h-full overflow-hidden border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full gap-4">
                  {/* Icon */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title and Description */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/60">{action.description}</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-0 text-primary hover:bg-transparent hover:text-primary/80"
                  >
                    <span className="text-sm font-medium">Get Started</span>
                    <Icons.ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
