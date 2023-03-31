from typing import List, Optional
from uuid import uuid4
from pydantic import BaseModel
import datetime

from app.schemas.pet import Pet


class ClientBase(BaseModel):
    email: str


class ClientAuth(ClientBase):
    password: str


class LoginRes(BaseModel):
    token: str
    token_type: str


class RegisterRes(BaseModel):
    id: str
    email: str


class ClientEdit(BaseModel):
    email: str
    firstname: str
    lastname: str
    address: str
    phone_number: str
    birth_date: datetime.date


class ClientInDB(ClientBase):
    client_id: str


class ShowClient(BaseModel):
    firstname: str
    lastname: str

    pets: List[Pet] = []

    class Config():
        orm_mode = True
