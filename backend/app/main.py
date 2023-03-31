from .api import client, admin, vet, pet
from .database.init_db import SessionLocal, engine
from typing import Optional, Generator
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from .models.client import Client
from .models.admin import Admin
from .models.pet import Pet
from .models.vet import Vet

Client.metadata.create_all(bind=engine)
Admin.metadata.create_all(bind=engine)
Pet.metadata.create_all(bind=engine)
Vet.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(client.router)
app.include_router(admin.router)
app.include_router(pet.router)
app.include_router(vet.router)

