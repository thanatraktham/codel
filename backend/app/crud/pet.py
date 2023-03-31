from sqlalchemy.orm import Session

from app.models import client, pet
from app.core import authentication
from app.schemas.pet import PetCreate
from fastapi import Depends

from app.schemas.client import ClientBase, ClientInDB


def get_user_by_pet_id(pet_id: str, db: Session):
    return db.query(pet.Pet).filter(pet.Pet.pet_id == pet_id).first()


def get_user_by_client_id(client_id: str, db: Session):
    return db.query(pet.Pet).filter(pet.Pet.client_id == client_id).all()


def get_all(db: Session):
    return db.query(pet.Pet).all()


def create_pet(request: PetCreate, db: Session, user: ClientInDB):
    db_pet = pet.Pet(
        name=request.name,
        type=request.type,
        sex=request.sex,
        client_id=user.client_id
    )
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet
