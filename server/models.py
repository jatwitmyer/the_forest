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
  serialize_rules = ('-save_files.user', '-save_files.user_fk')

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, unique=True)
  password = db.Column(db.String)

  save_files = db.relationship('SaveFile', back_populates='user')


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



class UserAchievement(db.Model, SerializerMixin):
  __tablename__ = 'users_achievements'
  # serialize_rules = 

  id = db.Column(db.Integer, primary_key=True)
  user_fk = db.Column(db.Integer, db.ForeignKey('users.id'))
  achievement_fk = db.Column(db.Integer, db.ForeignKey('achievements.id'))

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

  @validates('name')
  def validates_name(self, key, name):
    if name:
      return name
    else:
      raise ValueError('Achievement must be given a name.')

  def __repr__(self):
    return f'<Achievement {self.id}>'


class SaveFile(db.Model, SerializerMixin):
  __tablename__ = 'save_files'
  serialize_rules = ('-user',)

  id = db.Column(db.Integer, primary_key=True)
  src = db.Column(db.String)
  timestamp = db.Column(db.String)
  user_fk = db.Column(db.Integer, db.ForeignKey('users.id'))

  user = db.relationship('User', back_populates='save_files')

  @validates('src')
  def validates_src(self, key, src):
    if src:
      return src
    else:
      raise ValueError('SaveFile must be given a src.')
    
  @validates('timestamp')
  def validates_timestamp(self, key, timestamp):
    if timestamp:
      return timestamp
    else:
      raise ValueError('SaveFile must be given a timestamp.')

  @validates('user_fk')
  def validates_user_fk(self, key, user_fk):
    if user_fk:
      return user_fk
    else:
      raise ValueError('SaveFile must be given a user foreign key.')
  
  def __repr__(self):
    return f'<SaveFile {self.id}>'