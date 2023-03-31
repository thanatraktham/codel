from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel
import datetime

class VetBase(BaseModel):
    email: str

class VetAuth(VetBase):
    password: str

class LoginRes(BaseModel):
    token: str

class RegisterRes(BaseModel):
    id: str
    email: str

class VetEdit(BaseModel):
    email: str
    firstname: str
    lastname: str
    phone_number: str
    birth_date: datetime.date

class UpdateStatus(BaseModel):
    status: bool