"""CRUD operations.

recipe 1 id: 08Ifren64xtMVpoG03Qx
recipe 2 id: 08OniGKxjkMtCTb7tX7d

"""

from model import db, User, Recipe, Tag, Ingredient, RecipeTag, UserRecipe, connect_to_db
from random import sample
from sqlalchemy import func, desc #need for count - popular recipes

# CREATE USER, TAG, RECIPE, INGREDIENT

def create_user(fname, lname, phone, password_hash):   
    """Create and return user."""

    user = User(fname=fname,
                lname=lname,
                phone=phone,
                password_hash=password_hash)

    db.session.add(user)
    db.session.commit()
    
    return user

def create_tag(name, tag_id):   
    """Create and return tag."""

    tag = Tag(name=name,
                tag_id=tag_id)

    db.session.add(tag)
    db.session.commit()
    
    return tag

def create_recipe(img, serves, title, directions, cookingTime, prepTime, recipe_id):
    """Create and return recipe."""

    recipe = Recipe(img=img,
                #   tags_full=tags_full,
                #   ingredients_full=ingredients_full,
                  serves=serves,  #tagIds=tagIds,
                  title=title,
                  directions=directions,
                  cookingTime=cookingTime,
                  prepTime=prepTime,
                  recipe_id=recipe_id)
    
    db.session.add(recipe)
    db.session.commit()
    
    return recipe

def create_ingredient(recipe_id, detailed_ingredient, abridged_ingredient):
    """Create and return recipe."""

    ingredient_added = Ingredient(
                  recipe_id=recipe_id,
                  detailed_ingredient=detailed_ingredient,
                  abridged_ingredient=abridged_ingredient
                  )
    
    db.session.add(ingredient_added)
    db.session.commit()
    
    return ingredient_added

# CREATE RELATIONSHIP TABLE
def create_recipe_tag_relationship(recipe_id, tag_id):
    """Create and return a recipe/tag association."""

    recipe_tag = RecipeTag(recipe_id=recipe_id, tag_id=tag_id)

    db.session.add(recipe_tag)
    db.session.commit()

# THIS WILL BE WORKED ON LATER WHEN USERS CAN UPDATE
def create_user_recipe(user_id, recipe_id):
    """Create and return a new recipe for individual user."""

    user_recipe = UserRecipe(user_id=user_id, recipe_id=recipe_id)
    db.session.add(user_recipe)
    db.session.commit()

    return user_recipe

def delete_user_recipe(user_id, recipe_id):
    """Given user_id and recipe_id, deletes relationship from database."""
    
    unwanted_recipe = UserRecipe.query.filter(UserRecipe.user_id == user_id, UserRecipe.recipe_id == recipe_id).one()
    print(unwanted_recipe)
    db.session.delete(unwanted_recipe)
    db.session.commit() 

    if (UserRecipe.query.filter(UserRecipe.user_id == user_id, UserRecipe.recipe_id == recipe_id).one()):
        unwanted_recipe = UserRecipe.query.filter(UserRecipe.user_id == user_id, UserRecipe.recipe_id == recipe_id).one()
        db.session.delete(recipe)
        db.session.commit()


    return None


# TEST FUNCTION TO POPULATE DATA (RECIPES, USERS, TAGS)
def test_every_table():    
    test_user = create_user('Bixby', 'Perkins', 'test1@test1.com', 'test')
    test_recipe = create_recipe('/img.jpg', '4', 'Bixby Biscuits',
                                'Cook biscuits according to package directions. Remove soy chorizo from casing. In a large skillet over medium heat, add soy chorizo, breaking it up into pieces as it cooks, about 8-10 minutes. When soy chorizo reaches 165ºF, reduce heat to medium. Add salsa and stir to combine. Add almond milk to pan and cook for 5-7 minutes as gravy thickens, stirring occasionally. Remove from heat.\nTo serve, break open 2 biscuits in a shallow serving dish and top with 1/4 of gravy and green chiles, if using. Repeat with remaining biscuits',
                                '2 hours', '1 hour', 'bixbyid')
    test_tag = create_tag('Not So Yummy', 999)

    print(test_user)
    print(test_recipe)
    print(test_tag)


