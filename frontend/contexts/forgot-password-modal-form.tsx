'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthModal } from '@/contexts/auth-modal-context';

export function ForgotPasswordModalForm() {

  const { switchToLogin } =
    useAuthModal();
  const [showResetScreen,
  setShowResetScreen] =
  useState(false);
  const [newPassword, setNewPassword] =
  useState('');

const [confirmPassword, setConfirmPassword] =
  useState('');

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');

  const [identifier, setIdentifier] =
    useState('');

  const [error, setError] =
    useState('');
  const [successMessage, setSuccessMessage] =
  useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  const [showOtpScreen,
    setShowOtpScreen] =
    useState(false);
  const handleResetPassword =
  async () => {

    setError('');

    if (
      newPassword !==
      confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;
    }

    try {

      const response =
        await fetch(
          "http://127.0.0.1:8000/api/v1/auth/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              new_password:
                newPassword,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail
        );
      }

      setSuccessMessage(
  "Password reset successfully! Redirecting to login..."
);

setTimeout(() => {
  switchToLogin();
}, 2000);

    } catch (err: any) {

      setError(
        err.message
      );
    }
  };
  const handleVerifyOtp =
  async () => {

    try {

      const response =
        await fetch(
          "http://127.0.0.1:8000/api/v1/auth/verify-reset-otp",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              otp,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail
        );
      }
      console.log("OTP verified successfully");
      setShowResetScreen(true);

    } catch (err: any) {

      setError(
        err.message
      );
    }
  };
  const handleSendOtp =
    async () => {

      setError('');

      try {

        setIsLoading(true);

        const response =
          await fetch(
            "http://127.0.0.1:8000/api/v1/auth/forgot-password",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                identifier,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.detail ||
            "Failed to send OTP"
          );
        }
        setEmail(data.email);

        setShowOtpScreen(true);
        if (identifier.includes("@")) {
                setEmail(identifier);
        }

      } catch (err: any) {

        setError(
          err.message
        );

      } finally {

        setIsLoading(false);
      }
    };
  if (showResetScreen) {

  return (
    <div>

      <h1 className="text-2xl font-bold text-center">
        Reset Password
      </h1>

      <p className="text-center text-sm text-muted-foreground mt-2 mb-6">
        Enter your new password
      </p>
        {successMessage && (
  <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
    {successMessage}
  </div>
)}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(
            e.target.value
          )
        }
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
        className="mt-4"
      />

      <Button
        className="w-full mt-4"
        onClick={
          handleResetPassword
        }
      >
        Reset Password
      </Button>

    </div>
  );
}

  if (showOtpScreen) {

    return (
          <div>

            <h1 className="text-2xl font-bold text-center">
              Verify OTP
            </h1>

            <p className="text-center text-sm text-muted-foreground mt-2 mb-6">
              Enter the OTP sent to your email
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
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
    <div>

      <h1 className="text-2xl font-bold text-center">
        Forgot Password
      </h1>

      <p className="text-center text-sm text-muted-foreground mt-2 mb-6">
        Enter your username or email
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        placeholder="Username or Email"
        value={identifier}
        onChange={(e) =>
          setIdentifier(
            e.target.value
          )
        }
      />

      <Button
        className="w-full mt-4"
        onClick={handleSendOtp}
        disabled={isLoading}
      >
        {isLoading
          ? "Sending..."
          : "Send OTP"}
      </Button>

      <button
        className="w-full mt-4 text-sm text-primary"
        onClick={switchToLogin}
      >
        Back to Login
      </button>

    </div>
  );
}