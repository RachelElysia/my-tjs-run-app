"""Server for TJ shopping by recipe app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension #added by Lucia
from model import connect_to_db
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)


## added by Lucia
app.secret_key = '123abcEFG'

app.jinja_env.undefined = StrictUndefined
###

# few_datapoints =  [
#   {
#     "title": 'Balloonicornuts',
#     "description": 'This is a really long "description" to see what is happening to my sentence',
#     "img": '/static/img/balloonicorn.jpg'
#   },

#   {
#     "title": 'Float',
#     "description": 'I never knew that everything was on a cue. To turn around when all I needed was the truth.',
#     "img": '/static/img/float.jpg'
#   },

#   {
#     "title": 'Llambda',
#     "description": 'knitting scarves',
#     "img": '/static/img/llambda.jpg'
#   },


#   {
#     "title": 'Off-By-One',
#     "description": 'climbing mountains',
#     "img": '/static/img/off-by-one.jpg'
#   },

#   {
#     "title": 'Seed.py',
#     "description": 'making curry dishes',
#     "img": '/static/img/seedpy.jpg'
#   },

#   {
#     "title": 'Polymorphism',
#     "description": 'costumes',
#     "img": '/static/img/polymorphism.jpg'
#   },

#   {
#     "title": 'Short Stack Overflow',
#     "description": 'ocean animal trivia',
#     "img": '/static/img/shortstack-overflow.jpg'
#   },

#   {
#     "title": 'Merge',
#     "description": 'bullet journaling',
#     "img": '/static/img/merge.jpg'
#   }
# ]

@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('homepage.html')


@app.route('/recipes')
def show_recipes():
    """Show all recipes."""

    return render_template('recipes.html')

@app.route('/recipes/<recipe_by_id>')
def show_one_recipe(recipe_by_id):
    """Show one recipe."""

    return render_template('recipe.html', recipe_id=recipe_by_id)

# @app.route('/recipes_data')
# def recipes_data():
#     """Show all recipes."""

#     return jsonify(few_datapoints)

@app.route('/api/recipes')
def recipes_data():
  """Show all recipes."""

  # The default is 24, you can change this parameter
  recipe_data = crud.get_recipes()

  serialized_recipe_data = [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_data)


@app.route('/api/recipes/<recipe_id>')
def recipe_by_id_data(recipe_id):
  """Show one recipes."""

  # The default is 24, you can change this parameter
  recipe_by_id = crud.get_recipe_by_id(recipe_id)

  serialized_recipe_data = [recipe_by_id.serialize]

  return jsonify(serialized_recipe_data)

@app.route('/api/recipes_hungry')
def recipes_data_hungry():
  """Show all recipes."""

  # The default is 24, you can change this parameter
  recipe_data = crud.get_recipes(48)

  serialized_recipe_data = [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_data)

if __name__ == '__main__':
    ####### added by Lucia 2/11
    connect_to_db(app)
    app.debug = True
    app.jinja_env.auto_relaod = app.debug

    DebugToolbarExtension(app)
    ####################################

    app.run(host='0.0.0.0', debug=True)