def search_recipes(search_phrase):
    """Searches recipes based on the input phrase and returns recipe ids as set."""

    related_recipes_id = set()
    search = "%{}%".format(search_phrase).lower()

    tag_results = Tag.query.filter(Tag.name.ilike(search)).all()
    # print("Tag Results", tag_results)
    for tag in tag_results:
        tag_recipes = get_recipe_ids_by_tag_id(tag.tag_id)
        for recipe in tag_recipes:
            related_recipes_id.add(recipe)
    # print("These are all the related recipe ids:", related_recipes_id)

    ingredients_results = Ingredient.query.filter(Ingredient.detailed_ingredient.ilike(search)).all()
    # print("Ingredients Results", ingredients_results)
    for ingredient in ingredients_results:
        related_recipes_id.add(ingredient.recipe_id) 
    # print("These are all the searches including ingredients as well!", related_recipes_id)

    title_results = Recipe.query.filter(Recipe.title.ilike(search)).all()
    # print("Recipe Title Results", title_results)
    for recipe in title_results:
        related_recipes_id.add(recipe.recipe_id) 

    print("These are all the searches including Title results as well!", related_recipes_id)

    return related_recipes_id


def get_recipes(limit=24):
    """Return not random recipes. Default 24."""

    return Recipe.query.limit(limit).all()

def get_random_recipes(limit=24):
    """Return random recipes. Default 24."""

    return sample(Recipe.query.all(), limit)

def get_recipe_by_id(recipe_id):
    """Return one recipe."""

    return Recipe.query.filter_by(recipe_id=recipe_id).one()

def get_tags():
    """Return all tags."""

    return Tag.query.all()

def get_tag_name(tag_id):
    """Return tag name."""

    return Tag.query.filter(Tag.tag_id == tag_id).one()

def get_users():
    """Return all users."""

    return User.query.all()

def get_user_by_phone(phone):
    """Return a user by phone."""

    return User.query.filter(User.phone == phone).first()

def get_tags_info_by_recipe_id(recipe_id):
    """Return multiple tags.
    
    >>> get_tags_info_by_recipe_id('08Ifren64xtMVpoG03Qx')

    [
        <RecipeTag recipetag_id=1,
        recipe_id=1  
        tag_id=10>
        , 
        <RecipeTag recipetag_id=2,
        recipe_id=2  
        tag_id=47>
    ]
    """
    recipe_tag_id_only = RecipeTag.query.filter(RecipeTag.recipe_id == recipe_id).all()

    all_recipe_tag_info = []

    for tag in recipe_tag_id_only:
        tag_info = Tag.query.filter(Tag.tag_id == tag.tag_id).one()
        all_recipe_tag_info.append(tag_info)

    return all_recipe_tag_info


def get_user_recipes_data(user_id):
    """Given a user_id input, return all the recipes that they have favorited.
    
    >>> get_user_recipes_data(1)
    [
        <Userrecipe user_recipe_id=1
        user_id=1, 
        recipe_id=MWL6CyjVxqoOnYVH55eQ>
        , 
        <Userrecipe user_recipe_id=2
        user_id=1, 
        recipe_id=3YiI1WbzAzaj7J4GFbkF>
    ]
    """

    user_favorites = UserRecipe.query.filter(UserRecipe.user_id == user_id).all()

    all_user_favorites = []
    for recipe in user_favorites:
        recipe_info = Recipe.query.filter(Recipe.recipe_id == recipe.recipe_id).one()
        all_user_favorites.append(recipe_info)
    
    return all_user_favorites

def get_favorite_boolean(user_id, recipe_id):
    """Given a user_id input, return all the recipes that they have favorited.
    
    >>> get_favorite_boolean(1, 'MWL6CyjVxqoOnYVH55eQ')
    True
    """
    
    query = UserRecipe.query.filter(UserRecipe.user_id == user_id, UserRecipe.recipe_id == recipe_id).first()

    return query is not None

def get_popular_recipes(limit=12):
    """Returns the most popular recipes in descending order."""
    most_popular = db.session.query(UserRecipe.recipe_id, func.count(UserRecipe.recipe_id).label('qty')).group_by(UserRecipe.recipe_id).order_by(desc('qty')).limit(limit)

    most_popular_recipes = []
    for recipe in most_popular:
        recipe_info = Recipe.query.filter(Recipe.recipe_id == recipe.recipe_id).one()
        most_popular_recipes.append(recipe_info)
    
    return most_popular_recipes

