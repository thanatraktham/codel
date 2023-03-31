from fastapi import APIRouter, HTTPException, status, Depends
from app.core.authentication import verify_password, create_access_token, validate_vet
from app.crud.vet import create_vet, get_vet_by_email, update_status
from app.schemas.vet import VetAuth, LoginRes, RegisterRes, UpdateStatus, VetEdit

router = APIRouter(
    prefix="/vet",
    tags=["Vet"],
    responses={404: {"message": "Not found"}}
)


@router.post("/register", response_model=RegisterRes)
async def vet_register(req: VetAuth):

    if not get_vet_by_email(req.email):
        vet = create_vet(req)
        return {"id": str(vet.vet_id), "email": vet.email}

    raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                        detail="Email is already taken")


@router.post("/login", response_model=LoginRes)
async def login(req: VetAuth):
    user = get_vet_by_email(req.email)

    if not user or not verify_password(req.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")

    jwt = create_access_token({"email": user.email})
    return {"token": jwt, "token_type": "bearer"}

@router.put("/updateStatus")
async def updateStatus(req: UpdateStatus, user=Depends(validate_vet)):
    db_user = get_vet_by_email(user.email)
    if (db_user.vet_id == user.vet_id):
        update_status(db_user.vet_id, req)
        return {"id": str(db_user.vet_id), "status": db_user.status}
    else:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Something Wrong")

@router.put("/update")
async def updateStatus(req: VetEdit, user=Depends(validate_vet)):
    db_user = get_vet_by_email(user.email)
    if (db_user.vet_id == user.vet_id):
        update_status(db_user.vet_id, req)
        return get_vet_by_email(req.email)
    else:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Something Wrong")
