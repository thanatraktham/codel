from fastapi import APIRouter, HTTPException, status, Depends
from app.core.authentication import verify_password, create_access_token
from app.crud.client import create_user, get_user_by_email
from app.schemas.client import ClientAuth
from app.database import init_db
from sqlalchemy.orm import Session
from app.schemas.admin import AdminAuth
from app.crud import admin

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    responses={404: {"message": "Not found"}}
)

get_db = init_db.get_db


@router.post('/register', status_code=status.HTTP_201_CREATED)
def create(request: AdminAuth, db: Session = Depends(get_db)):
    return admin.create(request, db)
