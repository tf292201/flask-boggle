let score = 0;

$(document).on('submit', 'form', function(event) {
  event.preventDefault(); // Prevent page reload

  const word = $('#word-input').val(); // Get the value of the input field

  axios.get('/check-word', { params: { word } })
    .then(response => {
      // Handle the response data here
      if (response.data.result === 'not-word') {
        $('#message').text(`${word} is not a valid English word.`);
      } else if (response.data.result === 'not-on-board') {
        $('#message').text(`${word} is not a valid word on this board.`);
      } else {
        $('#message').text(`${word} is a valid word!`);
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