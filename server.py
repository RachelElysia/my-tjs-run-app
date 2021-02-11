"""Server for TJ shopping by recipe app."""

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def show_homepage():
	"""Show the application's homepage."""

	return render_template("homepage.html")

@app.route('/recipes')
def show_recipes():
    """Show all recipes."""

    return render_template('homepage.html')

@app.route('/user')
def show_recipes():
    """Log in/Sign Up page."""

    return render_template('user.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
