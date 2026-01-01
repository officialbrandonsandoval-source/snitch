import base64
import os
from datetime import datetime, timezone
from uuid import uuid4


class EvidenceService:
    STORAGE_DIR = "local_uploads"

    @classmethod
    def _ensure_storage_dir(cls) -> str:
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
        storage_path = os.path.join(base_dir, cls.STORAGE_DIR)
        os.makedirs(storage_path, exist_ok=True)
        return storage_path

    @classmethod
    async def save_bytes(cls, data: bytes, filename: str) -> dict:
        storage_path = cls._ensure_storage_dir()
        safe_name = filename or "upload.bin"
        record_id = f"ev_{uuid4().hex}"
        file_path = os.path.join(storage_path, f"{record_id}_{safe_name}")
        with open(file_path, "wb") as handle:
            handle.write(data)

        return {
            "id": record_id,
            "filename": safe_name,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

    @classmethod
    async def save_base64(cls, payload: str, filename: str) -> dict:
        try:
            data = base64.b64decode(payload, validate=True)
        except Exception as exc:
            raise ValueError("invalid base64 payload") from exc
        return await cls.save_bytes(data, filename)
