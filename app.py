
from flask import Flask, session, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle


boggle_game = Boggle()

app = Flask(__name__)
app.debug = True
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

app.run()