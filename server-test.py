from unittest import TestCase
from server import app


### ADDED TO TRY TO DEBUG KEYERROR
from flask_debugtoolbar import DebugToolbarExtension #added by Lucia
from jinja2 import StrictUndefined



## added by Lucia
app.secret_key = '123abcEFG'

app.jinja_env.undefined = StrictUndefined
###

###################################

class FlaskTests(TestCase):

  def setUp(self):
      """Stuff to do before every test."""

      self.client = app.test_client()
      app.config['TESTING'] = True

  def test_some_flask_route(self):
      """Some non-database test..."""

      result = self.client.get("/recipes_data")
      self.assertEqual(result.status_code, 200)
      self.assertIn('<h1>Test</h1>', result.data)


if __name__ == '__main__':
    ####### added by Lucia 2/11
    connect_to_db(app)
    app.debug = True
    app.jinja_env.auto_relaod = app.debug

    DebugToolbarExtension(app)
    ####################################

    app.run(host='0.0.0.0', debug=True)
