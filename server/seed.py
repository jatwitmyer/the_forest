from random import randint, choice as rc

import datetime

from app import app
from models import db, User, Character, SaveFile, UserAchievement, Achievement

def create_users():
  u1 = User(
    username = "jess")
  u1.password_hash = "1234"
  u2 = User(
    username = "rho")
  u2.password_hash = "1234"
  users = [u1, u2]
  return users

def create_characters():
  c1 = Character(
    user_fk = 1,

    name = "Terran",
    datetime_created = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=0, second =0, microsecond=0, fold=0),
    datetime_last_played = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=10, second =0, microsecond=0, fold=0)
  )
  c2 = Character(
    user_fk = 1,

    name = "Rory",
    datetime_created = datetime.datetime(month=11, day=16, year=2023, hour=12, minute=0, second =0, microsecond=0, fold=0),
    datetime_last_played = datetime.datetime(month=11, day=16, year=2023, hour=12, minute=10, second =0, microsecond=0, fold=0)
  )

  characters = [c1, c2]
  return characters

girls_item_locations = ["starting path", "spooky1", "spooky2", "village1", "village2"]

def create_save_files():
  c1_girls_item_location = rc(girls_item_locations)
  c2_girls_item_location = rc(girls_item_locations)
  c1sf1 = SaveFile(
    character_fk = 1,

    datetime_created = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=5, second =0, microsecond=0, fold=0),
    location_on_save = "starting_path",
    has_entered_portal = "false",
    has_map = "false",
    met_girl = "false",
    girls_item_location = c1_girls_item_location,
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
  c1sf2 = SaveFile(
    character_fk = 1,

    datetime_created = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=20, second =0, microsecond=0, fold=0),
    location_on_save = "village1",
    has_entered_portal = "true",
    has_map = "true",
    met_girl = "true",
    girls_item_location = c1_girls_item_location,
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
  c2sf1 = SaveFile(
    character_fk = 2,

    datetime_created = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=5, second =0, microsecond=0, fold=0),
    location_on_save = "starting_path",
    has_entered_portal = "false",
    has_map = "false",
    met_girl = "false",
    girls_item_location = c2_girls_item_location,
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
  save_files = [c1sf1, c1sf2, c2sf1]
  return save_files

def create_users_achievements():
  ua1 = UserAchievement(
    user_fk = 1,
    achievement_fk = 1,
    datetime_achieved = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=10, second =0, microsecond=0, fold=0)
  )
  ua2 = UserAchievement(
    user_fk = 1,
    achievement_fk = 2,
    datetime_achieved = datetime.datetime(month=11, day=15, year=2023, hour=12, minute=15, second =0, microsecond=0, fold=0)
  )
  users_achievements = [ua1, ua2]
  return users_achievements

def create_achievements():
  a1 = Achievement(
    name = "Live to Tell the Tale",
    summary = "Escape the landslide.",
    visibility = "false"
    )
  a2 = Achievement(
    name = "Curiosity killed the cat",
    summary = "Enter the portal.",
    visibility = "false"
    )
  achievements = [a1, a2]
  return achievements

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

    print("Seeding users achievements...")
    users_achievements = create_users_achievements()
    db.session.add_all(users_achievements)
    db.session.commit()

    print("Seeding achievements...")
    achievements = create_achievements()
    db.session.add_all(achievements)
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