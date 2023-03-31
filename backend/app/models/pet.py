from uuid import uuid4
from pymysql import Time
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import BINARY, Boolean, Column, ForeignKey, Integer, String, Date, TypeDecorator, Enum, DATETIME, TIME
from sqlalchemy.orm import relationship
from ..database.init_db import Base


class Pet(Base):
    __tablename__ = "pet"

    pet_id = Column(UUID(as_uuid=True), primary_key=True,
                    index=True, default=uuid4)
    name = Column(String(50))
    type = Column(String(50))
    sex = Column(Enum('female', 'male', name="sex_enum"))
    species = Column(String(50))
    favorite_activity = Column(String(50))
    scared = Column(String(50))
    birth_year = Column(Date)
    weight = Column(Integer)
    physical_limitation = Column(String(50))
    congenital_disease = Column(String(50))
    microchip = Column(Boolean)
    treat = Column(
        Enum('outside', 'inside', 'outsideandinside', name="treat_enum"))
    favorite_food = Column(String(50))
    food_amout = Column(Integer)
    feeding_time = Column(String(20))
    other = Column(String(50))

    client_id = Column(UUID(as_uuid=True), ForeignKey("client.client_id"))
    owner = relationship("Client", back_populates="pets")
