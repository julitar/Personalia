from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False) # guardar password como bytes para encriptarla? Me dio error
    name = db.Column(db.String(50), unique=False, nullable=True) # No se piden en el registro
    lastname = db.Column(db.String(80), unique=False, nullable=True)
    birthdate = db.Column(db.Date, nullable=True)
    contacts = db.relationship('Contact', backref='user', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "birthdate": self.birthdate,
            "contact": [contact.serialize() for contact in self.contacts],
        }
    
# Relationships

contact_social = db.Table('contact_social',
    db.Column('contact_id', db.Integer, db.ForeignKey('contact.id'), primary_key=True),
    db.Column('social_id', db.Integer, db.ForeignKey('social.id'), primary_key=True)
)

contact_tag = db.Table('contact_tag',
    db.Column('contact_id', db.Integer, db.ForeignKey('contact.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False) 
    lastname = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=True)
    phone = db.Column(db.Integer, unique=False, nullable=True)
    birthdate = db.Column(db.Date, nullable=True)
    address = db.Column(db.String(150), unique=False, nullable=True)
    company = db.Column(db.String(30), unique=False, nullable=True)
    photo = db.Column(db.String(150), unique=False, nullable=True)
    socialmedia = db.relationship('Social', secondary=contact_social, backref=db.backref('contacts', lazy='dynamic'))
    tags = db.relationship('Tag', secondary=contact_tag, backref=db.backref('contacts', lazy='dynamic'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "phone": self.phone,
            "birthdate": self.birthdate,
            "address": self.address,
            "company": self.company,
            "photo": self.photo,
            "socialmedia": [social.serialize() for social in self.socialmedia],  # Serializar cada red social
            "user_id": self.user_id
        }


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('tags', lazy='dynamic'))

    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "contacts": [contact.serialize() for contact in self.contacts]
        }


class Social(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    url = db.Column(db.String(80), unique=True, nullable=False)

    def serialize(self):
        return {
            "name": self.name,
            "url": self.url,
        }
    
