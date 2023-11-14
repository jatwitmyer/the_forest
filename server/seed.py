from random import randint, choice as rc

import datetime

from app import app
from models import db, User, UserAchievement, Achievement, SaveFile

def create_users():
  u1 = User(
    username = "jess",
    password = "1234")
  u2 = User(
    username = "rho",
    password = "1234")
  users = [u1, u2]
  return users

def create_save_files():
  sf1 = SaveFile(
    src = "tbd",
    # timestamp = datetime.utcnow()
    timestamp = datetime.datetime(month=11, day=13, year=2023, hour=12, minute=0, second =0, microsecond=0, fold=0),
    user_fk = 1
  )
  sf2 = SaveFile(
    src = "tbd",
    timestamp = datetime.datetime(month=11, day=14, year=2023, hour=12, minute=0, second =0, microsecond=0, fold=0),
    user_fk = 1
  )
  save_files = [sf1, sf2]
  return save_files

if __name__ == '__main__':

  with app.app_context():
    print("Clearing db...")
    User.query.delete()
    UserAchievement.query.delete()
    Achievement.query.delete()
    SaveFile.query.delete()

    print("Seeding users...")
    users = create_users()
    db.session.add_all(users)
    db.session.commit()

    print("Seeding save files...")
    save_files = create_save_files()
    db.session.add_all(save_files)
    db.session.commit()

    print("Done seeding!")