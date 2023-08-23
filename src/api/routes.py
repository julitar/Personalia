"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Contact, Tag, Social
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

import bcrypt
salt = bcrypt.gensalt()

api = Blueprint('api', __name__)


@api.route('/users', methods=['GET'])
def get_users():

    user = User.query.all()
    all_users = list(map(lambda x: x.serialize(), user))
    return jsonify(all_users), 200 


@api.route('/signup', methods=['POST'])
def create_user():

    request_body_user = request.get_json()

    email = request_body_user.get("email")
    password = request_body_user.get("password")
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
   
    new_user = User(email=email, password=hashed_password.decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()
    
    user_data = {
        "email": new_user.email,
    }

    return jsonify(user_data), 200 


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)

    if not email or not password:
        return jsonify({"message": "Error email y password son requeridos"}), 400

    user = User.query.filter_by(email=email).first()

    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Password incorrect"}), 401
    
    token = create_access_token(identity=user.id)

    return jsonify({"token": token}), 200


@api.route('/user/contacts', methods=['GET'])
@jwt_required()
def user_contacts():
    
    user_id = get_jwt_identity()
    
    user = User.query.filter_by(id=user_id).first()
    #print(user)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    user_contacts = Contact.query.filter_by(user_id=user.id).all()
    #print(user_contacts)
    serialized_contacts = [contact.serialize() for contact in user_contacts]
    return jsonify({"contacts": serialized_contacts})
    