"""create client table

Revision ID: 753a45e9308e
Revises: 
Create Date: 2022-02-13 13:23:56.054564

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '753a45e9308e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'client',
        sa.Column('client_id', sa.dialects.postgresql.UUID(
            as_uuid=True), primary_key=True),
        sa.Column('firstname_en', sa.String(50)),
        sa.Column('lastname_en', sa.String(50)),
        sa.Column('email', sa.String(50), nullable=False),
        sa.Column('password', sa.String(64), nullable=False),
        sa.Column('phone_number', sa.String(10)),
        sa.Column('address', sa.String(1024)),
        sa.Column('profile_picture_url', sa.String(2048)),
        sa.Column('birth_date', sa.Date),
    )

    op.create_table(
        'admin',
        sa.Column('admin_id', sa.dialects.postgresql.UUID(
            as_uuid=True), primary_key=True),
        sa.Column('email', sa.String(50), nullable=False),
        sa.Column('password', sa.String(64), nullable=False),
    )

    op.create_table(
        'vet',
        sa.Column('vet_id', sa.dialects.postgresql.UUID(
            as_uuid=True), primary_key=True),
        sa.Column('firstname_en', sa.String(50)),
        sa.Column('lastname_en', sa.String(50)),
        sa.Column('email', sa.String(50), nullable=False),
        sa.Column('password', sa.String(64), nullable=False),
        sa.Column('profile_picture_url', sa.String(2048)),
        sa.Column('BA_fname', sa.String(50)),
        sa.Column('BA_lname', sa.String(50)),
        sa.Column('bank_name', sa.String(50)),
        sa.Column('bank_account_number', sa.String(20)),
        sa.Column('admin_id', sa.dialects.postgresql.UUID,
                  sa.ForeignKey('admin.admin_id'))
    )


def downgrade():
    pass
