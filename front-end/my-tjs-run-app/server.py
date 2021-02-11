#test test

from flask import Flask, render_template, jsonify

app = Flask(__name__)


few_datapoints =  [
  {
    "title": 'Balloonicornuts',
    "description": 'This is a really long "description" to see what is happening to my sentence',
    "img": '/static/img/balloonicorn.jpg'
  },

  {
    "title": 'Float',
    "description": 'I never knew that everything was on a cue. To turn around when all I needed was the truth.',
    "img": '/static/img/float.jpg'
  },

  {
    "title": 'Llambda',
    "description": 'knitting scarves',
    "img": '/static/img/llambda.jpg'
  },


  {
    "title": 'Off-By-One',
    "description": 'climbing mountains',
    "img": '/static/img/off-by-one.jpg'
  },

  {
    "title": 'Seed.py',
    "description": 'making curry dishes',
    "img": '/static/img/seedpy.jpg'
  },

  {
    "title": 'Polymorphism',
    "description": 'costumes',
    "img": '/static/img/polymorphism.jpg'
  },

  {
    "title": 'Short Stack Overflow',
    "description": 'ocean animal trivia',
    "img": '/static/img/shortstack-overflow.jpg'
  },

  {
    "title": 'Merge',
    "description": 'bullet journaling',
    "img": '/static/img/merge.jpg'
  }
]

@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('homepage.html')


@app.route('/recipes')
def show_recipes():
    """Show all recipes."""

    return render_template('recipes.html')

@app.route('/recipes_data')
def recipes_data():
    """Show all recipes."""

    return jsonify(few_datapoints)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
