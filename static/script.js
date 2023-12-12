let score = 0;
let usedWords = [];
let isGameRunning = true;
startGame();

function startGame() {
  isGameRunning = true;
  getScore();
  setTimeout(function() {
    alert('Game over!');
    isGameRunning = false;
    postScore();
  }, 60000);
}



$(document).on('submit', 'form', function(event) {
  event.preventDefault(); // Prevent page reload

  if (!isGameRunning) {
    $('#message').text('Game is over!');
    return;
  }
  const word = $('#word-input').val(); // Get the value of the input field
  // Clear the input field
  $('#word-input').val('');
  axios.get('/check-word', { params: { word } })
    .then(response => {
      // Handle the response data here
      if (response.data.result === 'not-word') {
        $('#message').text(`${word} is not a valid English word.`);
      } else if (response.data.result === 'not-on-board') {
        $('#message').text(`${word} is not a valid word on this board.`);
       if (usedWords.includes(word)) {
          $('#message').text(`${word} has already been used!`);
        }
      } else {
        $('#message').text(`${word} is a valid word!`);
        usedWords.push(word);
        incrementScore(word);
        
      }
    })
    .catch(error => {
      console.error(error);
    });
});

const incrementScore = (word) => {
  // Increment the score by 1
  score += word.length;

  // Update the score on the page
  $('#score').text(score);
};

function getScore() {
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

function postScore() {
 // Send a POST request to the server to save the score
 axios.post('/post-score', { score })
 .then(response => {
   $('#highscore-value').text(response.data.highscore);
   $('#plays-value').text(response.data.times_played);
   // Handle the response here
   if (response.data.brokeRecord) {
     alert(`New record: ${score}!`);
   }
 })
 .catch(error => {
   console.error(error);
 });
}