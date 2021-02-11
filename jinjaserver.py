"""Server for TJ shopping by recipe app."""

from flask import Flask, render_template, request, flash, session, redirect
from flask_debugtoolbar import DebugToolbarExtension #added by Lucia
from model import connect_to_db
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)

## added by Lucia
app.secret_key = '123abcEFG'

app.jinja_env.undefined = StrictUndefined
###

@app.route("/")
def show_homepage():
	"""Show the application's homepage."""

	return render_template("homepage.html")

@app.route('/recipes')
def show_recipes():
    """Show all recipes."""

    return render_template('homepage.html')

@app.route('/user')
def view_homepage():
    """View homepage."""

    return render_template('user.html')

@app.route('/users', methods=['POST'])
def register_user():
    """Create a new user."""

    fname = request.form.get('fname')
    lname = request.form.get('lname')
    email = request.form.get('email')
    print(email)
    password = request.form.get('password')
    
    user = crud.get_user_by_email(email)
    print(user)

    if user:
        flash('Email address already associated with an account. Try again.')
    else:
        user = crud.create_user(fname, lname, email, password)
        flash('Account successfully created! Please log in to add favorite recipes!')

    return redirect('/user')


@app.route('/login', methods=['POST'])
def log_in():
    """Log In user."""

    email_entered = request.form.get('email')
    password_entered = request.form.get('password')
    
    user = crud.get_user_by_email(email_entered)

    if user is None:
        flash('This email address is not associated with an account. Please try again.')
        return redirect('/user')
    elif password_entered == user.password:
        session['primary_key'] = user.user_id 
        flash('You are successfully logged in!')
        return redirect('/')
    else:
        flash('Incorrect password. Please try again.')
        return redirect('/user')




if __name__ == '__main__':
    ####### added by Lucia 2/11
    connect_to_db(app)
    app.debug = True
    app.jinja_env.auto_relaod = app.debug

    DebugToolbarExtension(app)
    ####################################

    app.run(host='0.0.0.0', debug=True)
