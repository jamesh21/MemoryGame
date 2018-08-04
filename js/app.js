// List of variables
const cardContainer = document.querySelector('.card-container');
const movesContainer = document.querySelector('.num-moves');
const timerContainer = document.querySelector('.timer');
const fullContainer = document.querySelector('.container');
const resetButton = document.querySelector('.reset-button');
const thirdStar = document.querySelector('#star-3');
const secondStar = document.querySelector('#star-2');
const firstStar = document.querySelector('#star-1');
let startTime = Date.now();
let list = ['android', 'react', 'java', 'node-js', 'node-js', 'react', 'html5',
            'css3-alt', 'css3-alt', 'html5', 'android', 'python', 'python', 'java',
            'github', 'github'];
let numCardsLeft = list.length;
let firstCard = null;
let numMoves = Number(movesContainer.textContent);
let timeStop = false;
let currentStarCount = 3;

// Shuffle function from http://stackoverflow.com/a/2450976
var shuffle = (array) => {
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
// function shuffle(array) {
//     let currentIndex = array.length, temporaryValue, randomIndex;
//
//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//     return array;
// }

// function is used to place items in the list to their respective cards
var placeCards = (element, index) => {
    const cardIcon = cardContainer.children[index].children[0];
    cardIcon.classList.add(`fa-${element}`);
}
// function placeCards(element, index) {
//     const cardIcon = cardContainer.children[index].children[0];
//     cardIcon.classList.add(`fa-${element}`);
// }

//function to listen to individual card clicks
var addCardListeners = () => {
    for (let i = 0; i < cardContainer.children.length; i++) {
        cardContainer.children[i].addEventListener('click', (event) => {
          event.target.classList.add('card-open');
          // no card is currently selected
          if (firstCard === null) {
            firstCard = event.target;
        } else { // first card selected already
            let secondCard = event.target;
            numMoves++;
            movesContainer.textContent = numMoves;
            // Checking if the current move count has reached a threshold for stars to decrement
            if (currentStarCount != calculateStars()) {
                currentStarCount--;
                updateStarIcons();
            }
            if (checkIfSame(firstCard, secondCard)) {
                // the cards match
                correctAnswerAction(firstCard, secondCard);
            } else { // cards don't match
              firstCard.classList.add('wrong-match');
              secondCard.classList.add('wrong-match');
              cardContainer.classList.add('mouse-stop');
              // setting a timeout to give time for the animation to process before flipping face down
              setTimeout(incorrectAnswerAction, 1000, firstCard, secondCard);
            }
            firstCard = null;
        }
    });
    }
}
// function addCardListeners() {
//     for (let i = 0; i < cardContainer.children.length; i++) {
//         cardContainer.children[i].addEventListener('click', function (event) {
//           event.target.classList.add('card-open');
//           // no card is currently selected
//           if (firstCard === null) {
//             firstCard = event.target;
//         } else { // first card selected already
//             let secondCard = event.target;
//             numMoves++;
//             movesContainer.textContent = numMoves;
//             // Checking if the current move count has reached a threshold for stars to decrement
//             if (currentStarCount != calculateStars()) {
//                 currentStarCount--;
//                 updateStarIcons();
//             }
//             if (checkIfSame(firstCard, secondCard)) {
//                 // the cards match
//                 correctAnswerAction(firstCard, secondCard);
//             } else { // cards don't match
//               firstCard.classList.add('wrong-match');
//               secondCard.classList.add('wrong-match');
//               cardContainer.classList.add('mouse-stop');
//               // setting a timeout to give time for the animation to process before flipping face down
//               setTimeout(incorrectAnswerAction, 1000, firstCard, secondCard);
//             }
//             firstCard = null;
//         }
//     });
//     }
// }

// function to check if the two selected cards are the same
var checkIfSame = (firstCard, secondCard) => {
    return firstCard.children[0].classList.item(1) === secondCard.children[0].classList.item(1);
}
// function checkIfSame(firstCard, secondCard) {
//     return firstCard.children[0].classList.item(1) === secondCard.children[0].classList.item(1);
// }

// function is called when 2 cards are matched. The cards will stay flipped
var correctAnswerAction = (firstCard, secondCard) => {
    firstCard.classList.add('correct-match');
    secondCard.classList.add('correct-match');
    numCardsLeft -= 2;
    checkIfWon();
}
// function correctAnswerAction(firstCard, secondCard) {
//     firstCard.classList.add('correct-match');
//     secondCard.classList.add('correct-match');
//     numCardsLeft -= 2;
//     checkIfWon();
// }

// function is called if the 2 cards do not match. The cards will turn face down.
var incorrectAnswerAction = (firstCard, secondCard) => {
    firstCard.classList.remove('card-open', 'wrong-match');
    secondCard.classList.remove('card-open', 'wrong-match');
    cardContainer.classList.remove('mouse-stop');
}
// function incorrectAnswerAction(firstCard, secondCard) {
//     firstCard.classList.remove('card-open', 'wrong-match');
//     secondCard.classList.remove('card-open', 'wrong-match');
//     cardContainer.classList.remove('mouse-stop');
// }

// function to check if the the player has won the game.
var checkIfWon = () => {
    if (numCardsLeft === 0) {
        timeStop = true;
        swal({ // using sweetalert library to display a modal
          title: 'Congratulations You Win!',
          text: "It took you " + timerContainer.textContent +
                    " seconds to match all cards. You achieved a " +
                    currentStarCount + " star rating.",
          buttons: {
            confirm: 'Play Again?',
            cancel: true
          }
        })
        .then((again) => {
          if (again) {
            swal('Game Restarted', {
              icon: 'success',
            });
            resetGame();
          }
        });
    }
}
// function checkIfWon() {
//     if (numCardsLeft === 0) {
//         timeStop = true;
//         swal({ // using sweetalert library to display a modal
//           title: 'Congratulations You Win!',
//           text: "It took you " + timerContainer.textContent +
//                     " seconds to match all cards. You achieved a " +
//                     currentStarCount + " star rating.",
//           buttons: {
//             confirm: 'Play Again?',
//             cancel: true
//           }
//         })
//         .then((again) => {
//           if (again) {
//             swal('Game Restarted', {
//               icon: 'success',
//             });
//             resetGame();
//           }
//         });
//     }
// }


// Resets the Game
var resetGame = () => {
    flipCardsFaceDown();
    list.forEach(resetCards);
    firstCard = null;
    list = shuffle(list);
    list.forEach(placeCards);
    numMoves = 0;
    movesContainer.textContent = numMoves;
    startTime = Date.now();
    timeStop = false;
    numCardsLeft = list.length;
    currentStarCount = 3;
    thirdStar.classList.remove('far');
    thirdStar.classList.add('fas');
    secondStar.classList.remove('far');
    secondStar.classList.add('fas');
}
// function resetGame () {
//     flipCardsFaceDown();
//     list.forEach(resetCards);
//     firstCard = null;
//     list = shuffle(list);
//     list.forEach(placeCards);
//     numMoves = 0;
//     movesContainer.textContent = numMoves;
//     startTime = Date.now();
//     timeStop = false;
//     numCardsLeft = list.length;
//     currentStarCount = 3;
//     thirdStar.classList.remove('far');
//     thirdStar.classList.add('fas');
//     secondStar.classList.remove('far');
//     secondStar.classList.add('fas');
// }

var flipCardsFaceDown = () => {
    for (let i = 0; i < cardContainer.children.length; i++) {
        cardContainer.children[i].classList.remove('card-open');
    }
}

// Flips all the cards face down
// function flipCardsFaceDown () {
//     for (let i = 0; i < cardContainer.children.length; i++) {
//         cardContainer.children[i].classList.remove('card-open');
//     }
// }



// Resets the list of the respective card
var resetCards = (element, index) => {
    const cardIcon = cardContainer.children[index].children[0];
    cardIcon.classList.remove(`fa-${element}`);
    cardContainer.children[index].classList.remove('correct-match');
}
// function resetCards (element, index) {
//     const cardIcon = cardContainer.children[index].children[0];
//     cardIcon.classList.remove(`fa-${element}`);
//     cardContainer.children[index].classList.remove('correct-match');
// }

// Function used to calculate the number of stars left
var calculateStars = () => {
    if (numMoves <= 14) {
        return 3;
    } else if (numMoves <= 25) {
        return 2;
    } else {
        return 1;
    }
}
// function calculateStars () {
//     if (numMoves <= 14) {
//         return 3;
//     } else if (numMoves <= 25) {
//         return 2;
//     } else {
//         return 1;
//     }
// }

// Function used to draw the stars
var updateStarIcons = () => {
    if (currentStarCount == 2) {
        thirdStar.classList.remove('fas');
        thirdStar.classList.add('far');
    } else { // Star count is 1 here
        secondStar.classList.remove('fas');
        secondStar.classList.add('far');
    }
}
// function updateStarIcons () {
//     if (currentStarCount == 2) {
//         thirdStar.classList.remove('fas');
//         thirdStar.classList.add('far');
//     } else { // Star count is 1 here
//         secondStar.classList.remove('fas');
//         secondStar.classList.add('far');
//     }
// }

// Add event listener to the reset button
resetButton.addEventListener('click', () => {
    swal({
      title: 'Restart?',
      buttons: {
        confirm: 'Restart',
        cancel: true
      }
    })
    .then((again) => {
      if (again) {
        swal('Game Restarted', {
          icon: 'success',
        });
        resetGame();
      }
    });
});

// Shuffle the starting list
list = shuffle(list);
addCardListeners();
list.forEach(placeCards);

// Used for time elapsed
window.setInterval(() => {
    if (!timeStop)
        timerContainer.textContent = Math.floor((Date.now() - startTime) / 1000);
}, 1000);
