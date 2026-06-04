import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.core.config import settings


def send_otp_email(
    to_email: str,
    otp: str
):

    subject = "ResumeGuide Email Verification OTP"

    body = f"""
Your ResumeGuide OTP is:

{otp}

This OTP will expire in 5 minutes.
"""

    message = MIMEMultipart()

    message["From"] = settings.SMTP_EMAIL
    message["To"] = to_email
    message["Subject"] = subject

    message.attach(
        MIMEText(body, "plain")
    )

    with smtplib.SMTP(
        "smtp.gmail.com",
        587
    ) as server:

        server.starttls()

        server.login(
            settings.SMTP_EMAIL,
            settings.SMTP_PASSWORD
        )

        server.sendmail(
            settings.SMTP_EMAIL,
            to_email,
            message.as_string()
        )