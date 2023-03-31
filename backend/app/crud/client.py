from sqlalchemy.orm import Session
from app.database.init_db import SessionLocal
from app.models.client import Client
from app.core import authentication
from app.schemas.client import ClientAuth, ClientEdit
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

db = SessionLocal()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user_by_email(email: str):
    return db.query(Client).filter(Client.email == email).first()


def create_user(request: ClientAuth):
    hashed_password = authentication.get_password_hash(request.password)
    db_user = Client(email=request.email,
                     password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(id: str, request: ClientEdit):
    db.query(Client).filter(Client.client_id == id).update(
        request.__dict__, synchronize_session="fetch")
    db.commit()


# update_name_to_sompong("string")
