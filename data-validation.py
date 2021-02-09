""" Check how long strings are, practice parsing ingredients."""
import json
import re

with open('data/recipes.json') as f:
    recipe_data = json.loads(f.read())

print(recipe_data[0])

# Found longest_img_url = 107
longest_img_url = 0
for recipe in recipe_data:
   length_recipe_url = len(recipe['img'])
   if length_recipe_url > longest_img_url:
       longest_img_url = length_recipe_url
# print(longest_img_url)

# Found longest_recipe_id = 20
longest_recipe_id = 0
for recipe in recipe_data:
   length_recipe_id = len(recipe['id'])
   if length_recipe_id > longest_recipe_id:
       longest_recipe_id = length_recipe_id
# print(longest_recipe_id)

# Found longest_title = 63
longest_title = 0
for recipe in recipe_data:
   length_title = len(recipe['title'])
   if length_title > longest_title:
       longest_title = length_title
# print(longest_title)

# Found longest_cooktime = 36
longest_cooktime = 0
for recipe in recipe_data:
   length_cooktime = len(recipe['cookingTime'])
   if length_cooktime > longest_cooktime:
       longest_cooktime = length_cooktime
# print(longest_cooktime)

# Found longest_serves = 7
longest_serves = 0
for recipe in recipe_data:
   length_serves = len(recipe['serves'])
   if length_serves > longest_serves:
       longest_serves = length_serves
#  print(longest_serves)


# Found longest_preptime = 16
# Found bug with "whitespace Print Recipe" attached to preptime
# Fixed 11 bugs in recipes.json
longest_preptime = 0
longest_preptime_text = ""
for recipe in recipe_data:
   length_preptime = len(recipe['prepTime'])
   if length_preptime > longest_preptime:
       longest_preptime = length_preptime
       longest_preptime_text = recipe['prepTime']
# print(longest_preptime)
# print(longest_preptime_text)


# Found longest_tagids = 9
longest_tagids = 0
for recipe in recipe_data:
   length_tagids = len(recipe['tagIds'])
   if length_tagids > longest_tagids:
       longest_tagids = length_tagids
# print(longest_tagids)


# THIS IS WHERE I WILL PRACTICE PARSING DATA FOR INGREDIENTS

# for recipe in recipe_data:
ingredients_dict = {}
longest_ingredient_name = 0
# Fixed bug, left off TJ's in 3 large eggs
# Had to find and replace all 1300 apostrophe's that were slanted apostrophes
# Fixed minor bugs in JSON file based on my print
for recipe in recipe_data:
    for ingredient_list in recipe['ingredients']:
        ingredient_split = re.split('TJ\'s |, ', ingredient_list)
        # print(ingredient_split)

        if len(ingredient_split) > 1:
            if recipe['id'] not in ingredients_dict:
                ingredients_dict[recipe['id']] = []
            ingredients_dict[recipe['id']].append(ingredient_split[1])
            if len(ingredient_split[1]) > longest_ingredient_name:
                longest_ingredient_name = len(ingredient_split[1])
                print(ingredient_split[1])
# print(ingredients_dict)
print(longest_ingredient_name)



