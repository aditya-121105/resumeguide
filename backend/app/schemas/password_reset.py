from pydantic import BaseModel


class ForgotPasswordRequest(
    BaseModel
):
    identifier: str


class VerifyResetOTPRequest(
    BaseModel
):
    email: str
    otp: str


class ResetPasswordRequest(
    BaseModel
):
    email: str
    new_password: str