from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from app.services.evidence_service import EvidenceService

router = APIRouter()


@router.post("/")
async def upload_evidence(
    file: UploadFile | None = File(default=None),
    base64_payload: str | None = Form(default=None),
    filename: str | None = Form(default=None)
):
    if file is None and base64_payload is None:
        raise HTTPException(status_code=400, detail="file or base64_payload required")

    if file is not None:
        data = await file.read()
        saved = await EvidenceService.save_bytes(data, filename or file.filename or "upload.bin")
        return saved

    try:
        saved = await EvidenceService.save_base64(base64_payload or "", filename or "upload.bin")
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return saved
