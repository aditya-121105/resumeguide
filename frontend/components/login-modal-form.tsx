'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Mail, Chrome } from 'lucide-react';
import { useAuthModal } from '@/contexts/auth-modal-context';

export function LoginModalForm() {
  const { switchToRegister } = useAuthModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('[v0] Login attempt:', { email, rememberMe });
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">RG</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
        <p className="mt-1 text-sm text-foreground/60">Sign in to your ResumeGuide account</p>
      </div>

      {/* Google Sign In */}
      <Button
        onClick={() => console.log('[v0] Google OAuth clicked')}
        variant="outline"
        className="w-full mb-4 border-border bg-background hover:bg-muted"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-foreground/50">or continue with email</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              className="pl-10 border-border bg-background focus:border-primary focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>
          {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              className="pl-10 border-border bg-background focus:border-primary focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>
          {passwordError && <p className="mt-1 text-xs text-red-600">{passwordError}</p>}
        </div>

        {/* Remember & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={rememberMe} onCheckedChange={setRememberMe} disabled={isLoading} />
            <span className="text-foreground/70">Remember me</span>
          </label>
          <a href="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            Forgot password?
          </a>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-6 text-center text-sm text-foreground/60">
        Don&apos;t have an account?{' '}
        <button
          onClick={switchToRegister}
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
