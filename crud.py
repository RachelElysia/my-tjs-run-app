"""CRUD operations."""

from model import db, User, Recipe, Tag, Ingredient, connect_to_db

# more and more get_users_recipes, etc functions

def create_user(fname, lname, email, password):   
    """Create and return user."""

    user = User(fname=fname,
                lname=lname,
                email=email,
                password=password)

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


# TESTS: FUNCTIONS TO POPULATE DATA (RECIPES, USERS, TAGS)
def test_every_table():    
    test_user = create_user('Bixby', 'Perkins', 'test@test.com', 'test')
    test_recipe = create_recipe('/img.jpg', '4', 'Bixby Biscuits',
                                'Cook biscuits according to package directions. Remove soy chorizo from casing. In a large skillet over medium heat, add soy chorizo, breaking it up into pieces as it cooks, about 8-10 minutes. When soy chorizo reaches 165ºF, reduce heat to medium. Add salsa and stir to combine. Add almond milk to pan and cook for 5-7 minutes as gravy thickens, stirring occasionally. Remove from heat.\nTo serve, break open 2 biscuits in a shallow serving dish and top with 1/4 of gravy and green chiles, if using. Repeat with remaining biscuits',
                                '2 hours', '1 hour', 'bixbyrecipeid')
    test_tag = create_tag('Meatless', 10)

    print(test_user)
    print(test_recipe)
    print(test_tag)


def get_recipes():
    """Return all recipes."""

    return Recipe.query.all()

def get_tags():
    """Return all tags."""

    return Tag.query.all()

def get_users():
    """Return all users."""

    return User.query.all()

def create_user_recipe(user, recipe):
    """Create and return a new recipe for individual user."""

    user_recipe = Userrecipe(user=user, recipe=recipe)
    db.session.add(rating)
    db.session.commit()

    return user_recipe



# Connect to the database when run crud.py interactively
if __name__ == '__main__':
    from server import app
    connect_to_db(app)