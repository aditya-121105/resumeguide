'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, User, Chrome } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthModal } from '@/contexts/auth-modal-context';
import { GoogleLogin } from "@react-oauth/google";
export function LoginModalForm() {
  const { switchToRegister, close } = useAuthModal();
  const router = useRouter();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

const validateusername = (value: string) => {
  if (!value) {
    setusernameError('username is required');
    return false;
  }

  if (value.length < 3) {
    setusernameError('username must be at least 3 characters');
    return false;
  }

  setusernameError('');
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

  const handleusernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setusername(value);
    if (usernameError) {
      validateusername(value);
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

    const isusernameValid = validateusername(username);
    const isPasswordValid = validatePassword(password);

    if (!isusernameValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

        try {
          const formData = new URLSearchParams();

          formData.append("username", username);
          formData.append("password", password);

          const response = await fetch(
            "http://127.0.0.1:8000/api/v1/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded",
              },
              body: formData,
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.detail || "Invalid credentials"
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
            err.message || "Failed to sign in"
          );
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
      <div className="mb-4 flex justify-center">
  <GoogleLogin
    onSuccess={async (
      credentialResponse
    ) => {

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

        router.push(
          "/dashboard"
        );

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
</div>

      {/* Divider */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-foreground/50">or continue with username</span>
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
        {/* username Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleusernameChange}
              className="pl-10 border-border bg-background focus:border-primary focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>
          {usernameError && <p className="mt-1 text-xs text-red-600">{usernameError}</p>}
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
