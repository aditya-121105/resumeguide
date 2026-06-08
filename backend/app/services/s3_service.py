import boto3

BUCKET_NAME = (
    "amzn-s3-resume-guide-bucket"
)

s3_client = boto3.client("s3")


def upload_file_to_s3(
    file_obj,
    s3_key
):
    s3_client.upload_fileobj(
        file_obj,
        BUCKET_NAME,
        s3_key
    )

    return s3_key