from io import BytesIO
import pdfplumber


def extract_text_from_pdf(
    pdf_bytes: bytes
):

    extracted_text = ""

    with pdfplumber.open(
        BytesIO(pdf_bytes)
    ) as pdf:

        for page in pdf.pages:

            text = page.extract_text()

            if text:

                extracted_text += (
                    text + "\n"
                )

    return extracted_text