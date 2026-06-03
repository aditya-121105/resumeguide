'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Bell, Palette, Shield, Trash2 } from 'lucide-react';

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

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <motion.div variants={pageVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-foreground/60">
            Manage your account preferences and security settings
          </p>
        </motion.div>

        {/* Account Security */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Account Security
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Password</p>
                  <p className="text-xs text-foreground/60">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-foreground/60">Not enabled</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Active Sessions</p>
                  <p className="text-xs text-foreground/60">1 active session</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Job Match Alerts</p>
                  <p className="text-xs text-foreground/60">Get notified when matching roles are found</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Skill Updates</p>
                  <p className="text-xs text-foreground/60">Updates on skill recommendations</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Marketing Emails</p>
                  <p className="text-xs text-foreground/60">News and product announcements</p>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Appearance
            </h2>
            <div className="space-y-4">
              <div className="py-3">
                <p className="text-sm font-medium text-foreground mb-3">Theme</p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-foreground/10">
                    Light
                  </Button>
                  <Button variant="outline" size="sm">
                    Dark
                  </Button>
                  <Button variant="outline" size="sm">
                    Auto
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Privacy & Data */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy & Data
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Data Export</p>
                  <p className="text-xs text-foreground/60">Download your personal data</p>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Privacy Policy</p>
                  <p className="text-xs text-foreground/60">Review our privacy policy</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  Read
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={itemVariants}>
          <Card className="border-red-500/20 bg-red-500/5 p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div className="py-3 border-b border-red-500/20">
                <p className="text-sm font-medium text-foreground">Delete Account</p>
                <p className="text-xs text-foreground/60 mt-1">Permanently delete your account and all data</p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
