'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AuthModalType = 'login' | 'register' | null;

interface AuthModalContextType {
  isOpen: boolean;
  modalType: AuthModalType;
  openLogin: () => void;
  openRegister: () => void;
  close: () => void;
  switchToLogin: () => void;
  switchToRegister: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<AuthModalType>(null);

  const openLogin = () => {
    setModalType('login');
    setIsOpen(true);
  };

  const openRegister = () => {
    setModalType('register');
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setModalType(null);
  };

  const switchToLogin = () => {
    setModalType('login');
  };

  const switchToRegister = () => {
    setModalType('register');
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        modalType,
        openLogin,
        openRegister,
        close,
        switchToLogin,
        switchToRegister,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
}
