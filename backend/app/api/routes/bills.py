from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.bill import Bill
from app.schemas.bill import BillUploadResponse
from app.services.ocr_service import extract_text


router = APIRouter(
    prefix="/bills",
    tags=["Bills"],
)


# ---------------------------------------------------------
# Configuration
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[3]

UPLOAD_DIR = BASE_DIR / "uploads"

UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


ALLOWED_EXTENSIONS = {
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
}


ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png",
}


MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


# ---------------------------------------------------------
# Upload Bill
# ---------------------------------------------------------

@router.post(
    "/upload",
    response_model=BillUploadResponse,
)
async def upload_bill(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a utility bill.

    Flow:

    User
      ↓
    Upload file
      ↓
    Validate file
      ↓
    Save file
      ↓
    OCR
      ↓
    Store bill + OCR text
      ↓
    Return Bill ID
    """

    # -----------------------------------------------------
    # 1. Validate filename
    # -----------------------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No filename provided.",
        )

    original_filename = Path(file.filename).name

    # -----------------------------------------------------
    # 2. Validate extension
    # -----------------------------------------------------

    extension = Path(original_filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported file type. "
                "Please upload PDF, JPG, JPEG or PNG."
            ),
        )

    # -----------------------------------------------------
    # 3. Validate MIME type
    # -----------------------------------------------------

    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported content type.",
        )

    # -----------------------------------------------------
    # 4. Generate unique Bill ID
    # -----------------------------------------------------

    bill_id = f"BP-{uuid4().hex[:8].upper()}"

    # Example:
    # BP-A81F32CD

    safe_filename = f"{bill_id}{extension}"

    destination = UPLOAD_DIR / safe_filename

    # -----------------------------------------------------
    # 5. Save uploaded file
    # -----------------------------------------------------

    total_size = 0

    try:
        with destination.open("wb") as output:

            while True:

                chunk = await file.read(
                    1024 * 1024
                )

                if not chunk:
                    break

                total_size += len(chunk)

                # 10 MB protection
                if total_size > MAX_FILE_SIZE:

                    destination.unlink(
                        missing_ok=True
                    )

                    raise HTTPException(
                        status_code=413,
                        detail=(
                            "File is too large. "
                            "Maximum allowed size is 10 MB."
                        ),
                    )

                output.write(chunk)

    except HTTPException:
        raise

    except Exception as exc:

        destination.unlink(
            missing_ok=True
        )

        raise HTTPException(
            status_code=500,
            detail=(
                f"Could not save uploaded file: {exc}"
            ),
        ) from exc

    # -----------------------------------------------------
    # 6. Run OCR
    # -----------------------------------------------------

    raw_text = ""

    try:

        raw_text = extract_text(
            str(destination)
        )

    except Exception as exc:

        # We don't delete the bill.
        # The file is still useful and can be
        # processed again later.

        print(
            f"OCR failed for {bill_id}: {exc}"
        )

    # -----------------------------------------------------
    # 7. Determine processing status
    # -----------------------------------------------------

    if raw_text.strip():

        status = "ocr_completed"

    else:

        status = "ocr_failed"

    # -----------------------------------------------------
    # 8. Create database record
    # -----------------------------------------------------

    bill = Bill(
        bill_id=bill_id,
        filename=original_filename,
        content_type=file.content_type,
        file_path=str(destination),
        utility_type=None,
        status=status,
        raw_text=raw_text,
    )

    try:

        db.add(bill)

        db.commit()

        db.refresh(bill)

    except Exception as exc:

        db.rollback()

        # If database insertion fails,
        # remove the uploaded file.

        destination.unlink(
            missing_ok=True
        )

        raise HTTPException(
            status_code=500,
            detail=(
                f"Could not save bill record: {exc}"
            ),
        ) from exc

    # -----------------------------------------------------
    # 9. Return response
    # -----------------------------------------------------

    return BillUploadResponse(
        success=True,
        bill_id=bill.bill_id,
        filename=bill.filename,
        status=bill.status,
        message=(
            "Bill uploaded and processed successfully."
            if raw_text.strip()
            else
            "Bill uploaded successfully, "
            "but OCR could not extract text."
        ),
        created_at=bill.created_at,
        ocr_text_length=len(raw_text),
    )


# ---------------------------------------------------------
# Get OCR Result
# ---------------------------------------------------------

@router.get(
    "/{bill_id}/ocr",
)
def get_ocr_text(
    bill_id: str,
    db: Session = Depends(get_db),
):
    """
    Return the raw OCR text for a bill.
    """

    bill = (
        db.query(Bill)
        .filter(
            Bill.bill_id == bill_id
        )
        .first()
    )

    if not bill:

        raise HTTPException(
            status_code=404,
            detail="Bill not found.",
        )

    return {
        "bill_id": bill.bill_id,
        "filename": bill.filename,
        "status": bill.status,
        "ocr_text": bill.raw_text or "",
        "ocr_text_length": len(
            bill.raw_text or ""
        ),
    }


# ---------------------------------------------------------
# Get Bill Details
# ---------------------------------------------------------

@router.get(
    "/{bill_id}",
)
def get_bill(
    bill_id: str,
    db: Session = Depends(get_db),
):
    """
    Return basic information about a bill.
    """

    bill = (
        db.query(Bill)
        .filter(
            Bill.bill_id == bill_id
        )
        .first()
    )

    if not bill:

        raise HTTPException(
            status_code=404,
            detail="Bill not found.",
        )

    return {
        "bill_id": bill.bill_id,
        "filename": bill.filename,
        "content_type": bill.content_type,
        "utility_type": bill.utility_type,
        "status": bill.status,
        "created_at": bill.created_at,
    }