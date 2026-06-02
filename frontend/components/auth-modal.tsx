'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { LoginModalForm } from './login-modal-form';
import { RegisterModalForm } from './register-modal-form';
import { X } from 'lucide-react';

export function AuthModal() {
  const { isOpen, modalType, close } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-h-[90vh] w-full max-w-md overflow-y-auto border-border bg-background p-0 sm:rounded-2xl">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-foreground/60 hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {modalType === 'login' && <LoginModalForm />}
          {modalType === 'register' && <RegisterModalForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
