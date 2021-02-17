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

########### THIS IS REPLACED WITH REACT ONSUBMIT #############
@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('homepage.html')


########### THIS IS REPLACED WITH REACT ONSUBMIT #############
# @app.route('/recipes')
# def show_recipes():
#     """Show all recipes."""

#     return render_template('recipes.html')

# @app.route('/recipes/<recipe_by_id>')
# def show_one_recipe(recipe_by_id):
#     """Show one recipe."""

#     return render_template('recipe.html', recipe_id=recipe_by_id)

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

@app.route('/api/<recipe_id>/tags')
def recipes_tags_by_id(recipe_id):
  """Show all tags for a recipe.
  
  http://localhost:5000/api/08Ifren64xtMVpoG03Qx/tags
  SHOWS JSON:
  [
  {
    "recipe_id": "08Ifren64xtMVpoG03Qx", 
    "recipetag_id": 1, 
    "tag_id": 10
  }, 
  {
    "recipe_id": "08Ifren64xtMVpoG03Qx", 
    "recipetag_id": 2, 
    "tag_id": 47
  }
]
  
  """
    
  # The default is 24, you can change this parameter
  recipe_data = crud.get_tags_by_recipe_id(recipe_id)

  serialized_recipe_tags =  [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_tags)


@app.route('/api/<recipe_id>/tagnames')
def recipes_tag_names_by_id(recipe_id):
  """Show all tags for a recipe.
  
  http://localhost:5000/api/08Ifren64xtMVpoG03Qx/tagnames
  SHOWS JSON:

  [
  "Meatless", 
  "Salsa"
]
  """
    
  recipe_tags_names_data = crud.get_tag_names_by_recipe_id(recipe_id)

  return jsonify(recipe_tags_names_data)



@app.route('/api/<recipe_id>/ingredients')
def recipes_ingredients_by_id(recipe_id):
  """Show all ingredients for a recipe.
  
  http://localhost:5000/api/08Ifren64xtMVpoG03Qx/ingredients
  SHOWS JSON:

    [
  {
    "abridged_ingredient": "Buttermilk Biscuits", 
    "detailed_ingredient": "1 can TJ's Buttermilk Biscuits", 
    "recipe_id": "08Ifren64xtMVpoG03Qx"
  }, 
  {
    "abridged_ingredient": "Soy Chorizo", 
    "detailed_ingredient": "1 package TJ's Soy Chorizo", 
    "recipe_id": "08Ifren64xtMVpoG03Qx"
  }, 
  {
    "abridged_ingredient": "Island Salsa", 
    "detailed_ingredient": "2/3 cup TJ's Island Salsa", 
    "recipe_id": "08Ifren64xtMVpoG03Qx"
  }, 
  {
    "abridged_ingredient": "Unsweetened Almond Milk", 
    "detailed_ingredient": "1 cup TJ's Unsweetened Almond Milk", 
    "recipe_id": "08Ifren64xtMVpoG03Qx"
  }, 
  {
    "abridged_ingredient": "Fire Roasted Diced Green Chiles", 
    "detailed_ingredient": "TJ's Fire Roasted Diced Green Chiles, for garnish (optional)", 
    "recipe_id": "08Ifren64xtMVpoG03Qx"
  }
    ]  
  """

  # The default is 24, you can change this parameter
  recipe_data = crud.get_ingredients_by_recipe_id(recipe_id)

  serialized_recipe_ingredients =  [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_ingredients)

@app.route('/api/recipes/<recipe_id>')
def recipe_by_id_data(recipe_id):
  """Show one recipes."""

  recipe_by_id = crud.get_recipe_by_id(recipe_id)

# BRACKETS OR NO BRACKETS, THIS IS A SINGLE RECIPE
  serialized_recipe_data = recipe_by_id.serialize

  return jsonify(serialized_recipe_data)


@app.route('/api/recipes_hungry')
def recipes_data_hungry():
  """Show all recipes."""

  # The default is 24, you can change this parameter
  recipe_data = crud.get_recipes(48)

  serialized_recipe_data = [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_data)

########### THIS IS REPLACED WITH REACT ONSUBMIT #############
@app.route('/users', methods=['POST'])
def register_user():
    """Create a new user."""

    fname = request.form.get('fname')
    lname = request.form.get('lname')
    email = request.form.get('email')
    password_hash = request.form.get('password_hash')
    
    user = crud.get_user_by_email(email)

    if user:
        flash('Email address already associated to an account. Try again.')
    else:
        user = crud.create_user(email, password)
        flash('Account successfully created! Please log in to rate movies.')

    return redirect('/')

########### THIS IS REPLACED WITH REACT ONSUBMIT #############
@app.route('/log-in', methods=['POST'])
def log_in():
    """Log In user."""

    email_entered = request.form.get('email')
    password_entered = request.form.get('password_hash')
    
    user = crud.get_user_by_email(email_entered)

    if user is None:
        flash('This email address is not associated with an account. Please try again.')
    elif password_entered == user.password_hash:
        session['primary_key'] = user.user_id 
        flash('You are successfully logged in!')
    else:
        flash('Incorrect password. Please try again.')

    return redirect('/')

if __name__ == '__main__':
    ####### added by Lucia 2/11
    connect_to_db(app)
    app.debug = True
    app.jinja_env.auto_relaod = app.debug

    DebugToolbarExtension(app)
    ####################################

    app.run(host='0.0.0.0', debug=True)
