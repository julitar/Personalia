"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Contact, Tag, Social
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime


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


@api.route('/user/contacts', methods=['GET'])
@jwt_required()
def user_contacts():
    
    user_id = get_jwt_identity()
    
    user = User.query.filter_by(id=user_id).first()
    #print(user)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    user_contacts = Contact.query.filter_by(user_id=user.id).order_by(Contact.name.asc()).all()
    #print(user_contacts)
    serialized_contacts = [contact.serialize() for contact in user_contacts]
    return jsonify({"contacts": serialized_contacts})
    


@api.route('/profile', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"message": "Error, user not found"}), 400
    
    formatted_birthdate = user.birthdate.strftime('%d/%m/%Y') if user.birthdate else None

    serialized_user = {
        'id': user.id,
        'name': user.name,
        'lastname': user.lastname,
        'email': user.email,
        'birthdate': formatted_birthdate,
    }

    return jsonify(serialized_user), 200



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


@api.route('/user/contacts/<int:contact_id>', methods=['PUT'])
@jwt_required()
def edit_contact(contact_id):
    user_id = get_jwt_identity()
    print(user_id)
    
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    contact = Contact.query.filter_by(id=contact_id, user_id=user.id).first()
    if contact is None:
        return jsonify({"message": "Contact not found or not associated with the user"}), 404
    
    data = request.json
    print(data)
    contact.name = data.get('name', contact.name)
    contact.lastname = data.get('lastname', contact.lastname)
    contact.company = data.get('company', contact.company)
    contact.phone = data.get('phone', contact.phone)
    if contact.phone is not None:
        contact.phone = int(contact.phone)
    contact.email = data.get('email', contact.email)
    contact.socialmedia = data.get('socialmedia', contact.socialmedia)
    contact.birthdate = data.get('birthdate', contact.birthdate)
    if contact.birthdate is not None:
        contact.birthdate = datetime.strptime(contact.birthdate, '%Y-%m-%d').date()

  
    db.session.commit()
    
    return jsonify({"message": "Contact updated successfully"}), 200
# Manage tags

@api.route('/tags', methods=['POST'])
@jwt_required()  
def create_tag():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    tag_data = request.json
    new_tag = Tag(name=tag_data['name'], user=user)
    db.session.add(new_tag)
    db.session.commit()

    return jsonify(new_tag.serialize()), 201


@api.route('/tags', methods=['GET'])
@jwt_required()
def get_tags():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    tags = user.tags.all() 
    serialized_tags = [tag.serialize() for tag in tags]

    return jsonify(serialized_tags), 200

@api.route('/tags/<int:tag_id>', methods=['PUT'])
@jwt_required()
def update_tag(tag_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    tag = Tag.query.filter_by(id=tag_id, user_id=user_id).first()

    if not tag:
        return jsonify({"message": "Tag not found"}), 404

    tag_data = request.json
    tag.name = tag_data['name']
    db.session.commit()

    return jsonify(tag.serialize()), 200

@api.route('/tags/<int:tag_id>', methods=['DELETE'])
@jwt_required()
def delete_tag(tag_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    tag = Tag.query.filter_by(id=tag_id, user_id=user_id).first()

    if not tag:
        return jsonify({"message": "Tag not found"}), 404

    db.session.delete(tag)
    db.session.commit()

    return jsonify({"message": "tag deleted" }), 200


@api.route('/tags/<int:tag_id>', methods=['GET'])
@jwt_required()
def show_tag(tag_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    tag = Tag.query.filter_by(id=tag_id, user_id=user_id).first()

    if not tag:
        return jsonify({"message": "Tag not found"}), 404

    serialized_tag = {
        'id': tag.id,
        'name': tag.name,
    }

    return jsonify(serialized_tag), 200

