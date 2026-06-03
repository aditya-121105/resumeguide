'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, MapPin, Link as LinkIcon } from 'lucide-react';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="mt-2 text-foreground/60">
            Manage your personal information and preferences
          </p>
        </motion.div>

        {/* Profile Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">Sarah Johnson</h2>
                <p className="text-foreground/60 mt-1">Senior Frontend Engineer</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary">React Specialist</Badge>
                  <Badge variant="secondary">Tech Lead</Badge>
                  <Badge variant="secondary">Open to Opportunities</Badge>
                </div>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Edit Profile
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email
            </h3>
            <p className="text-foreground/80">sarah.johnson@example.com</p>
            <Button variant="ghost" size="sm" className="mt-4 text-primary">
              Change Email
            </Button>
          </Card>

          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location
            </h3>
            <p className="text-foreground/80">San Francisco, California</p>
            <Button variant="ghost" size="sm" className="mt-4 text-primary">
              Update Location
            </Button>
          </Card>

          <Card className="border-border bg-card p-6 md:col-span-2">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              Social & Portfolio Links
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-foreground/60">GitHub</p>
                <a
                  href="#"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  github.com/sarahjohnson
                </a>
              </div>
              <div>
                <p className="text-sm text-foreground/60">LinkedIn</p>
                <a
                  href="#"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  linkedin.com/in/sarahjohnson
                </a>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Portfolio</p>
                <a
                  href="#"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  sarahjohnson.dev
                </a>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-4 text-primary">
              Manage Links
            </Button>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div variants={itemVariants}>
          <Card className="border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-foreground/60">Receive updates on job matches and insights</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Weekly Summary</p>
                  <p className="text-xs text-foreground/60">Get weekly career progress updates</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Public Profile</p>
                  <p className="text-xs text-foreground/60">Allow others to view your profile</p>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
