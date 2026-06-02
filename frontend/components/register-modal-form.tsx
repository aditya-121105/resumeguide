'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail, User, Chrome, Eye, EyeOff } from 'lucide-react';
import { useAuthModal } from '@/contexts/auth-modal-context';

export function RegisterModalForm() {
  const { switchToLogin } = useAuthModal();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const calculatePasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (!pwd) return { score: 0, label: '', color: '' };
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 2) return { score, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 3) return { score, label: 'Good', color: 'bg-blue-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = calculatePasswordStrength(password);

  const validateName = (value: string) => {
    if (!value) {
      setNameError('Full name is required');
      return false;
    }
    if (value.trim().length < 2) {
      setNameError('Full name must be at least 2 characters');
      return false;
    }
    setNameError('');
    return true;
  };

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
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      setConfirmPasswordError('Please confirm your password');
      return false;
    }
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    if (nameError) {
      validateName(value);
    }
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

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (confirmPasswordError && password) {
      validateConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const isNameValid = validateName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('[v0] Registration attempt:', { fullName, email });
    } catch (err) {
      setError('Failed to create account. Please try again.');
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
        <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
        <p className="mt-1 text-sm text-foreground/60">Join thousands building better careers with ResumeGuide</p>
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
        {/* Full Name Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
            <Input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={handleNameChange}
              className="pl-10 border-border bg-background focus:border-primary focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>
          {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
        </div>

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
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              className="pl-10 pr-10 border-border bg-background focus:border-primary focus:ring-primary/20"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-foreground/40 hover:text-foreground/60 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {password && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < passwordStrength.score ? passwordStrength.color : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs font-medium ${
                passwordStrength.label === 'Weak' ? 'text-red-600' :
                passwordStrength.label === 'Fair' ? 'text-yellow-600' :
                passwordStrength.label === 'Good' ? 'text-blue-600' :
                'text-green-600'
              }`}>
                Password strength: {passwordStrength.label}
              </p>
            </div>
          )}
          {passwordError && <p className="mt-1 text-xs text-red-600">{passwordError}</p>}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="pl-10 pr-10 border-border bg-background focus:border-primary focus:ring-primary/20"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-foreground/40 hover:text-foreground/60 transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {confirmPasswordError && <p className="mt-1 text-xs text-red-600">{confirmPasswordError}</p>}
        </div>

        {/* Create Account Button */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      {/* Already have account Link */}
      <p className="mt-6 text-center text-sm text-foreground/60">
        Already have an account?{' '}
        <button
          onClick={switchToLogin}
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
