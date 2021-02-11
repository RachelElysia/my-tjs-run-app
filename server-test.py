from unittest import TestCase
from server import app

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
