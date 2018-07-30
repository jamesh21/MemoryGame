// List of variables
const cardContainer = document.querySelector('.card-container');
const movesContainer = document.querySelector('.num-moves');
const timerContainer = document.querySelector('.timer');
const fullContainer = document.querySelector('.container');
const resetButton = document.querySelector('#reset-button');
let startTime = Date.now();
let list = ['android', 'react', 'java', 'node-js', 'node-js', 'react', 'html5',
            'css3-alt', 'css3-alt', 'html5', 'android', 'python', 'python', 'java',
            'github', 'github'];
let numCardsLeft = list.length;
let firstCard = null;
let numMoves = Number(movesContainer.textContent);
let timeStop = false;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// function is used to place items in the list to their respective cards
function placeCards(element, index) {
    const cardIcon = cardContainer.children[index].children[0];
    cardIcon.classList.add(`fa-${element}`);
}

//function to listen to individual card clicks
function addCardListeners() {
    for (let i = 0; i < cardContainer.children.length; i++) {
        cardContainer.children[i].addEventListener('click', function (event) {
          event.target.classList.add('card-open');

          // no card is currently selected
          if (firstCard === null) {
            firstCard = event.target;
          } else { // first card selected
            let secondCard = event.target;
            numMoves++;
            movesContainer.textContent = numMoves;
            if (checkIfSame(firstCard, secondCard)) {
                correctAnswerAction(firstCard, secondCard);
            } else {
              firstCard.classList.add('wrong-match');
              secondCard.classList.add('wrong-match');
              cardContainer.classList.add('mouse-stop');
              setTimeout(incorrectAnswerAction, 1000, firstCard, secondCard);
            }
            firstCard = null;
        }
    });
    }
}

// function to check if the two selected cards are the same
function checkIfSame(firstCard, secondCard) {
    return firstCard.children[0].classList.item(1) === secondCard.children[0].classList.item(1);
}

// function is called when 2 cards are matched. The cards will stay flipped
function correctAnswerAction(firstCard, secondCard) {
    firstCard.classList.add('correct-match');
    secondCard.classList.add('correct-match');
    numCardsLeft -= 2;
    checkIfWon();
}

// function is called if the 2 cards do not match. The cards will turn face down.
function incorrectAnswerAction(firstCard, secondCard) {
    firstCard.classList.remove('card-open');
    secondCard.classList.remove('card-open');
    cardContainer.classList.remove('mouse-stop');
    firstCard.classList.remove('wrong-match');
    secondCard.classList.remove('wrong-match');
}

// function to check if the the player has won the game.
function checkIfWon() {
    if (numCardsLeft === 0) {
        timeStop = true;
        swal({
          title: "Congratulations You Win!",
          buttons: {
            confirm: "Play Again?",
            cancel: true
          }
        })
        .then((again) => {
          if (again) {
            swal("Game Restarted", {
              icon: "success",
            });
            resetGame();
          }
        });
    }
}

// Resets the Game
function resetGame () {
    flipCardsFaceDown();
    list.forEach(resetCards);
    list = shuffle(list);
    list.forEach(placeCards);
    numMoves = 0;
    movesContainer.textContent = numMoves;
    startTime = Date.now();
    timeStop = false;
    numCardsLeft = list.length;
}

// Flips all the cards face down
function flipCardsFaceDown () {
    for (let i = 0; i < cardContainer.children.length; i++) {
        cardContainer.children[i].classList.remove('card-open');
    }
}

// Resets the list of the respective card
function resetCards (element, index) {
    const cardIcon = cardContainer.children[index].children[0];
    cardIcon.classList.remove(`fa-${element}`);
    cardContainer.children[index].classList.remove('correct-match');
}

// shuffle the starting list
list = shuffle(list);
addCardListeners();
list.forEach(placeCards);

// Used for time elapsed
window.setInterval(function () {
    if (!timeStop)
        timerContainer.textContent = Math.floor((Date.now() - startTime) / 1000);
}, 1000);

resetButton.addEventListener('click', function () {
    swal({
      title: "Restart?",
      buttons: {
        confirm: "Restart",
        cancel: true
      }
    })
    .then((again) => {
      if (again) {
        swal("Game Restarted", {
          icon: "success",
        });
        resetGame();
      } 
    });
});
