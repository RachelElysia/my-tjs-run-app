"""Server for TJ shopping by recipe app."""
# Flask app
from flask import Flask, render_template, request, flash, session, redirect, jsonify, make_response
from flask_debugtoolbar import DebugToolbarExtension # required /unused flask server
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Database
from model import connect_to_db
import crud

# Keys, APIs
import os
from twilio.rest import Client

# Other
from jinja2 import StrictUndefined # required /unused flask server
from werkzeug.security import generate_password_hash, check_password_hash


# Added static_url_path 3/10 for next.js static site
app = Flask(__name__, static_url_path='')

# Limit my text message route
# Don't set default limits because they apply to all my routes
limiter = Limiter(
    app,POR
    key_func=get_remote_address,
    default_limits=[]
)

## required /unused flask server ###
app.secret_key = "12321abcba"
app.jinja_env.undefined = StrictUndefined
### end ###

# Text Recipe Data Validation
def recipe_validation(recipes):
  """Cleans my gross data returned from button toggles."""

  recipes_list = recipes.lstrip(',').split(',')
  while('' in recipes_list): 
    recipes_list.remove('') 
    
  return recipes_list

# Creating Text Message
def text_message(fname, recipes_list):
  """Builds the text message."""

  text_message = (f"{fname}'s Groceries List from My TJ's Run!\n ")

  for recipe in recipes_list:
    text_message += f":::{recipe}:::\n"
    ingredients = crud.get_abridged_ingredients_by_title(recipe)
    for ingredient in ingredients:
      if ingredient != None:
        text_message += f"{ingredient}\n"
  
  return text_message



@app.route('/api/sms', methods=['POST'])
@limiter.limit("12/month;10/day;10/hour;1/minute", override_defaults=False, error_message="Texts aren't free, give me a minute.")
def send_sms():
    """Send the SMS."""

    # Data from Request
    data = request.json
    phone = data['user_phone']
    fname = data['user_fname']
    recipes = data['user_recipes']


    # Your Account SID and Auth Token from twilio.com/console
    account_sid = os.environ.get('ACCOUNT_SID_KEY')
    auth_token  = os.environ.get('AUTH_TOKEN_KEY')

    # Send Text Message
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        to=phone, 
        from_="+15402884977",
        body=f"{text_message(fname, recipe_validation(recipes))}"
    )

    print(message.sid)


    # Response
    response = {
      "ok": "Great text message!",
      "errorMessage": "None!",
    }

    return jsonify(response)

@app.route('/')
def show_homepage():
    """Show the application's Flask/Jinja homepage on localhost:5000.

    - Changed this 3/9 to return next.js static index"""
    return app.send_static_file('index.html')

    # return render_template('homepage.html')

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

@app.route('/api/search/<search_phrase>')
def recipes_by_search_phrase(search_phrase):
  """Show all recipes related to the search_phrase."""

  detailed_recipes_by_search = []

  search = str(search_phrase)
  print("This is my search phrase:", search)

  # This crud function returns a list so I don't need to serialize!
  recipe_ids = crud.search_recipes(search)

  print("These are all the matching recipe IDs including Title,\
    Tags, and Ingredients:", recipe_ids)
  
  for id in recipe_ids:
    detailed_recipes_by_search.append(crud.get_recipe_by_id(id))

  serialized_recipe_data_by_search = [i.serialize for i in detailed_recipes_by_search]

  return jsonify(serialized_recipe_data_by_search)

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

  user_favorites_data = crud.get_user_recipes_data(user_id)
  user_favorites =  [i.serialize for i in user_favorites_data]

  return jsonify(user_favorites)

@app.route('/api/users/<user_id>/recipes/<recipe_id>')
def user_recipe_bool(user_id, recipe_id):
  boolean_result = crud.get_favorite_boolean(user_id, recipe_id)
  return jsonify(boolean_result)


@app.route('/api/users/<user_id>/recipes/<recipe_id>/remove', methods=['POST'])
def remove_user_recipe_favorite(user_id, recipe_id):
  """Removes a favorited recipe (user-recipe relationship) in database.

  Example: http://localhost:5000/api/users/1/recipes/MWL6CyjVxqoOnYVH55eQ/remove
  """

  deleted = crud.delete_user_recipe(user_id, recipe_id)

  return jsonify("Deleted relationship between:", user_id, recipe_id)

@app.route('/api/users/<user_id>/recipes/<recipe_id>/add',  methods=['POST'])
def create_user_recipe_favorite(user_id, recipe_id):
  """Creates a favorited recipe (user-recipe relationship) in database.

  Example: http://localhost:5000/api/users/1/recipes/MWL6CyjVxqoOnYVH55eQ/add
  """

  crud.create_user_recipe(user_id, recipe_id)

  return jsonify("favorited")


