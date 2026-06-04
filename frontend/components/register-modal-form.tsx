'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail, User, Chrome, Eye, EyeOff } from 'lucide-react';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { useRouter } from 'next/navigation';
import {
  GoogleLogin
} from "@react-oauth/google";

export function RegisterModalForm() {
  const router = useRouter();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { switchToLogin } = useAuthModal();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleVerifyOtp = async () => {
      setError("");
      try {

        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/auth/verify-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              otp,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || data.message || "OTP verification failed"
          );
        }

        setSuccessMessage(
          "Email verified successfully! Redirecting to login..."
        );

        setTimeout(() => {
          switchToLogin();
        }, 1500);

      } catch (err: any) {

        setError(
          err.message || "Invalid OTP"
        );
      }
    };
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
const validateUsername = (value: string) => {
  if (!value) {
    setUsernameError('Username is required');
    return false;
  }

  if (value.length < 3) {
    setUsernameError('Username must be at least 3 characters');
    return false;
  }

  setUsernameError('');
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
    const isUsernameValid = validateUsername(username);

if (
  !isNameValid ||
  !isUsernameValid ||
  !isEmailValid ||
  !isPasswordValid ||
  !isConfirmPasswordValid
) {
  return;
}
    setIsLoading(true);

try {
  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        username: username,
        password: password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || data.message || "Failed to create account"
    );
  }

  setShowOtpForm(true);
  setError("");
} catch (err: any) {
  setError(
    err.message || "Failed to create account. Please try again."
  );
} finally {
  setIsLoading(false);
}
  };
  if (showOtpForm) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-4">
          Verify Email
        </h2>

        <p className="text-center text-sm text-muted-foreground mb-6">
          Enter the OTP sent to {email}
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
            {successMessage}
          </div>
        )}

        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <Button
          className="w-full mt-4"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </Button>
      </div>
    );
  }

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
      <GoogleLogin
  onSuccess={async (credentialResponse) => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id_token:
              credentialResponse.credential,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
          "Google login failed"
        );
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "token_type",
        data.token_type
      );
      close();

      router.push("/dashboard");

    } catch (err: any) {

      setError(
        err.message ||
        "Google login failed"
      );
    }
  }}

  onError={() => {
    setError(
      "Google login failed"
    );
  }}
/>

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
        {/*UserName*/}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Username
          </label>

          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />

            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 border-border bg-background focus:border-primary focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>
          {usernameError && (
            <p className="mt-1 text-xs text-red-600">
              {usernameError}
            </p>
          )}
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
