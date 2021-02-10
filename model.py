"""Models for movie ratings app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Recipe(db.Model):
    """Recipes for our Users to add."""

    __tablename__ = "recipes"

    img = db.Column(db.String(107))
    tags_full = db.Column(db.Text, nullable=False)
    ingredients_full = db.Column(SQLAlchemy.types.ARRAY, nullable=False)
    serves = db.Column(db.String(7))
    # REPEAT tagIds = db.Column(db.String(9))
    title = db.Column(db.String(63), nullable=False)
    directions = db.Column(db.Text, nullable=False)
    cookingTime = db.Column(db.String(36))
    prepTime = db.Column(db.String(16))
    recipe_id = db.Column(db.String(20), primary_key=True)


    ingredients = db.relationship('Ingredient')

    # Need to say the relationship is in the middle table recipetags
    tags = db.relationship('Tag', secondary="recipestags", backref="tags")

    def __repr__(self):
        return f'''
                <Recipe title={self.title}, 
                ingredients={self.ingredients},
                recipe_id={self.recipe_id},
                img={self.img}>
                '''

class Ingredient(db.Model):
    """Ingredients for our Recipes."""

    __tablename__ = "ingredients"

    ingredient_id = db.Column(db.Integer,
                              primary_key = True)
    ingredient = db.Column(db.String(84))
    recipe_id = db.Column(db.String(20),
                          db.ForeignKey('recipes.recipe_id'))

    recipe = db.relationship('Recipe')

    def __repr__(self):
        return f'''
                <Tag ingredient_id={self.ingredient_id}
                name={self.ingredient}, 
                recipe_id={self.recipe_id}>
                '''

class RecipeTag(db.Model):
    """Tags on our Recipes"""

    __tablename__ = 'recipestags'

    recipetag_id = db.Column(db.Integer, nullable=False, primary_key=True)
    recipe_id = db.Column(db.String(20),
                          db.ForeignKey('recipes.recipe_id'),
                          nullable=False)
    tag_id = db.Column(db.Integer,
                          db.ForeignKey('tags.tag_id'),
                          nullable=False)

    def __repr__(self):
        return f'''
                <RecipeTag recipetag_id={self.recipetag_id},
                recipe_id={self.recipetag_id}  
                tag_id={self.tag_id}>
                '''

class Tag(db.Model):
    """Tags used for our Recipes."""

    __tablename__ = "tags"

    name = db.Column(db.String(16), nullable=False)
    tag_id = db.Column(db.Integer, nullable=False, primary_key=True)

    def __repr__(self):
        return f'''
                <Tag name={self.name}, 
                tag_id={self.tag_id}>
                '''

class User(db.Model):
    """Users created."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                      primary_key = True)
    fname = db.Column(db.String(20),
                      nullable=False)
    lname = db.Column(db.String(35),
                      nullable=False)
    email = db.Column(db.String(100),
                      nullable=False)
    password = db.Column(db.String(50),
                      nullable=False) 

    def __repr__(self):
        return f'''
                <User id={self.user_id}, 
                name={self.fname} {self.lname},
                email={self.email}>
                '''
    

# class RecipeIngredient(db.Model):
#     """Ingredient x Recipe Relationship."""

#     __tablename__ = "recipeingredient"

#     r_x_i_id = db.Column(db.Integer, primary_key = True),
#     recipe_id = db.Column(db.String(20), db.ForeignKey('recipes.recipe_id')),
#     ingredient_id = db.Column(db.String(20), db.ForeignKey('ingredients.ingredient_id'))
    
#     def __repr__(self):
#         return f'''
#                 <recipeingredient r_x_i_id={self.r_x_i_id}, 
#                 recipe_id={self.recipe_id},
#                 ingredient_id={self.ingredient_id}>
#                 '''

# class UserRecipe(db.Model):
#     """Ingredients for our Recipes."""

#     __tablename__ = "ingredients"

#     user_recipe_id = db.Column(db.Integer,
#                               primary_key = True)
#     user_id = db.Column(db.String(20),
#                           db.ForeignKey('users.user_id'))
#     recipe_id = db.Column(db.String(20),
#                           db.ForeignKey('recipes.recipe_id'))

#     def __repr__(self):
#         return f'''
#                 <Userrecipe user_recipe_id={self.user_recipe_id}
#                 user_id={self.user_id}, 
#                 recipe_id={self.recipe_id}>
#                 '''  



def connect_to_db(flask_app, db_uri='postgresql:///recipes', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')



# Tests to see if database is populated.
# print(model.db.session.query('recipe').filter_by(title='Sausage & Kale Stuffing'))
# print(Recipe.query.filter(Recipe.name == 'Sausage & Kale Stuffing').all())




if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    import os

    os.system('dropdb recipes')
    os.system('createdb recipes')

    connect_to_db(app)

    db.create_all()


    test = Recipe(img='cool', tags_full='hi',
        ingredients_full='hi', serves='hia',
        title='hello', directions='yo',
        cookingTime='2hours', prepTime='yup', recipe_id='23r')
    