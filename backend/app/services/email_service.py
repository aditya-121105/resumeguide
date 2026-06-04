import boto3

from app.core.config import settings


ses_client = boto3.client(
    "ses",
    region_name=settings.AWS_REGION,
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
)


def send_test_email(
    to_email: str
):

    response = ses_client.send_email(
        Source=settings.SES_FROM_EMAIL,
        Destination={
            "ToAddresses": [
                to_email
            ]
        },
        Message={
            "Subject": {
                "Data": "ResumeGuide SES Test"
            },
            "Body": {
                "Text": {
                    "Data":
                    "AWS SES is working successfully."
                }
            }
        }
    )

    return response

def send_otp_email(
    to_email: str,
    otp: str
):

    response = ses_client.send_email(
        Source=settings.SES_FROM_EMAIL,
        Destination={
            "ToAddresses": [to_email]
        },
        Message={
            "Subject": {
                "Data": "ResumeGuide Email Verification OTP"
            },
            "Body": {
                "Text": {
                    "Data": (
                        f"Your ResumeGuide OTP is: {otp}\n\n"
                        "This OTP will expire in 5 minutes."
                    )
                }
            }
        }
    )

    return response