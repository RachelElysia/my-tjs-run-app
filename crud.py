"""CRUD operations."""

from model import db, User, Recipe, connect_to_db

def create_user(fname, lname, email, password):   
    """Create and return user."""

    user = User(fname=fname,
                lname=lname,
                email=email,
                password=password)

    db.session.add(user)
    db.session.commit()
    
    return user

def create_tag(name, id):   
    """Create and return tag."""

    tag = Tag(name=name,
                id=id)

    db.session.add(tag)
    db.session.commit()
    
    return tag


def create_recipe(img, tags, ingredients, serves, tagIds, title, directions, cookingTime, prepTime, id):
    """Create and return recipe."""

    recipe = Recipe(img=img,
                  tags=tags,
                  ingredients=ingredients,
                  serves=serves,
                  tagIds=tagIds,
                  title=title,
                  directions=directions,
                  cookingTime=cookingTime,
                  prepTime=prepTime,
                  id=id
                  )
    
    db.session.add(recipe)
    db.session.commit()
    
    return recipe

def test_every_table():    
    test_user = create_user('Bixby', 'Perkins', 'test@test.com', 'test')
    test_recipe = create_recipe('/img.jpg', 'tags', 'ingredients', '4 servings', 'tagIds', 'title', 'directions', 'cookingTime', 'prepTime', id)
    test_tag = create_tag('Meatless', 10)

# Connect to the database when run crud.py interactively
if __name__ == '__main__':
    from server import app
    connect_to_db(app)