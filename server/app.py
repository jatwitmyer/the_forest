from config import app
from flask import make_response, request
from models import db, User, UserAchievement, Achievement, SaveFile, Character

import datetime

@app.route('/')
def index():
    return 'Navigate to: /users, /users/<id>, /save_files, /save_files/<id>, '


#--------------------------------------
### USERS ###
#--------------------------------------


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


#--------------------------------------
### CHARACTERS ###
#--------------------------------------


@app.route('/characters', methods=['GET'])
def characters():
    if request.method == 'GET':
        characters = Character.query.all()
        response = [character.to_dict() for character in characters]
        return make_response(response, 200)

@app.route('/characters/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def characters_by_id(id):
    character = Character.query.filter(Character.id == id).first()
    if character:
        if request.method == 'GET':
            response = make_response(character.to_dict(), 200)
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(character, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(character.to_dict(), 202)
            except ValueError:
                response = make_response(
                    {"errors": ["Validation errors in PATCH to character id"]},
                    400
                )
        elif request.method == 'DELETE':
            db.session.delete(character)
            db.session.commit()
            response = make_response({},204)
    else:
        response = make_response({"error": "Character not found"}, 404)
    return response

@app.route('/characters_by_user/<int:user_id>', methods=['GET', 'POST'])
def characters_by_user_id(user_id):
    if request.method == 'GET':
        characters = Character.query.filter(Character.user_fk == user_id).all()
        response = [character.to_dict() for character in characters]
        return make_response(response, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_character = Character(
                name = form_data['name'],
                datetime_created = datetime.datetime.utcnow(),
                datetime_last_played = datetime.datetime.utcnow(),
                user_fk = user_id
            )
            db.session.add(new_character)
            db.session.commit()
            response = make_response(new_character.to_dict(), 201)
        except ValueError:
            response = make_response(
                {"errors": ["Validation errors in POST to characters"]},
                400
            )
        return response


#--------------------------------------
### SAVE FILES ###
#--------------------------------------


@app.route('/save_files', methods=['GET'])
def save_files():
    if request.method == 'GET':
        save_files = SaveFile.query.all()
        response = [save_file.to_dict() for save_file in save_files]
        return make_response(response, 200)

@app.route('/save_files_by_character/<int:character_id>', methods=['GET', 'POST'])
def save_files_by_character_id(character_id):
    if request.method == 'GET':
        save_files = SaveFile.query.filter(SaveFile.character_fk == character_id).all()
        response = [save_file.to_dict() for save_file in save_files]
        return make_response(response, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_save_file = SaveFile(
                character_fk = character_id,
                datetime_created = datetime.datetime.utcnow(),
                location_on_save = form_data['location_on_save'],
                has_entered_portal = form_data['has_entered_portal'],
                has_map = form_data['has_map'],
                met_girl = form_data['met_girl'],
                girls_item_location = form_data['girls_item_location'],
                found_girls_item = form_data['found_girls_item'],
                has_visited_store = form_data['has_visited_store'],
                gold_pieces = form_data['gold_pieces'],
                has_seeking_spell = form_data['has_seeking_spell'],
                mini_game_high_score = form_data['mini_game_high_score'],
                met_village2_trader = form_data['met_village2_trader'],
                accepted_quest_village2_trader = form_data['accepted_quest_village2_trader'],
                met_village1_trade_target = form_data['met_village1_trade_target'],
                negotiated_deal = form_data['negotiated_deal'],
                wizard_is_home = form_data['wizard_is_home']
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


#--------------------------------------
### ACHIEVEMENTS ###
#--------------------------------------


@app.route('/achievements', methods=['GET'])
def achievements():
    if request.method == 'GET':
        achievements = Achievement.query.all()
        response = [achievement.to_dict() for achievement in achievements]
        return make_response(response, 200)

@app.route('/achievements/<int:id>', methods=['GET'])
def achievements_by_id(id):
    achievement = Achievement.query.filter(Achievement.id == id).first()
    if achievement:
        if request.method == 'GET':
            response = make_response(achievement.to_dict(), 200)
    else:
        response = make_response({"error": "Achievement not found"}, 404)
    return response


#--------------------------------------
### USERS ACHIEVEMENTS ###
#--------------------------------------


@app.route('/users_achievements', methods=['GET'])
def users_achievements():
    if request.method == 'GET':
        users_achievements = UserAchievement.query.all()
        response = [user_achievement.to_dict() for user_achievement in users_achievements]
        return make_response(response, 200)

@app.route('/users_achievements/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def users_achievements_by_id(id):
    user_achievement = UserAchievement.query.filter(UserAchievement.id == id).first()
    if user_achievement:
        if request.method == 'GET':
            response = make_response(user_achievement.to_dict(), 200)
        elif request.method == 'PATCH':
            form_data = request.get_json()
            try:
                for attr in form_data:
                    setattr(user_achievement, attr, form_data.get(attr))
                db.session.commit()
                response = make_response(user_achievement.to_dict(), 202)
            except ValueError:
                response = make_response(
                    {"errors": ["Validation errors in PATCH to UserAchievement id"]},
                    400
                )
        elif request.method == 'DELETE':
            db.session.delete(user_achievement)
            db.session.commit()
            response = make_response({},204)
    else:
        response = make_response({"error": "UserAchievement not found"}, 404)
    return response

@app.route('/users_achievements/<int:user_id>', methods=['GET', 'POST'])
def users_achievements_by_user_id(user_id):
    if request.method == 'GET':
        users_achievements = UserAchievement.query.filter(UserAchievement.user_fk == user_id).all()
        response = [user_achievement.to_dict() for user_achievement in users_achievements]
        return make_response(response, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
        try:
            new_user_achievement = UserAchievement(
                achievement_fk = form_data['achievement_fk'],
                user_fk = user_id,
                datetime_achieved = datetime.datetime.utcnow()
            )
            db.session.add(new_user_achievement)
            db.session.commit()
            response = make_response(new_user_achievement.to_dict(), 201)
        except ValueError:
            response = make_response(
                {"errors": ["Validation errors in POST to users_achievements"]},
                400
            )
        return response



# run python app.py
if __name__ == '__main__':
    app.run(port=5555, debug=True)