from typing import List, Optional
from uuid import uuid4
from pydantic import BaseModel
from enum import Enum


class Sex(str, Enum):
    female = 'female'
    male = 'male'


class PetBase(BaseModel):
    name: str
    type: str
    sex: Sex


class PetCreate(PetBase):
    pass


class showPets(BaseModel):
    name: str
    type: str
    sex: Sex


class Pet(PetBase):
    pet_id: str
    client_id: str

    class Config():
        orm_mode = True


class ShowClient(BaseModel):
    firstname: str
    lastname: str

    pets: List[Pet] = []

    class Config():
        orm_mode = True


class ShowPet(BaseModel):
    name: str
    owner: ShowClient

    class Config():
        orm_mode = True
