"""Script to seed database."""

import os
import json
from random import choice, randint
import re # this is to help split by two delimiters
import crud

# I COMMENTED THIS OUT BECAUSE  I DONT WANT TO DROP AND RECREATE A NEW DATA BASE ANYTIME SOON
# DEEP CLEANED recipes.json API and reseeded - 3/7/21
# import model
# import server

# os.system('dropdb recipes')
# os.system('createdb recipes')
# model.connect_to_db(server.app)
# model.db.create_all()

# Populate Tags DATA table (2 Columns, 2 Parameters, PK in API)
with open('data/tags.json') as g:
    tag_data = json.loads(g.read())

tag_list = []

for tag in tag_data:
    current_tag = crud.create_tag(tag['name'],
                                  tag['id'])
    
    tag_list.append(current_tag)

# Populate Recipe DATA table (7 columns, 7 parameters, PK in API)
with open('data/recipes.json') as f:
    recipe_data = json.loads(f.read())

recipe_list = []

for recipe in recipe_data:
    current_recipe = crud.create_recipe(recipe['img'],
                                        recipe['serves'],
                                        recipe['title'],
                                        recipe['directions'],
                                        recipe['cookingTime'],
                                        recipe['prepTime'],
                                        recipe['id']
                                        )
    recipe_list.append(current_recipe)


# Populate Ingredients DATA table (4 Columns, 3 Parameters, Generate PK)
abridged_ingredients_dict = {}
detailed_ingredients_dict = {}

for recipe in recipe_data:

    for detailed_ingredient in recipe['ingredients']:

        # Detailed Dictionary
        if recipe['id'] not in detailed_ingredients_dict:
            detailed_ingredients_dict[recipe['id']] = []  
        detailed_ingredients_dict[recipe['id']].append(detailed_ingredient)             

        # Split detailed ingredient
        ingredient_split = re.split('TJ\'s |, ', detailed_ingredient)
        # print(ingredient_split)

        # Abridged Dictionary
        if len(ingredient_split) > 1:
            if recipe['id'] not in abridged_ingredients_dict:
                abridged_ingredients_dict[recipe['id']] = []
            abridged_ingredient = ingredient_split[1]
            abridged_ingredients_dict[recipe['id']].append(abridged_ingredient)
            # print(ingredient_split[1])
        else:
            abridged_ingredient = None

        current_ingredient = crud.create_ingredient(
                                        recipe['id'],
                                        detailed_ingredient,
                                        abridged_ingredient
                                        )

    # Populate Recipe Tags RELATIONSHIP table
    for tag in recipe['tagIds']:

        current_tag = crud.create_recipe_tag_relationship(
                                        recipe['id'],
                                        tag
                                        )

