import email
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel


class AdminBase(BaseModel):
    email: str


class AdminAuth(AdminBase):
    password: str


class Admin(AdminBase):
    admin_id: UUID

    class Config:
        orm_mode = True
