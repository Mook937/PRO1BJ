/*----- constants -----*/
const suit = ["diamonds", "clubs", "hearts", "spades"];
const value = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const deck = [];
const name = [];
let playerSum = [];

// /*----- app's state (variables) -----*/

let player, dealer, winner;

// /*----- cached element references -----*/
const dScoreEl = document.querySelector("#dealer h4");
const pScoreEL = document.querySelector("#player h3");
const playerHand = document.querySelector("#player h3");
const dealerHand = document.querySelector("#dealer h3");

// /*----- event listeners -----*/
document.querySelector("#hit").addEventListener("click", hit);
document.querySelector("#hold").addEventListener("click", hold);
document.querySelector("#new-game").addEventListener("click", newGame);

// /*----- functions -----*/
function initialize() {
  player = {
    hand: [],
  };
  dealer = {
    hand: [],
  };
  winner = null;
}

function freshDeck() {
  suit.forEach(function (suit) {
    value.forEach(function (value) {
      deck.push({
        face: `${suit}${value}`,
        value: Number(value) || (value === "A" ? 11 : 10),
      });
    });
  });
  shuffleDeck();
  return deck;
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    const oldValue = deck[newIndex];
    deck[newIndex] = deck[i];
    deck[i] = oldValue;
  }
}

function card(suit, value, name) {
  this.suit = suit;
  this.value = value;
  this.name = name;
}

function newGame() {
  initialize();
  freshDeck();
  dealCards();
  sumCards();
  render();
}

function dealCards() {
  const firstCard = deck.pop();
  const secondCard = deck.pop();
  const thirdCard = deck.pop();
  const fourthCard = deck.pop();
  player.hand.push(firstCard);
  player.hand.push(secondCard);
  dealer.hand.push(thirdCard);
  dealer.hand.push(fourthCard);
  sumCards();
  render();
}

function sumCards() {
  let playerTotal = player.hand.map((card) => card.value);
  let dealerTotal = dealer.hand.map((card) => card.value);
  playerSum = playerTotal.reduce((a, b) => {
    return a + b;
  });
  dealerSum = dealerTotal.reduce((a, b) => {
    return a + b;
  });
}

function hit() {
  sumCards();
  player.hand.push(deck.pop());
  sumCards();
  render();
  if (playerSum > 21) {
    const winStatement = document.querySelector("#winMessage");
    winStatement.innerText = "You lost";
    document.body.appendChild(winStatement);
    console.log(winStatement.innerText);
    newGame();
  }
}

function hold() {
  console.log(dealerSum);
  if (dealerSum < 17) {
    dealer.hand.push(deck.pop());
    sumCards();
    render();
    hold();
  } else win();
}

function win() {
  if (playerSum === 21) {
    const winStatement = document.querySelector("#winMessage");
    winStatement.innerText = "You win!";
    document.body.appendChild(winStatement);
    console.log(winStatement.innerText);
  } else if (playerSum > dealerSum) {
    const winStatement = document.querySelector("#winMessage");
    winStatement.innerText = "You win";
    document.body.appendChild(winStatement);
    console.log(winStatement.innerText);
  } else if (playerSum > 21) {
    const winStatement = document.querySelector("#winMessage");
    winStatement.innerText = "You lost";
    document.body.appendChild(winStatement);
    console.log(winStatement.innerText);
  } else if (dealerSum > 21) {
    const winStatement = document.querySelector("#winMessage");
    winStatement.innerText = "You win";
    document.body.appendChild(winStatement);
    console.log(winStatement.innerText);
  } else if (dealerSum === 21 && playerSum === 21) {
    const winStatement = document.querySelector("#winMessage");
    winStatement.innerText = "Its a Tie!";
    document.body.appendChild(winStatement);
    console.log(winStatement.innerText);
  } else {
    const winStatement = document.querySelector("#winMessage");
    winStatement.innerText = "You lost";
    document.body.appendChild(winStatement);
    console.log(winStatement.innerText);
  }
}

function render() {
  const playerCards = player.hand.map((card) => card.value);
  console.log(playerCards);
  const dealerCards = dealer.hand.map((card) => card.value);
  console.log(dealerCards);
  playerHand.textContent = playerCards;
  dealerHand.textContent = dealerCards;
}
newGame();
