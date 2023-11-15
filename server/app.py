from config import app
from flask import make_response, request
from models import db, User, UserAchievement, Achievement, SaveFile

import datetime

@app.route('/')
def index():
    return 'Navigate to: /users, /users/<id>, /save_files, /save_files/<id>,  '

@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        response = [user.to_dict() for user in users]
        return make_response(response, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_user = User(
                username = form_data['username'],
                password = form_data['password']
            )
            db.session.add(new_user)
            db.session.commit()
            response = make_response(new_user.to_dict(), 201)
        except ValueError:
            response = make_response(
                {"errors": ["Validation errors in POST to users"]},
                400
            )
        return response
    
@app.route('/users/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def users_by_id(id):
    user = User.query.filter(User.id == id).first()
    if user:
        if request.method == 'GET':
            response = make_response(user.to_dict(), 200)
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(user, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(user.to_dict(), 202)
            except ValueError:
                response = make_response(
                    {"errors": ["Validation errors in PATCH to user id"]},
                    400
                )
        elif request.method == 'DELETE':
            db.session.delete(user)
            db.session.commit()
            response = make_response({},204)
    else:
        response = make_response({"error": "User not found"}, 404)
    return response
    
@app.route('/save_files', methods=['GET'])
def save_files():
    if request.method == 'GET':
        save_files = SaveFile.query.all()
        response = [save_file.to_dict() for save_file in save_files]
        return make_response(response, 200)

@app.route('/save_files/<int:user_id>', methods=['GET', 'POST'])
def save_files_by_user_id(user_id):
    if request.method == 'GET':
        save_files = SaveFile.query.filter(SaveFile.user_fk == user_id).all()
        response = [save_file.to_dict() for save_file in save_files]
        return make_response(response, 200)
    elif request.method == 'POST':
        # form_data = request.get_json()
        try:
            new_save_file = SaveFile(
                src = 'tbd', #need to change this to automatically happen without form data
                timestamp = datetime.datetime.utcnow(),
                user_fk = user_id
            )
            db.session.add(new_save_file)
            db.session.commit()
            response = make_response(new_save_file.to_dict(), 201)
        except ValueError:
            response = make_response(
                {"errors": ["Validation errors in POST to save_files"]},
                400
            )
        return response

@app.route('/save_files/<int:id>', methods=['GET', 'DELETE'])
def save_files_by_id(id):
    save_file = SaveFile.query.filter(SaveFile.id == id).first()
    if save_file:
        if request.method == 'GET':
            response = make_response(save_file.to_dict(), 200)
        elif request.method == 'DELETE':
            db.session.delete(save_file)
            db.session.commit()
            response = make_response({}, 204)
    else:
        response = make_response({"error": "Save file not found"}, 404)
    return response
    

# run python app.py
if __name__ == '__main__':
    app.run(port=5555, debug=True)