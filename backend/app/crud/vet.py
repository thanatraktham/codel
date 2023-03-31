from multiprocessing import synchronize
from sqlalchemy.orm import Session
from app.database.init_db import SessionLocal
from app.models.vet import Vet
from app.core import authentication
from app.schemas.vet import VetAuth, UpdateStatus, VetEdit

db = SessionLocal()

def get_vet_by_email(email: str):
    return db.query(Vet).filter(Vet.email == email).first()

def get_all_activate_vet():
    return db.query(Vet).filter(Vet.status == True).all()


def get_vet_by_email(email: str):
    return db.query(Vet).filter(Vet.email == email).first()


def create_vet(request: VetAuth):
    hashed_password = authentication.get_password_hash(request.password)
    db_user = Vet(email=request.email,
                  password=hashed_password,
                  status=True,
                  firstname=request.email,
                  lastname="ew"
                  )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_status(id: str, request: UpdateStatus):
    db.query(Vet).filter(Vet.vet_id == id).update(
        request.__dict__, synchronize_session="fetch")
    db.commit()

def update_vet(id: str, request: VetEdit):
    db.query(Vet).filter(Vet.vet_id == id).update(
        request.__dict__, synchronize_session="fetch")
    db.commit()