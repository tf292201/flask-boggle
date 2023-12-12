class BoggleGame {
  constructor() {
    this.score = 0;
    this.usedWords = [];
    this.isGameRunning = true;
    this.startGame();
  }

  startGame() {
    this.isGameRunning = true;
    this.getScore();
    setTimeout(() => {
      alert('Game over!');
      this.isGameRunning = false;
      this.postScore();
    }, 60000);
  }

  handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload

    if (!this.isGameRunning) {
      $('#message').text('Game is over!');
      return;
    }
   
    const word = $('#word-input').val(); // Get the value of the input field
    
    if (this.usedWords.includes(word)) {
      $('#message').text(`${word} has already been used!`);
      return; // Exit the method without incrementing the score
    }
    // Clear the input field
    
    $('#word-input').val('');
    axios.get('/check-word', { params: { word } })
      .then(response => {
        // Handle the response data here
        if (response.data.result === 'not-word') {
          $('#message').text(`${word} is not a valid English word.`);
        } else if (response.data.result === 'not-on-board') {
          $('#message').text(`${word} is not a valid word on this board.`);
          if (this.usedWords.includes(word)) {
            $('#message').text(`${word} has already been used!`);
          }
        } else {
          $('#message').text(`${word} is a valid word!`);
          this.usedWords.push(word);
          this.incrementScore(word);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  incrementScore(word) {
    // Increment the score by the length of the word
    this.score += word.length;

    // Update the score on the page
    $('#score').text(this.score);
  }

  getScore() {
    // Send a GET request to the server to get the highscore and times played
    axios.get('/get-score')
      .then(response => {
        // Handle the response here
        $('#highscore-value').text(response.data.highscore);
        $('#plays-value').text(response.data.times_played);
      })
      .catch(error => {
        console.error(error);
      });
  }

  postScore() {
    // Send a POST request to the server to save the score
    axios.post('/post-score', { score: this.score })
      .then(response => {
        $('#highscore-value').text(response.data.highscore);
        $('#plays-value').text(response.data.times_played);
        // Handle the response here
        if (response.data.brokeRecord) {
          alert(`New record: ${this.score}!`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const game = new BoggleGame();

$(document).on('submit', 'form', game.handleFormSubmit.bind(game));
