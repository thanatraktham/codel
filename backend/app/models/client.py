from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import BINARY, Boolean, Column, Integer, String, Date, TypeDecorator
from sqlalchemy.orm import relationship
from ..database.init_db import Base


class Client(Base):
    __tablename__ = "client"

    client_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    firstname = Column(String(50))
    lastname = Column(String(50))
    email = Column(String(50), nullable=False)
    password = Column(String(64), nullable=False)
    phone_number = Column(String(10))
    address = Column(String(1024))
    profile_picture_url = Column(String(2048))
    birth_date = Column(Date)

    pets = relationship("Pet", back_populates="owner")
