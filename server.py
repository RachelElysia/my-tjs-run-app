"""Server for TJ shopping by recipe app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify, make_response
from flask_debugtoolbar import DebugToolbarExtension #added by Lucia
from model import connect_to_db
import crud
from jinja2 import StrictUndefined
from werkzeug.security import generate_password_hash, check_password_hash


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

@app.route('/api/recipes/random')
def recipes_random_data():
  """Show random recipes."""

  # The default is 24, you can change this parameter
  recipe_data = crud.get_random_recipes()

  serialized_recipe_data = [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_data)

@app.route('/api/tags/<tag_id>')
def recipes_by_tag_id(tag_id):
  """Show all recipes and their info for a tag.
  
  http://localhost:5000/api/tags/104
  SHOWS JSON:
[
  10 big objects
]
  
  """
    
  # This crud function returns a list so I don't need to serialize!
  recipe_ids = crud.get_recipe_ids_by_tag_id(tag_id)

  detailed_recipes_by_tag = []

  for id in recipe_ids:
    detailed_recipes_by_tag.append(crud.get_recipe_by_id(id))

  serialized_recipe_data_by_tag = [i.serialize for i in detailed_recipes_by_tag]

  return jsonify(serialized_recipe_data_by_tag)

@app.route('/api/tags/<tag_id>/name')
def tag_name_by_tag_id(tag_id):
  """Show all recipes and their info for a tag.
  
  http://localhost:5000/api/tags/104/name
  SHOWS JSON:
[
  cocktails
]
  
  """
    
  # This crud function returns a list so I don't need to serialize!
  tag_name = crud.get_tag_name(tag_id)

  return jsonify(tag_name.name)

@app.route('/api/<recipe_id>/tags')
def recipes_tag_names_by_id(recipe_id):
  """Show all tags for a recipe.
  
  http://localhost:5000/api/08Ifren64xtMVpoG03Qx/tags
  SHOWS JSON:

[
  {
    "name": "Meatless", 
    "tag_id": 10
  }, 
  {
    "name": "Salsa", 
    "tag_id": 47
  }
]
  """
    
  recipe_tags_data = crud.get_tags_info_by_recipe_id(recipe_id)

  serialized_tag_info =  [i.serialize for i in recipe_tags_data]

  return jsonify(serialized_tag_info)


@app.route('/api/users/<user_id>/recipes')
def user_recipes_by_user_id(user_id):
  """Show all tags for a recipe.
  
  http://localhost:5000/api/1/recipes
  SHOWS JSON:


  """
    
  userfavoritesdata = crud.get_user_recipes_data(user_id)

  userfavorites =  [i.serialize for i in userfavoritesdata]

  return jsonify(userfavorites)


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
  recipe_data = crud.get_random_recipes(48)

  serialized_recipe_data = [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_data)

########### THIS IS REPLACED WITH REACT ONSUBMIT #############
@app.route('/api/users', methods=['POST'])
def register_user():
    """Create a new user."""

    fname = request.form.get('fname')
    lname = request.form.get('lname')
    phone = request.form.get('phone')
    password_hash = generate_password_hash(request.form.get('password'))
    
    user = crud.get_user_by_phone(phone)

    # ONLY IF YOU'RE USING PYTHON FOR FRONT END
    # NEED JAVASCRIPT ALERT
    # if user:
    #     flash('Phone number already associated to an account. Try again.')
    # else:
    #     user = crud.create_user(fname, lname, phone, password_hash)
    #     flash('Account successfully created! Please log in to favorite recipes.')

    if user:
      response = make_response(jsonify(
        {
          "errorMessage": "This phone number is already associated to an account. Try logging in.",
          "image": "https://http.cat/409.jpg",
        }
      ))

      return response
    
    else:
      userCreated = crud.create_user(fname, lname, phone, password_hash)
      
      return jsonify(userCreated)



########### THIS IS REPLACED WITH REACT ONSUBMIT #############
@app.route('/api/userlogin', methods=['POST'])
def log_in():
    """Log In user."""

    phone_entered = request.form.get('phone')

    user = crud.get_user_by_phone(phone_entered)

    if user is None:
        flash('This phone number is not associated with an account. Please try again.')
    

    # ONLY IF YOU'RE USING PYTHON FOR FRONT END
    # NEED JAVASCRIPT ALERT
    # WE SPEAK IN JSON ONLY
    # first value is the password_hash, second value is the password entered
    # elif check_password_hash(user.password_hash, request.form.get('password')):
    #     flash('You are successfully logged in!')
    # else:
    #     flash('Incorrect password. Please try again.')

    return 

if __name__ == '__main__':
    ####### added by Lucia 2/11
    connect_to_db(app)
    app.debug = True
    app.jinja_env.auto_relaod = app.debug

    DebugToolbarExtension(app)
    ####################################

    app.run(host='0.0.0.0', debug=True)
