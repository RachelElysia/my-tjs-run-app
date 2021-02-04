"""Models for movie ratings app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Recipe(db.Model):
    """Recipes for our Users to add."""

    __tablename__ = "recipes"

    img = db.Column(db.String)
    tags = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text,
                            nullable=False)
    serves = db.Column(db.String)
    tagIds = db.Column(db.String)
    title = db.Column(db.String, 
                        nullable=False
                        )
    directions = db.Column(db.Text,
                           nullable=False)
    cookingTime = db.Column(db.String)
    prepTime = db.Column(db.String)
    id = db.Column(db.String,
                   primary_key = True)

    def __repr__(self):
        return f'''
                <Recipe title={self.title}, 
                ingredients={self.ingredients},
                id={self.id},
                img={self.img}>
                '''

class User(db.Model):
    """Users created."""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key = True)
    fname = db.Column(db.String,
                      nullable=False)
    lname = db.Column(db.String,
                      nullable=False)
    email = db.Column(db.String,
                      nullable=False)
    password = db.Column(db.String,
                      nullable=False) 

    def __repr__(self):
        return f'''
                <User id={self.id}, 
                name={self.fname} {self.lname}, 
                email={self.email}>
                '''
    
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

    connect_to_db(app)
