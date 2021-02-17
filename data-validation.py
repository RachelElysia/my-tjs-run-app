""" Check how long strings are, practice parsing ingredients."""
import json
import re

# JSON Fixes from Original API
# Added TJ's in several items increasing abridged ingredients (3 large eggs)
# Found and replace all 1300 apostrophe's that were slanted apostrophes
# Fixed minor bugs based on my print

with open('data/recipes.json') as f:
    recipe_data = json.loads(f.read())

print("\n\n*****\n\nFIRST DATA POINT ONLY\n\n")
print(recipe_data[0])
print("\n\nFIRST DATA POINT ONLY\n\n*****\n\n")

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
# longest_ingredient_length = 84
# longest_detailed_ingredient_name = 197
abridged_ingredients_dict = {}
detailed_ingredients_dict = {}
longest_ingredient_name = 0
longest_detailed_ingredient_name = 0

for recipe in recipe_data:
    recipe_id = recipe['id']
    for detailed_ingredient in recipe['ingredients']:

        # Detailed Dictionary
        if recipe['id'] not in detailed_ingredients_dict:
            detailed_ingredients_dict[recipe['id']] = []  
        detailed_ingredients_dict[recipe['id']].append(detailed_ingredient)             

        # Longest Detailed Ingredient Length
        if len(detailed_ingredient) > longest_detailed_ingredient_name:
            longest_detailed_ingredient_name = len(detailed_ingredient)

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

            # Find longest ingredient
            if len(ingredient_split[1]) > longest_ingredient_name:
                longest_ingredient_name = len(ingredient_split[1])

# print(longest_detailed_ingredient_name)
# print(longest_ingredient_name)
# print(next(iter(detailed_ingredients_dict.items())))
# print(next(iter(abridged_ingredients_dict.items())))

with open('data/tags.json') as g:
    tag_data = json.loads(g.read())

# Find longest tag
longest_tag_name = 0
for tag in  tag_data:
    if len(tag['name']) > longest_tag_name:
        longest_tag_name = len(tag['name'])
#print(longest_tag_name)



