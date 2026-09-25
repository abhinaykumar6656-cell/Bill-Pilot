from pathlib import Path

import pytesseract
from PIL import Image
from pypdf import PdfReader


def extract_text_from_image(file_path: str) -> str:
    """
    Extract text from JPG, JPEG or PNG using Tesseract.
    """

    image = Image.open(file_path)

    try:
        text = pytesseract.image_to_string(image)

        return text.strip()

    finally:
        image.close()


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract embedded text from a PDF.

    Scanned PDF OCR will be added later.
    """

    reader = PdfReader(file_path)

    pages = []

    for page in reader.pages:

        text = page.extract_text() or ""

        if text.strip():
            pages.append(text)

    return "\n".join(pages).strip()


def extract_text(file_path: str) -> str:
    """
    Select the appropriate extraction method.
    """

    extension = Path(
        file_path
    ).suffix.lower()

    if extension in {
        ".jpg",
        ".jpeg",
        ".png",
    }:
        return extract_text_from_image(
            file_path
        )

    if extension == ".pdf":
        return extract_text_from_pdf(
            file_path
        )

    raise ValueError(
        f"Unsupported file type: {extension}"
    )