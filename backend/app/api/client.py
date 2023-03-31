from fastapi import APIRouter, HTTPException, Depends, status
from app.core.authentication import verify_password, create_access_token, validate_client
from app.crud.client import create_user, get_user_by_email, update_user
from app.schemas.client import ClientAuth, LoginRes, RegisterRes, ClientEdit
from app.crud.vet import get_all_activate_vet
from difflib import SequenceMatcher

router = APIRouter(
    prefix="/client",
    tags=["Client"],
    responses={404: {"message": "Not found"}}
)


@router.post("/register", response_model=RegisterRes)
async def client_register(req: ClientAuth):

    if not get_user_by_email(req.email):
        client = create_user(req)
        return {"id": str(client.client_id), "email": client.email}

    raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                        detail="Email is already taken")


@router.post("/login", response_model=LoginRes)
async def login(req: ClientAuth):
    user = get_user_by_email(req.email)

    if not user or not verify_password(req.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    jwt = create_access_token({"email": user.email})
    return {"token": jwt, "token_type": "bearer"}


@router.get("/user")
async def get_current_user(user=Depends(validate_client)):
    return user


@router.put("/update")
async def update(req: ClientEdit, user=Depends(validate_client)):
    db_user = get_user_by_email(req.email)
    if (db_user.client_id == user.client_id):
        update_user(db_user.client_id, req)
        return get_user_by_email(req.email)
    else:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Something Wrong")


@router.get("/search/{param}")
async def search(param: str):
    vets = [e for e in get_all_activate_vet() if e.firstname and e.lastname]
    vets_name = [e.firstname+" " +
                 e.lastname for e in vets if e.firstname and e.lastname]
    result_name = [e for e in vets_name if SequenceMatcher(
        None, e, param).ratio() > 0.5]
    return [e for e in vets if e.firstname+" "+e.lastname in result_name]


@router.get("/search")
async def dumps_vet():
    return get_all_activate_vet()
