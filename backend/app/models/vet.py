from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import BINARY, Boolean, Column, ForeignKey, Integer, String, Date, Table, TypeDecorator
from sqlalchemy.orm import relationship
from app.models.admin import Admin

from ..database.init_db import Base

vet_work = Table('vet_work', Base.metadata,
                 Column('vet_id', ForeignKey('vet.vet_id'), primary_key=True),
                 Column('work', ForeignKey(
                     'work_experience.work'), primary_key=True)
                 )

vet_ed = Table('vet_ed', Base.metadata,
               Column('vet_id', ForeignKey('vet.vet_id'), primary_key=True),
               Column('education', ForeignKey(
                   'education.education'), primary_key=True)
               )

vet_animal = Table('vet_animal', Base.metadata,
                   Column('vet_id', ForeignKey(
                       'vet.vet_id'), primary_key=True),
                   Column('animal', ForeignKey(
                       'specialist_animal.animal'), primary_key=True)
                   )

vet_symptom = Table('vet_symptom', Base.metadata,
                    Column('vet_id', ForeignKey(
                        'vet.vet_id'), primary_key=True),
                    Column('symptom', ForeignKey(
                        'specialist_symptom.symptom'), primary_key=True)
                    )


class Vet(Base):
    __tablename__ = "vet"

    vet_id = Column(UUID(as_uuid=True), primary_key=True,
                    index=True, default=uuid4)
    firstname = Column(String(50))
    lastname = Column(String(50))
    email = Column(String(50), nullable=False)
    password = Column(String(64), nullable=False)
    phone_number = Column(String(10))
    birth_date = Column(Date)

    license_id = Column(String(12))

    bank_name = Column(String(50))
    bank_account_number = Column(String(14))

    profile_picture_url = Column(String(2048))

    status = Column(Boolean, default=False)

    admin_id = Column(UUID, ForeignKey("admin.admin_id"))
    admin = relationship("Admin", back_populates="vets")

    experiences = relationship(
        "Work_experience", secondary='vet_work', back_populates="vets")

    educations = relationship(
        "Education", secondary="vet_ed", back_populates="vets")

    specialist_animals = relationship(
        "Specialist_animal", secondary="vet_animal", back_populates="vets")

    specialist_symptoms = relationship(
        "Specialist_symptom",  secondary='vet_symptom', back_populates="vets")


class Work_experience(Base):
    __tablename__ = "work_experience"

    work = Column(String(100), primary_key=True)
    vets = relationship("Vet", secondary="vet_work",
                        back_populates='experiences')


class Education(Base):
    __tablename__ = "education"

    education = Column(String(100), primary_key=True)
    vets = relationship("Vet", secondary="vet_ed",
                        back_populates='educations')


class Specialist_animal(Base):
    __tablename__ = "specialist_animal"

    animal = Column(String(100), primary_key=True)
    vets = relationship("Vet", secondary="vet_animal",
                        back_populates='specialist_animals')


class Specialist_symptom(Base):
    __tablename__ = "specialist_symptom"

    symptom = Column(String(100), primary_key=True)
    vets = relationship("Vet", secondary="vet_symptom",
                        back_populates='specialist_symptoms')
