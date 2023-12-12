
from flask import Flask, session, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle


boggle_game = Boggle()

app = Flask(__name__)
app.secret_key = "SECRET_KEY"

toolbar = DebugToolbarExtension(app)
@app.route('/')
def start_game():
  session['board'] = boggle_game.make_board()
  return render_template('index.html', board=session['board'])

@app.route('/check-word')
def check_word():
  word = request.args['word']
  board = session['board']
  result = boggle_game.check_valid_word(board, word)
  return jsonify({'result': result})

@app.route('/post-score', methods=['POST'])
def post_score():
  score = request.json['score']
  highscore = session.get('highscore', 0)
  times_played = session.get('times_played', 0)

  session['times_played'] = times_played + 1
  session['highscore'] = max(score, highscore)

  return jsonify(brokeRecord=score > highscore, times_played=session['times_played'], highscore=session['highscore'])

@app.route('/get-score')
def get_score():
  return jsonify(times_played=session['times_played'], highscore=session['highscore'])
  
app.run()
