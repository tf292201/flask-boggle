// Test case 1: Game over scenario
// Simulate the game over scenario by setting isGameRunning to false
isGameRunning = false;
$('#word-input').val('test');
$('form').trigger('submit');
// Expected output: The message should display "Game is over!"

// Test case 2: Invalid English word scenario
// Simulate the scenario where the word is not a valid English word
isGameRunning = true;
$('#word-input').val('xylophone');
$('form').trigger('submit');
// Expected output: The message should display "xylophone is not a valid English word."

// Test case 3: Invalid word on the board scenario
// Simulate the scenario where the word is not a valid word on the board
isGameRunning = true;
$('#word-input').val('apple');
$('form').trigger('submit');
// Expected output: The message should display "apple is not a valid word on this board."

// Test case 4: Word already used scenario
// Simulate the scenario where the word has already been used
isGameRunning = true;
usedWords = ['apple', 'banana'];
$('#word-input').val('apple');
$('form').trigger('submit');
// Expected output: The message should display "apple has already been used!"

// Test case 5: Valid word scenario
// Simulate the scenario where the word is valid
isGameRunning = true;
usedWords = ['apple', 'banana'];
$('#word-input').val('orange');
$('form').trigger('submit');
// Expected output: The message should display "orange is a valid word!" and the score should be incremented by the length of the word