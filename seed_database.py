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

# Recipe data
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


# Ingredients data
ingredients_dict = {}
individual_ingredients_list = []

for recipe in recipe_data:
    for ingredient_list in recipe['ingredients']:
        ingredient_split = re.split('TJ\'s |, ', ingredient_list)

        if len(ingredient_split) > 1:
            if recipe['id'] not in ingredients_dict:
                ingredients_dict[recipe['id']] = []
            ingredients_dict[recipe['id']].append(ingredient_split[1])

for recipe_id, ingredients in ingredients_dict:
    for ingredient in ingredients:
        current_ingredient = crud.create_ingredient(
                                        ingredient,
                                        recipe_id
                                        )
    
        individual_ingredients_list.append(current_ingredient)



# Tags data
with open('data/tags.json') as f:
    tag_data = json.loads(f.read())

tag_list = []

for tag in tag_data:
    current_tag = crud.create_tag(tag['name'],
                                  tag['id'])
    
    tag_list.append(current_tag)
