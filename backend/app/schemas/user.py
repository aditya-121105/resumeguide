from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):

    full_name: str
    email: EmailStr
    username: str
    password: str


class UserResponse(BaseModel):

    id: int
    full_name: str
    email: EmailStr
    username: str

    class Config:
        from_attributes = True

class UserLogin(BaseModel):

    username: str
    password: str
class Token(BaseModel):

    access_token: str
    token_type: str