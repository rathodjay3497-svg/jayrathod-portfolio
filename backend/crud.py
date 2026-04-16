from sqlalchemy.orm import Session
from models import ContactMessage
from schemas import ContactMessageCreate


def create_message(db: Session, data: ContactMessageCreate) -> ContactMessage:
    db_message = ContactMessage(
        name=data.name,
        email=data.email,
        message=data.message,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def get_messages(db: Session, skip: int = 0, limit: int = 100) -> list[ContactMessage]:
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()
