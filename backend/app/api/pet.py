from fastapi import APIRouter, Depends
from app.core import authentication
from app.crud import pet
from typing import List
from app.schemas.pet import PetCreate, ShowPet, showPets
from app.database.init_db import get_db
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/pet",
    tags=["Pet"],
    responses={404: {"message": "Not found"}}
)


@router.get("/", response_model=List[showPets])
async def read_pets(db: Session = Depends(get_db)):
    return pet.get_all(db)


@router.post("/getPetByOwnerId", response_model=List[showPets])
async def read_pets(client_id: str, db: Session = Depends(get_db)):
    return pet. get_user_by_client_id(client_id, db)


@router.post("/add")
async def add_pet(newPet: PetCreate, db: Session = Depends(get_db), user=Depends(authentication.validate_client)):
    return pet.create_pet(newPet, db, user)
