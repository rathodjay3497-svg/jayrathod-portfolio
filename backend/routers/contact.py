from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas import ContactMessageCreate, ContactMessageResponse
import crud

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(payload: ContactMessageCreate, db: Session = Depends(get_db)):
    try:
        message = crud.create_message(db, payload)
        return message
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save your message. Please try again.",
        )


@router.get("", response_model=list[ContactMessageResponse])
def list_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_messages(db, skip=skip, limit=limit)
