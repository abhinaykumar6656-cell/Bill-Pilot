from pathlib import Path

import pytesseract
from PIL import Image


def extract_text_from_image(file_path: str) -> str:
    """
    Extract text from an image using Tesseract OCR.
    """

    image = Image.open(file_path)

    try:
        text = pytesseract.image_to_string(image)
        return text.strip()
    finally:
        image.close()


def extract_text(file_path: str) -> str:
    """
    Extract text from a supported bill file.
    """

    extension = Path(file_path).suffix.lower()

    if extension in {".jpg", ".jpeg", ".png"}:
        return extract_text_from_image(file_path)

    raise ValueError(
        f"Unsupported file type: {extension}"
    )