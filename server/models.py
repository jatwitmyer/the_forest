from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"}
metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(metadata=metadata)



class User(db.Model, SerializerMixin):
  __tablename__ = 'users'
  # serialize_rules = (,)

  id = db.Column(db.Integer, primary_key=True)

  username = db.Column(db.String, unique=True)
  password = db.Column(db.String)

  @validates('username')
  def validates_username(self, key, username):
    if username:
      return username
    else:
      raise ValueError('User must be given a username.')
    
  @validates('password')
  def validates_password(self, key, password):
    if password:
      return password
    else:
      raise ValueError('User must be given a password.')
    
  def __repr__(self):
    return f'<User {self.id}>'



class Character(db.Model, SerializerMixin):
  __tablename__ = 'characters'
  # serialize_rules = (,)

  id = db.Column(db.Integer, primary_key=True)
  user_fk = db.Column(db.Integer, db.ForeignKey('users.id'))

  name = db.Column(db.String)
  datetime_created = db.Column(db.String)
  datetime_last_played = db.Column(db.String)

  def __repr__(self):
      return f'<Character {self.id}>'



class SaveFile(db.Model, SerializerMixin):
  __tablename__ = 'save_files'
  # serialize_rules = (,)

  id = db.Column(db.Integer, primary_key=True)
  character_fk = db.Column(db.Integer, db.ForeignKey('characters.id'))

  datetime_created = db.Column(db.String)
  location_on_save = db.Column(db.String)

  has_entered_portal = db.Column(db.String)
  has_map = db.Column(db.String)

  met_girl = db.Column(db.String)
  girls_item_location = db.Column(db.String)
  found_girls_item = db.Column(db.String)

  has_visited_store = db.Column(db.String)
  gold_pieces = db.Column(db.Integer)
  has_seeking_spell = db.Column(db.String)
  mini_game_high_score = db.Column(db.Integer)

  met_village2_trader = db.Column(db.String)
  accepted_quest_village2_trader = db.Column(db.String)
  met_village1_trade_target = db.Column(db.String)
  negotiated_deal = db.Column(db.String)

  wizard_is_home = db.Column(db.String)
  
  def __repr__(self):
    return f'<SaveFile {self.id}>'
  


# class SaveItemJoin(db.Model, SerializerMixin):
#   __tablename__ = 'saves_items_joins'
#   # serialize_rules = (,)

#   id = db.Column(db.Integer, primary_key=True)

#   save_file_fk = db.Column(db.Integer, db.ForeignKey('save_files.id'))
#   inventory_item_fk = db.Column(db.Integer, db.ForeignKey('inventory_items.id'))

#   def __repr__(self):
#       return f'<Character {self.id}>'
  


# class InventoryItem(db.Model, SerializerMixin):
#   __tablename__ = 'inventory_items'
#   # serialize_rules = (,)

#   id = db.Column(db.Integer, primary_key=True)

#   item_name = db.Column(db.String)

#   def __repr__(self):
#       return f'<Character {self.id}>'



class UserAchievement(db.Model, SerializerMixin):
  __tablename__ = 'users_achievements'
  # serialize_rules = 

  id = db.Column(db.Integer, primary_key=True)
  user_fk = db.Column(db.Integer, db.ForeignKey('users.id'))
  achievement_fk = db.Column(db.Integer, db.ForeignKey('achievements.id'))

  datetime_achieved = db.Column(db.String)

  @validates('user_fk')
  def validates_user_fk(self, key, user_fk):
    if user_fk:
      return user_fk
    else:
      raise ValueError('UserAchievement must be given a user foreign key.')
    
  @validates('achievement_fk')
  def validates_achievement_fk(self, key, achievement_fk):
    if achievement_fk:
      return achievement_fk
    else:
      raise ValueError('UserAchievement must be given an achievement foreign key.')

  def __repr__(self):
    return f'<UserAchievement {self.id}>'



class Achievement(db.Model, SerializerMixin):
  __tablename__ = 'achievements'
  # serialize_rules = 

  id = db.Column(db.Integer, primary_key=True)

  name = db.Column(db.String)
  summary = db.Column(db.String)
  visibility = db.Column(db.String)

  @validates('name')
  def validates_name(self, key, name):
    if name:
      return name
    else:
      raise ValueError('Achievement must be given a name.')

  def __repr__(self):
    return f'<Achievement {self.id}>'