import unittest
from app import app


class FlaskBoggleTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_start_game(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<table class="board">', response.data)

    def test_check_word_valid(self):
        response = self.app.get('/check-word?word=hello')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['result'], 'valid')

    def test_check_word_invalid(self):
        response = self.app.get('/check-word?word=xyz')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['result'], 'invalid')

if __name__ == '__main__':
    unittest.main()