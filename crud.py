"""CRUD operations."""

from model import db, User, Recipe, Tag, Ingredient, RecipeTag, UserRecipe, connect_to_db
from random import sample

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

# CREATE RELATIONSHIP TABLES

def create_recipe_tag_relationship(recipe_id, tag_id):
    """Create and return a recipe/tag association."""

    recipe_tag = RecipeTag(recipe_id=recipe_id, tag_id=tag_id)

    db.session.add(recipe_tag)
    db.session.commit()

# A middle table is unneeded because they share FKs and it's a one to many relationship
# Why 1 to many? It was too hard to get the single ingredient without instructions to make many to many
# def create_recipe_ingredient_relationship(recipe_id, ingredient_id):
#     """Create and return a recipe/ingredient association."""

#     recipe_ingredient = RecipeIngredient(recipe_id=recipe_id, ingredient_id=ingredient_id)

#     db.session.add(recipe_ingredient)
#     db.session.commit()

# THIS WILL BE WORKED ON LATER WHEN USERS CAN UPDATE
def create_user_recipe(user_id, recipe_id):
    """Create and return a new recipe for individual user.
    
    I'm user 1, I have 2 things on here.
    """

    user_recipe = UserRecipe(user_id=user_id, recipe_id=recipe_id)
    db.session.add(user_recipe)
    db.session.commit()

    return user_recipe

def delete_user_recipe(user_id, recipe_id):

    UserRecipe.query.filter(UserRecipe.user_id == user_id, UserRecipe.recipe_id == recipe_id).delete()

#MY BOOL

# TESTS: FUNCTIONS TO POPULATE DATA (RECIPES, USERS, TAGS)

def test_every_table():    
    test_user = create_user('Bixby', 'Perkins', 'test1@test1.com', 'test')
    test_recipe = create_recipe('/img.jpg', '4', 'Bixby Biscuits',
                                'Cook biscuits according to package directions. Remove soy chorizo from casing. In a large skillet over medium heat, add soy chorizo, breaking it up into pieces as it cooks, about 8-10 minutes. When soy chorizo reaches 165ºF, reduce heat to medium. Add salsa and stir to combine. Add almond milk to pan and cook for 5-7 minutes as gravy thickens, stirring occasionally. Remove from heat.\nTo serve, break open 2 biscuits in a shallow serving dish and top with 1/4 of gravy and green chiles, if using. Repeat with remaining biscuits',
                                '2 hours', '1 hour', 'bixbyid')
    test_tag = create_tag('Not So Yummy', 999)


    print(test_user)
    print(test_recipe)
    print(test_tag)


# QUERY FUNCTIONS:

# Use this function to create 24 recipes JSON

def get_recipes(limit=24):
    """Return all recipes. Default 24."""

    return Recipe.query.limit(limit).all()


def get_random_recipes(limit=24):
    """Return all recipes. Default 24."""

    return sample(Recipe.query.all(), limit)

def get_recipe_by_id(recipe_id):
    """Return one recipe."""

    return Recipe.query.filter_by(recipe_id=recipe_id).one()

# recipe 1 id: 08Ifren64xtMVpoG03Qx
# recipe 2 id: 08OniGKxjkMtCTb7tX7d

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
    
    query = UserRecipe.query.filter(UserRecipe.user_id == user_id, UserRecipe.recipe_id == recipe_id).first()

    return query is not None


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


# This went the wrong way, save this just in case
# def get_tag_names_by_recipe_id(recipe_id):
#     """Return tag names attached to recipe_id"""
    
#     joined = db.session.query(Recipe).options(db.joinedload('tags')).all();


#     return joined

def get_ingredients_by_recipe_id(recipe_id):
    """Return multiple tags.
    
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


def get_ingredients():
    """Return all ingredients."""

    return Ingredient.query.all()

# This connects to the database when running crud.py interactively
if __name__ == '__main__':
    from server import app
    connect_to_db(app)