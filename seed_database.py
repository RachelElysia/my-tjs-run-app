"""Script to seed database."""

import os
import json
from random import choice, randint

import crud
import model
import server

os.system('dropdb recipes')
os.system('createdb recipes')
model.connect_to_db(server.app)
model.db.create_all()

with open('data/recipes.json') as f:
    recipe_data = json.loads(f.read())

recipe_list = []

for recipe in recipe_data:
    # release_date = datetime.strptime(movie['release_date'], '%Y-%m-%d')
    current_recipe = crud.create_recipe(recipe['img'],
                                        recipe['tags'],
                                        recipe['ingredients'],
                                        recipe['serves'],
                                        recipe['tagIds'],
                                        recipe['title'],
                                        recipe['directions'],
                                        recipe['cookingTime'],
                                        recipe['prepTime'],
                                        recipe['id']
                                        )
    
    recipe_list.append(current_recipe)

