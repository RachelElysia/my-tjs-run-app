"""Models for movie ratings app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """Users created."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                      primary_key = True)
    fname = db.Column(db.String(20),
                      nullable=False)
    lname = db.Column(db.String(35),
                      nullable=False)
    phone = db.Column(db.BigInteger(),
                      nullable=False)
    password_hash = db.Column(db.String(100),
                      nullable=False) 
    
    # # Password hashing functions below User Model
    # def set_password(self, password):
    #     self.password_hash = generate_password_hash(password)
    # def check_password(self, password):
    #     return check_password_hash(self.password_hash, password)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'user_id'         : self.user_id,
            'fname'           : self.fname,
            'lname'           : self.lname,
            'phone'           : self.phone,
            'password_hash'   : self.password_hash
        }

    def __repr__(self):
        return f'''
                <User id={self.user_id}, 
                name={self.fname} {self.lname},
                phone={self.phone}>
                '''


class Recipe(db.Model):
    """Recipes for our Users to add."""

    __tablename__ = "recipes"
    # __searchable__ = ['title', 'ingredients', 'tags']

    img = db.Column(db.String(107))
    # tags_full = db.Column(db.Text, nullable=False)
    # ingredients_full = db.Column(SQLAlchemy.types.ARRAY, nullable=False)
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


    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'img'         : self.img,
            'serves'      : self.serves,
            'title'       : self.title,
            'directions'  : self.directions,
            'cookingTime' : self.cookingTime,
            'prepTime'    : self.prepTime,
            'recipe_id'   : self.recipe_id
        }

    @property
    def serialize_many2many(self):
       """
       Return object's relations in easily serializable format.
       NB! Calls many2many's serialize property.
       """
       return [ item.serialize for item in self.ingredients]

    def __repr__(self):
        return f'''
                <Recipe title={self.title}, 
                recipe_id={self.recipe_id},
                img={self.img}>
                '''


class Ingredient(db.Model):
    """Ingredients for our Recipes."""

    __tablename__ = "ingredients"

    ingredient_id = db.Column(db.Integer,
                              primary_key = True)
    recipe_id = db.Column(db.String(20),
                          db.ForeignKey('recipes.recipe_id'))
    detailed_ingredient = db.Column(db.String(197), nullable=False)
    abridged_ingredient = db.Column(db.String(84))

    recipe = db.relationship('Recipe')

    def __repr__(self):
        return f'''
                <Ingredient ingredient_id={self.ingredient_id},
                recipe_id={self.recipe_id},
                detailed_ingredient={self.detailed_ingredient[0:20]}>
                '''

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'recipe_id'                 : self.recipe_id,
            'detailed_ingredient'       : self.detailed_ingredient,
            'abridged_ingredient'       : self.abridged_ingredient
        }


class Tag(db.Model):
    """Tags used for our Recipes."""

    __tablename__ = "tags"

    name = db.Column(db.String(16), nullable=False)
    tag_id = db.Column(db.Integer, nullable=False, primary_key=True)


    recipes = db.relationship('Recipe', secondary="recipestags", backref="recipes")

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'name'         : self.name,
            'tag_id'       : self.tag_id,
        }

    def __repr__(self):
        return f'''
                <Tag name={self.name}, 
                tag_id={self.tag_id}>
                '''


class RecipeTag(db.Model):
    """Tags on our Recipes relationship."""

    __tablename__ = 'recipestags'

    recipetag_id = db.Column(db.Integer, nullable=False, primary_key=True)
    recipe_id = db.Column(db.String(20),
                          db.ForeignKey('recipes.recipe_id'),
                          nullable=False)
    tag_id = db.Column(db.Integer,
                          db.ForeignKey('tags.tag_id'),
                          nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {'recipetag_id' : self.recipetag_id,
                 'recipe_id'   : self.recipe_id,
                 'tag_id'    : self.tag_id
                }


    def __repr__(self):
        return f'''
                <RecipeTag recipetag_id={self.recipetag_id},
                recipe_id={self.recipetag_id}  
                tag_id={self.tag_id}>
                '''

# THIS MIDDLE TABLE IS UNNEEDED BECAUSE INGREDIENTS HAVE RECIPE ID ON THEM!
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

# This will be called on in the APP using crud.py create_user_recipes()
class UserRecipe(db.Model):
    """Favorite Recipes from our Users."""

    __tablename__ = "favoriterecipes"

    user_recipe_id = db.Column(db.Integer,
                              primary_key = True, autoincrement=True)
    user_id = db.Column(db.Integer,
                          db.ForeignKey('users.user_id'))
    recipe_id = db.Column(db.String(20),
                          db.ForeignKey('recipes.recipe_id'))

    def __repr__(self):
        return f'''
                <Userrecipe user_recipe_id={self.user_recipe_id}
                user_id={self.user_id}, 
                recipe_id={self.recipe_id}>
                '''  







# How to connect my app to the DB
def connect_to_db(flask_app, db_uri=os.environ['DATABASE_URL'] or 'postgresql:///recipes', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    flask_app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


# These Test Prints don't work anymore
# print(model.db.session.query('recipe').filter_by(title='Sausage & Kale Stuffing'))
# print(Recipe.query.filter(Recipe.name == 'Sausage & Kale Stuffing').all())



if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

# uncomment the next three when if wanting to reseed database!
# had to do this 2/16 to fix abridged_ingredients
# deep cleaned recipes.json api and reseeded 3/7
    import os

    os.system('dropdb recipes')
    os.system('createdb recipes')

    # connect_to_db(app)

    # db.create_all()


    # test_recipe = Recipe(img='cool', tags_full='hi',
    #     ingredients_full='hi', serves='hia',
    #     title='hello', directions='yo',
    #     cookingTime='2hours', prepTime='yup', recipe_id='23r')
    