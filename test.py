import unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskBoggleTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_start_game(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<table class="board">', response.data)

    def test_check_word(self):
        with self.app as client:
            with client.session_transaction() as sess:
                sess['board'] = [['A', 'B', 'C', 'D', 'E'],
                                 ['F', 'G', 'H', 'I', 'J'],
                                 ['K', 'L', 'M', 'N', 'O'],
                                 ['P', 'Q', 'R', 'S', 'T'],
                                 ['U', 'V', 'W', 'X', 'Y']]
        response = self.app.get('/check-word?word=hello')   
        self.assertEqual(response.json['result'], 'not-on-board')


    def test_post_score(self):
        with self.app as client:
            with client.session_transaction() as sess:
                sess['times_played'] = 0
                sess['highscore'] = 0
        response = self.app.post('/post-score', json={'score': 10})
        self.assertEqual(response.json['brokeRecord'], True)
        self.assertEqual(response.json['times_played'], 1)
        self.assertEqual(response.json['highscore'], 10)


    def test_get_score(self):
        with self.app as client:
            with client.session_transaction() as sess:
                sess['times_played'] = 0
                sess['highscore'] = 0
        response = self.app.get('/get-score')
        self.assertEqual(response.json['times_played'], 0)
        self.assertEqual(response.json['highscore'], 0)


if __name__ == '__main__':
    unittest.main()