"""empty message

Revision ID: 282d8f320916
Revises: 
Create Date: 2023-08-23 14:48:57.809507

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '282d8f320916'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('social',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('url', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('url')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=120), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.Column('lastname', sa.String(length=80), nullable=True),
    sa.Column('birthdate', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('contact',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('lastname', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=True),
    sa.Column('birthdate', sa.Date(), nullable=True),
    sa.Column('address', sa.String(length=150), nullable=True),
    sa.Column('company', sa.String(length=30), nullable=True),
    sa.Column('photo', sa.String(length=150), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('contact_social',
    sa.Column('contact_id', sa.Integer(), nullable=False),
    sa.Column('social_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['contact_id'], ['contact.id'], ),
    sa.ForeignKeyConstraint(['social_id'], ['social.id'], ),
    sa.PrimaryKeyConstraint('contact_id', 'social_id')
    )
    op.create_table('contact_tag',
    sa.Column('contact_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['contact_id'], ['contact.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
    sa.PrimaryKeyConstraint('contact_id', 'tag_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('contact_tag')
    op.drop_table('contact_social')
    op.drop_table('tag')
    op.drop_table('contact')
    op.drop_table('user')
    op.drop_table('social')
    # ### end Alembic commands ###
