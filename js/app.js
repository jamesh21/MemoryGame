// List of variables
const cardContainer = document.querySelector('.card-container');
const movesContainer = document.querySelector('.num-moves');
const timerContainer = document.querySelector('.timer');
const startTime = Date.now();
let list = ['android', 'react', 'java', 'node-js', 'node-js', 'react', 'html5',
            'css3-alt', 'css3-alt', 'html5', 'android', 'python', 'python', 'java',
            'github', 'github'];
let numCardsLeft = list.length;
let firstCard = null;
let numMoves = Number(movesContainer.textContent);

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
      numMoves++;
      movesContainer.textContent = numMoves;

      // no card is currently selected
      if (firstCard === null) {
        firstCard = event.target;
        console.log(firstCard);
      } else { // first card selected
        let secondCard = event.target;
        if (checkIfSame(firstCard, secondCard)) {
          console.log('Same Card');
          correctAnswerAction();
        } else {
          console.log('Diff Card');
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
function correctAnswerAction() {
  numCardsLeft -= 2;
  checkIfWon();
}

// function is called if the 2 cards do not match. The cards will turn face down.
function incorrectAnswerAction(firstCard, secondCard) {
  firstCard.classList.remove('card-open');
  secondCard.classList.remove('card-open');
}

// function to check if the the player has won the game.
function checkIfWon() {
  if (numCardsLeft === 0) {
    // setTimeout(alert, 1000, 'You Win');
    swal({
      title: "Congratulations You Win!",
      // icon: "info",
      buttons: {
        confirm: "Play Again?",
        cancel: true
      }
    })
    .then((again) => {
      if (again) {
        // TODO reset function called here
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      }
    });
  }
}

function resetGame () {

}

// shuffle the starting list
list = shuffle(list);
addCardListeners();
list.forEach(placeCards);

// Used for time elapsed
window.setInterval(function () {
  timerContainer.textContent = Math.floor((Date.now() - startTime) / 1000);
}, 1000);
