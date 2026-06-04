'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { LoginModalForm } from './login-modal-form';
import { RegisterModalForm } from './register-modal-form';
import { X } from 'lucide-react';
import { ForgotPasswordModalForm }  from '@/contexts/forgot-password-modal-form';
export function AuthModal() {
  const { isOpen, modalType, close } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-h-[90vh] w-full max-w-md overflow-y-auto border-border bg-background p-0 sm:rounded-2xl">


        {/* Content */}
        <div className="p-8">
          {modalType === 'login' && <LoginModalForm />}
            {modalType === 'forgot-password' &&
  <ForgotPasswordModalForm />
}
          {modalType === 'register' && <RegisterModalForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
