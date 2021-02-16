'use strict';
let secretNumber;
let score = 20; // sets the start score of the game
let highscore = 0; // sets the high score on first go at 0
let guessValue = document.querySelector('.guess');
const check = document.querySelector('.check');

// Creating functions to keep code dry
const makeSecret = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1; // generates a whole number between 1 (inclusive) and 20 (inclusive)
};
const displayMessage = function (message) {
  // allows the app to display a message rather than repeating the line within this function in multiple places throughout the code in order to display the message
  document.querySelector('.message').textContent = message; // make the text of .message the same as the argumnet we pass into the displayMessage function
};
const bodyBackground = function (color) {
  // allows us to change the backgorund-color of the game
  document.querySelector('body').style.backgroundColor = color; // change background-color to colour specified in the argumnet. N.B. We have to use camel case rather than the standard hyphenated version we would use in CSS. When changing CSS values in JS we need to declare them as strings in JS, even if they are numbers in CSS
};
const numberStyle = function (width, text) {
  // change the style and content of the secretNumber display
  document.querySelector('.number').style.width = width;
  document.querySelector('.number').textContent = text;
};
const displayScore = function (score) {
  //controls what is displayed in the score section
  document.querySelector('.score').textContent = score;
};
const checkBtnStyle = function (disabled, cursor) {
  check.disabled = disabled;
  check.style.cursor = cursor;
};

makeSecret(); // creates secret number


// THE CLICK FUNCTION FOR THE "CHECK" BUTTON

check.addEventListener('click', function () {
  // the argument are the event (click) and the function to be carried out when the event occurs
  let guess = Number(guessValue.value); // the user entry will be a string but we need it to be a number, so we change it here

  // NO GUESS

  if (!guess) {
    // this is to handle what happens if the button is clicked without a guess having be added to the input. If that happens the value returned would be 0 which is a falsy value. As such I have used the ! operator to turn no entry to true
    displayMessage('⚠️ No number!');
  }

  // CORRECT GUESS
  else if (guess === secretNumber) {
    displayMessage('🎉 Correct number!');
    bodyBackground('#60b347');
    numberStyle('30rem', secretNumber);
    checkBtnStyle(true, 'not-allowed'); // prevents check button working after game has been won

    if (score > highscore) {
      // sets / keeps track of the highscore
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  // INCORRECT GUESS
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber ? '📈 Too high!' : '📉 Too low!' // the message is the only thing that differs between a guees that is too high and one that is too low so I am able to use the ternary operator
      );
      score--; // each incorrect guess loses the user a point
      displayScore(score); // shows the new score in the score field
    } else {
      // the player has had their last guess (i.e. score becomes 0)
      displayMessage('💥 You lose!');
      score--;
      displayScore(score);
      checkBtnStyle(true, 'not-allowed');
    }
  }

  // AGAIN BUTTON FUNCTIONALITY - resets everything except for high score. Allows user to play again repeatedly, keep a high score registed, all without refreshing the page

  document.querySelector('.again').addEventListener('click', function () {
    makeSecret(); // generates a new secretNumber
    score = 20; // resets the score to 20
    displayMessage('Start guessing...');
    numberStyle('15rem', '?'); // original width and text of secretNumber display reset
    displayScore(score); // original score text content resets (i.e. 20)
    guessValue.value = ''; // empties guess input field
    bodyBackground('#222'); // original style resets
    checkBtnStyle(false, 'pointer'); // re-engages the check button
  });
});
