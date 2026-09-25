from app.services.ocr_service import extract_text


FILE_PATH = "uploads/BP-F86603CB.jpeg"


try:
    text = extract_text(FILE_PATH)

    print("\n" + "=" * 60)
    print("OCR RESULT")
    print("=" * 60)
    print(text)
    print("=" * 60)

except Exception as e:
    print("\nOCR ERROR:")
    print(e)