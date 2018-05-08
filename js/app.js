let list = ['android', 'react', 'java', 'node-js', 'node-js', 'react', 'html5',
            'css3-alt', 'css3-alt', 'html5', 'android', 'python', 'python', 'java',
            'github', 'github'];
const cardContainer = document.querySelector('.card-container');

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
    });
  }
}

// shuffle the starting list
list = shuffle(list);
addCardListeners();
list.forEach(placeCards);