def get_tag_names_by_recipe_id(recipe_id):
    """Return multiple tags.
    
    >>> get_tag_names_by_recipe_id('08Ifren64xtMVpoG03Qx')

    [
        <RecipeTag recipetag_id=1,
        recipe_id=1  
        tag_id=10>
        , 
        <RecipeTag recipetag_id=2,
        recipe_id=2  
        tag_id=47>
    ]
    """

    #THIS IS WEIRD TO DO TWO QUERIES NO?

    response = RecipeTag.query.filter(RecipeTag.recipe_id == recipe_id).all()

    recipe_tags_names = []

    for item in response:
        tag = Tag.query.filter(Tag.tag_id == item.tag_id).one()
        recipe_tags_names.append(tag.name)

    return recipe_tags_names

def get_recipe_ids_by_tag_id(tag_id):
    """Return multiple recipes.
    
    >>> get_recipe_id_by_tag_id(104)

    [
        <RecipeTag recipetag_id=1,
        recipe_id=1  
        tag_id=10>
        , 
        <RecipeTag recipetag_id=2,
        recipe_id=2  
        tag_id=47>
    ]
    """

    #THIS IS WEIRD TO DO TWO QUERIES NO?

    response = RecipeTag.query.filter(RecipeTag.tag_id == tag_id).all()

    recipe_ids_list = []

    for item in response:
        recipe_id_append = Recipe.query.filter(Recipe.recipe_id == item.recipe_id).one()
        recipe_ids_list.append(recipe_id_append.recipe_id)

    return recipe_ids_list

def get_ingredients_by_recipe_id(recipe_id):
    """Return ingredients for given recipe_id.
    
    >>> get_ingredients_by_recipe_id('08Ifren64xtMVpoG03Qx')

    [
    <Ingredient ingredient_id=1,
    recipe_id=08Ifren64xtMVpoG03Qx,
    detailed_ingredient=1 can TJ's Buttermil>
    , 
    <Ingredient ingredient_id=2,
    recipe_id=08Ifren64xtMVpoG03Qx,
    detailed_ingredient=1 package TJ's Soy C>
    , 
    <Ingredient ingredient_id=3,
    recipe_id=08Ifren64xtMVpoG03Qx,
    detailed_ingredient=2/3 cup TJ's Island >
    , 
    <Ingredient ingredient_id=4,
    recipe_id=08Ifren64xtMVpoG03Qx,
    detailed_ingredient=1 cup TJ's Unsweeten>
    , 
    <Ingredient ingredient_id=5,
    recipe_id=08Ifren64xtMVpoG03Qx,
    detailed_ingredient=TJ's Fire Roasted Di>
    ]
    """

    return db.session.query(Ingredient).filter_by(recipe_id=recipe_id).all()

def get_abridged_ingredients_by_title(title):
    """Return multiple tags.
    
    """
    ingredients_list = []

    ingredients = db.session.query(Ingredient).join(Recipe).filter(Recipe.title == title).all()

    for ingredient in ingredients:
        ingredients_list.append(ingredient.abridged_ingredient)

    return ingredients_list


def resources_page():
    """
    Populates my resources.js page through a resourcespage.txt.
    
    # Test that each line has 4 fields
      count = 0
      for character in line:
            if character == '|':
                count += 1
      if count !== 3:
            print("check line:", index + 1, "has", count + 1, "fields instead of 4.")     
    """

    resources_file = open("resourcespage.txt")

    resources_list = []

    for line in resources_file:

        line_data=line.rstrip().split("|")
        topic = line_data[0]
        details = line_data[1]
        uses = line_data[2]
        resource_url = line_data[3]
        current_dict = {}
        current_dict['topic'] = topic
        current_dict['details'] = details
        current_dict['uses'] = uses
        current_dict['resource_url'] = resource_url
        resources_list.append(current_dict)

    print(resources_list)
    return (resources_list)

def get_ingredients():
    """Return all ingredients."""

    return Ingredient.query.all()

# This connects to the database when running crud.py interactively
if __name__ == '__main__':
    from server import app
    connect_to_db(app)