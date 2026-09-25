from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BillUploadResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    success: bool

    bill_id: str

    filename: str

    status: str

    message: str

    created_at: datetime

    ocr_text_length: int