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

  [
    {
      "cookingTime": "", 
      "directions": "Add chopped strawberries to a large measuring glass. Muddle or mash into a pulp with the back of a spoon. (For a spicy kick, muddle fresh cilantro and two slices of jalape\u00f1o with the strawberries.)\u00a0\nAdd ginger beer, tequila and lime juice and stir to combine.\nFill two copper mugs with ice. Divide tequila mixture among mugs and top up with sparkling water. Garnish each mug with a fresh strawberry and serve.Add chopped strawberries to a large measuring glass. Muddle or mash into a pulp with the back of a spoon. (For a spicy kick, muddle fresh cilantro and two slices of jalape\u00f1o with the strawberries.)Add ginger beer, tequila and lime juice and stir to combine.Fill two copper mugs with ice. Divide tequila mixture among mugs and top up with sparkling water. Garnish each mug with a fresh strawberry and serve.", 
      "img": "https://www.traderjoes.com/TJ_CMS_Content/Images/Recipe/494MainImage.jpg", 
      "prepTime": "5 Minute", 
      "recipe_id": "MWL6CyjVxqoOnYVH55eQ", 
      "serves": "2", 
      "title": "Strawberry Mule"
    }, 
    {
      "cookingTime": "25 - 30 Minute", 
      "directions": "Prepare Pulled Jackfruit: Drain jackfruit and pat dry. Partially shred jackfruit chunks into smaller pieces. In a saut\u00e9 pan, heat olive oil over medium heat. Add jackfruit and saut\u00e9 for five minutes. Add BBQ sauce and water to pan and stir to evenly coat jackfruit. Cover pan and simmer on medium-low heat, 20-25 minutes, stirring occasionally and pulling jackfruit apart as it becomes tender.\nPrepare Tangy Cole Slaw: While jackfruit cooks, in a large bowl, toss cabbage blend with mayonnaise and apple cider vinegar to coat. Season with salt and pepper to taste and set aside.\nPrepare Sandwiches: Place a scoop of pulled jackfruit on the bottom of a bun. Top with diced onions, coleslaw, and bun top. Eat and repeat until satisfied!Prepare Pulled Jackfruit: Drain jackfruit and pat dry. Partially shred jackfruit chunks into smaller pieces. In a saut\u00e9 pan, heat olive oil over medium heat. Add jackfruit and saut\u00e9 for five minutes. Add BBQ sauce and water to pan and stir to evenly coat jackfruit. Cover pan and simmer on medium-low heat, 20-25 minutes, stirring occasionally and pulling jackfruit apart as it becomes tender.Prepare Tangy Cole Slaw: While jackfruit cooks, in a large bowl, toss cabbage blend with mayonnaise and apple cider vinegar to coat. Season with salt and pepper to taste and set aside.Prepare Sandwiches: Place a scoop of pulled jackfruit on the bottom of a bun. Top with diced onions, coleslaw, and bun top. Eat and repeat until satisfied!", 
      "img": "https://www.traderjoes.com/TJ_CMS_Content/Images/Recipe/pulled-jackfruit.jpg", 
      "prepTime": "5 Minute", 
      "recipe_id": "3YiI1WbzAzaj7J4GFbkF", 
      "serves": "6 - 8", 
      "title": "Pulled Jackfruit Sandwich"
    }
  ]

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

    if user:
      response = {
        "errorMessage": "This phone number is already associated to an account. Try logging in.",
        "image": "https://http.cat/409",
      }
      status_code = 409
      print("THIS NUMBER EXISTS ALREADY!")
      print(jsonify(response, status_code))
      return jsonify(response, status_code)

    else:
      userCreated = crud.create_user(fname, lname, phone, password_hash)
    
      userAccountMade = crud.get_user_by_phone(phone)

      response = {
        "image": "https://http.cat/409.jpg",
        "user": userAccountMade.serialize,
      }
      status_code = 200
      print("YOU MADE A LOG IN!")
      print(jsonify(response, status_code))
      return jsonify(response, status_code)


@app.route('/api/users/<user_id>/info')
def test_user(user_id):

  """ THIS IS MY RESPONSE WHEN THE USER SUCCESSFULLY CREATES AN ACCOUNT!
  http://localhost:5000/api/users/1/info

  [
  {
    "image": "https://http.cat/409.jpg", 
    "user": {
      "fname": "Rachel", 
      "lname": "Perkins", 
      "password_hash": "pbkdf2:sha256:150000$PKNx3yep$09b3ab5b7888f125974c6b73c4b34d40738deb45dd0d572d082f4cf15cb1a340", 
      "phone": 4084256597, 
      "user_id": 1
    }
  }, 
  200
]
  """
  userAccountMade = crud.get_user_by_phone(4084256597)
  status_code = 200
  response = {
    "image": "https://http.cat/409.jpg",
    "user": userAccountMade.serialize,
  }

  return jsonify(response, status_code)

########### THIS IS REPLACED WITH REACT ONSUBMIT #############
@app.route('/api/userlogin', methods=['POST'])
def log_in():
    """Log In user."""

    phone_entered = request.form.get('phonein')
    password_entered = request.form.get('passwordin')
    print("WHAT IS GOING ON??")
    print(phone_entered)
    print("WHAT IS GOING ON??")

    user = crud.get_user_by_phone(phone_entered)
    print(user)


    if user and check_password_hash(user.password_hash, password_entered):
      userAccountLoggedIn = crud.get_user_by_phone(phone_entered)

      response = {
        "image": "https://http.cat/409.jpg",
        "user": userAccountLoggedIn.serialize,
      }
      status_code = 200
      print("YOU MADE IT LOG IN!")
      print(jsonify(response, status_code))
      return jsonify(response, status_code)

    if not user:
      response = {
        "errorMessage": "This phone number is not associated to an account. Create your account.",
        "image": "https://http.cat/422",
      }
      status_code = 422
      print("YOU TYPED IN A RANDOM PHONE NUMBER")
      print(jsonify(response, status_code))
      return jsonify(response, status_code)

    if user and not check_password_hash(user.password_hash, password_entered):
      response = {
        "errorMessage": "Password is incorrect. Please try again.",
        "image": "https://http.cat/401",
      }
      status_code = 401
      print("YOU TYPED IN A WRONG PASSWORD")
      print(jsonify(response, status_code))
      return jsonify(response, status_code)

if __name__ == '__main__':
    ####### added by Lucia 2/11
    connect_to_db(app)
    app.debug = True
    app.jinja_env.auto_relaod = app.debug

    DebugToolbarExtension(app)
    ####################################

    app.run(host='0.0.0.0', debug=True)
