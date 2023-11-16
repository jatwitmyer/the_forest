from random import randint, choice as rc

import datetime

from app import app
from models import db, User, Character, SaveFile, UserAchievement, Achievement

def create_users():
  u1 = User(
    username = "jess",
    password = "1234")
  u2 = User(
    username = "rho",
    password = "1234")
  users = [u1, u2]
  return users

def create_characters():
  c1 = Character(
    user_fk = 1,

    name = "Terran",
    datetime_created = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=0, second =0, microsecond=0, fold=0),
    datetime_last_played = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=10, second =0, microsecond=0, fold=0)
  )
  characters = [c1]
  return characters

def create_save_files():
  sf1 = SaveFile(
    character_fk = 1,

    datetime_created = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=5, second =0, microsecond=0, fold=0),
    location_on_save = "starting_path",
    has_entered_portal = "false",
    has_map = "false",
    met_girl = "false",
    girls_item_location = "village2",
    found_girls_item = "false",
    has_visited_store = "false",
    gold_pieces = 0,
    has_seeking_spell = "false",
    mini_game_high_score = 0,
    met_village2_trader = "false",
    accepted_quest_village2_trader = "false",
    met_village1_trade_target = "false",
    negotiated_deal = "false",
    wizard_is_home = "false",
  )
  sf2 = SaveFile(
    character_fk = 1,

    datetime_created = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=20, second =0, microsecond=0, fold=0),
    location_on_save = "village1",
    has_entered_portal = "true",
    has_map = "true",
    met_girl = "true",
    girls_item_location = "village2",
    found_girls_item = "false",
    has_visited_store = "true",
    gold_pieces = 50,
    has_seeking_spell = "false",
    mini_game_high_score = 10,
    met_village2_trader = "false",
    accepted_quest_village2_trader = "false",
    met_village1_trade_target = "false",
    negotiated_deal = "false",
    wizard_is_home = "false",
  )
  save_files = [sf1, sf2]
  return save_files

if __name__ == '__main__':

  with app.app_context():
    print("Clearing db...")
    User.query.delete()
    Character.query.delete()
    SaveFile.query.delete()
    UserAchievement.query.delete()
    Achievement.query.delete()

    print("Seeding users...")
    users = create_users()
    db.session.add_all(users)
    db.session.commit()

    print("Seeding characters...")
    characters = create_characters()
    db.session.add_all(characters)
    db.session.commit()

    print("Seeding save files...")
    save_files = create_save_files()
    db.session.add_all(save_files)
    db.session.commit()

    # print("Seeding saves items joins...")
    # saves_items_joins = create_saves_items_joins()
    # db.session.add_all(saves_items_joins)
    # db.session.commit()

    # print("Seeding inventory items...")
    # inventory_items = create_inventory_items()
    # db.session.add_all(inventory_items)
    # db.session.commit()

    print("Done seeding!")