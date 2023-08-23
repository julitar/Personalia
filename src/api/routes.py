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
        return jsonify({"message": "Error email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Password incorrect"}), 401
    
    token = create_access_token(identity=user.id)

    return jsonify({"token": token}), 200


@api.route('/profile', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"message": "Error, user not found"}), 400

    return jsonify(user.serialize()), 200


@api.route('/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return jsonify({"message": "Error, user not found"}), 400

        data = request.get_json()
        
        if 'name' in data:
            user.name = data['name']
        if 'lastname' in data:
            user.lastname = data['lastname']
        if 'email' in data:
            user.email = data['email']
        if 'birthdate' in data:
            user.birthdate = data['birthdate']
        
        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "User data updated"}), 200

    except Exception as e:
        return jsonify({"message": "data change failed", "error": str(e)}), 500
    

@api.route('/password', methods=['PUT'])
@jwt_required()
def change_password():
    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        data = request.get_json()
        current_password = data.get('currentPassword')
        new_password = data.get('newPassword')

        if user and bcrypt.checkpw(current_password.encode('utf-8'), user.password.encode('utf-8')):
            new_hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), salt)
            user.password = new_hashed_password.decode('utf-8')
            db.session.add(user)
            db.session.commit()
            return jsonify({'message': 'password updated!'}), 200
        else:
            return jsonify({'message': 'wrong current password'}), 400
        
    except Exception as e:
        return jsonify({'message': 'password change failed', 'error': str(e)}), 500