@app.route('/api/<recipe_id>/ingredients')
def recipes_ingredients_by_id(recipe_id):
  """Show all abridged and detailed ingredients for a recipe.
  
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

  recipe_data = crud.get_ingredients_by_recipe_id(recipe_id)
  serialized_recipe_ingredients =  [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_ingredients)

@app.route('/api/recipes/<recipe_id>')
def recipe_by_id_data(recipe_id):
  """Show a;; information of one recipe."""

  recipe_by_id = crud.get_recipe_by_id(recipe_id)
  serialized_recipe_data = recipe_by_id.serialize

  return jsonify(serialized_recipe_data)

@app.route('/api/recipes_hungry')
def recipes_data_hungry():
  """Show default of 24 recipes.

  You can change get_random_recipes parameter to another value."""

  recipe_data = crud.get_random_recipes()
  serialized_recipe_data = [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_data)

@app.route('/api/popular')
def popular_recipes():
  """Show default of 12 most popular recipes in descending order.

  I changed get_random_recipes parameter to 8 instead."""

  recipe_data = crud.get_popular_recipes(8)
  serialized_recipe_data = [i.serialize for i in recipe_data]

  return jsonify(serialized_recipe_data)


@app.route('/api/users', methods=['POST'])
def register_user():
    """Create a new user."""

    # Data Request
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

      print("YOU MADE A LOG IN!", jsonify(response, status_code))

      return jsonify(response, status_code)


@app.route('/api/users/update', methods=['POST'])
def update_user():
    """Update existing user information."""

    # Data Request
    fname = request.form.get('fname')
    lname = request.form.get('lname')
    new_phone = request.form.get('new_phone')

    user = crud.update_user(fname=fname, lname=lname, new_phone=new_phone)

    userAccountUpdated = crud.get_user_by_phone(new_phone)

    response = {
      "image": "https://http.cat/409.jpg",
      "user": userAccountUpdated.serialize,
    }

    print("YOU UPDATED USER INFORMATION!", jsonify(response, status_code))

    return jsonify(response, status_code)

@app.route('/api/user/<user_id>/delete', methods=['POST'])
def delete_current_user():
    """Delete existing user permanently."""

    password_entered = request.form.get('deletepassword')

    # Data from Request
    data = request.json

    user = crud.get_user_by_id(user_id)

    if user and check_password_hash(user.password_hash, password_entered):
      response_message = crud.delete_user(user.user_id)

    response = {
      "image": "https://http.cat/409.jpg",
      "message": response_message
    }

    user = crud.get_user_by_phone(phone_entered)
    print(user)

    print("YOU DELETED A USER!", jsonify(response, status_code))

    return jsonify(response, status_code)


@app.route('/api/users/<user_id>/info')
def test_user(user_id):

  """ Response after user successfully creates an account:
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

@app.route('/api/resources')
def get_resources():
  """JSON of all my resources for my resources page."""
  resources_data= crud.resources_page()

  return jsonify(resources_data)
@app.route('/api/userlogin', methods=['POST'])
def log_in():
    """Log In user."""

    phone_entered = request.form.get('phonein')
    password_entered = request.form.get('passwordin')
    print(phone_entered)

    user = crud.get_user_by_phone(phone_entered)
    print(user)

    if user and check_password_hash(user.password_hash, password_entered):
      userAccountLoggedIn = crud.get_user_by_phone(phone_entered)

      response = {
        "image": "https://http.cat/409.jpg",
        "user": userAccountLoggedIn.serialize,
      }
      status = 200
      print("YOU MADE IT LOG IN!")
      print(jsonify(response, status))
      return jsonify(response, status)

    if not user:
      response = {
        "errorMessage": "This phone number is not associated to an account. Create your account.",
        "image": "https://http.cat/422",
      }
      status = 422
      print("YOU TYPED IN A RANDOM PHONE NUMBER")
      print(jsonify(response, status))
      return jsonify(response, status)

    if user and not check_password_hash(user.password_hash, password_entered):
      response = {
        "errorMessage": "Password is incorrect. Please try again.",
        "image": "https://http.cat/401",
      }
      status = 401
      print("YOU TYPED IN A WRONG PASSWORD")
      print(jsonify(response, status))
      return jsonify(response, status)

if __name__ == '__main__':
    ### added by Lucia 2/11 debugging jinja ###
    connect_to_db(app)
    app.debug = True
    app.jinja_env.auto_relaod = app.debug

    DebugToolbarExtension(app)
    ### end ###

    print("host on server.py:", os.environ.get('PORT') or '0.0.0.0')

    app.run(host=os.environ.get('PORT') or '0.0.0.0', debug=True)

