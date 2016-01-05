// Design Basic Game Solo Challenge

// This is a solo challenge

// Your mission description:
// Overall mission: Create a fast version of the card game WAR, I'm calling Blitzkrieg WAR.
// Goals: Collect the most cards
// Characters: Player 1 and Player 2
// Objects: player1, player2, cardsInHand, cardsWon
// Functions: dealCards, flipCards, compareCards,

// Pseudocode
// Deal 26 randomly shuffled cards to both Player 1 and Player 2
// Flip top card from each player's hand
// Compare cards played
// IF cards played are the same, declare a WAR
// Add cards to winning player's discard pile
// IF cards played are the same

// Initial Code

// var deck = new PlayerDeck();

// function PlayerDeck() {
//   this.cards = [];
//   var suits = ['C','D','H','S'];

//   for(var i = 2; i < 15; i++) {
//     for (var j = 0; j < suits.length; j++) {
//       this.cards.push(i + '_' + suits[j]);
//     }
//   };
  
//   var i = this.cards.length, j, temp;

//   while (--i > 0) {
//     j = Math.floor(Math.random() * i);
//     temp = this.cards[j];
//     this.cards[j] = this.cards[i];
//     this.cards[i] = temp;
//   };
//   this.player1Deck = this.cards.slice(0,26);
//   this.player2Deck = this.cards.slice(26);
// }

// function playHand(temp) {
//   change();
//   var player1Won = [];
//   var player2Won = [];
//   var player1Hand = temp.player1Deck.shift();
//   var player2Hand = temp.player2Deck.shift();
//   console.log(player1Hand);
//   console.log(player2Hand);
//   var player1Value = parseInt(player1Hand.split('_'));
//   var player2Value = parseInt(player2Hand.split('_'));
//   console.log(player1Value);
//   console.log(player2Value);
//   if(player1Value > player2Value) {
//     console.log("Player 1 Won this hand!");
//     winner('win1');
//   } else if(player1Value < player2Value) {
//     console.log("Player 2 Won this hand!");
//     winner('win2');
//   } else {
//     winner('tie');
//   };
//   toggleVisibility('player1', player1Hand);
//   toggleVisibility('player2', player2Hand);
// }

// function toggleVisibility(player, value) {
//   var commandStr = document.getElementById(player)
//   commandStr += commandStr.src = "../imgs/war/" + value + ".svg";
// }

// function winner(winner) {
//   document.getElementById(winner).style.display = "block";
// }

// function change()
// {
//     var elem = document.getElementById('button');
//     if (elem.value=="Deal") elem.value = "Play Again?";
// }

// Refactored Code
function startGame() {
  document.getElementById('welcome').style.display = "none";
}

function newGame() {
  location.reload();
}

var deck = new PlayerDeck();

var player1 = {
  score: 0,
  name: 'You',
}

var player2 = {
  score: 0,
  name: 'Atticus',
}

function PlayerDeck() {
  this.cards = [];
  var suits = ['C','D','H','S'];

  for(var i = 2; i < 15; i++) {
    for (var j = 0; j < suits.length; j++) {
      this.cards.push(i + '_' + suits[j]);
    }
  };
  
  var i = this.cards.length, j, temp;

  while (--i > 0) {
    j = Math.floor(Math.random() * i);
    temp = this.cards[j];
    this.cards[j] = this.cards[i];
    this.cards[i] = temp;
  };
  this.player1Deck = this.cards.slice(0,26);
  this.player2Deck = this.cards.slice(26);
}

function playHand(temp) {
  var player1Hand = temp.player1Deck.shift();
  var player2Hand = temp.player2Deck.shift();
  var player1Value = parseInt(player1Hand.split('_'));
  var player2Value = parseInt(player2Hand.split('_'));
  if(player1Value > player2Value) {
    player1.score += 2;
    winner('win1');
    showCard('player1', player1Hand);
    showCard('player2', player2Hand);
    gameWon(temp.player1Deck);
  } else if (player1Value < player2Value) {
    player2.score += 2;
    winner('win2');
    showCard('player1', player1Hand);
    showCard('player2', player2Hand);
    gameWon(temp.player1Deck);
  } else {
    winner('war');
    showCard('player1', player1Hand);
    showCard('player2', player2Hand);
    setTimeout(function() {
      war(temp.player1Deck, player1Value, temp.player2Deck, player2Value)
    }, 1000);
   }
}

function showCard(player, value) {
  var commandStr = document.getElementById(player)
  commandStr += commandStr.src = "../imgs/war/" + value + ".svg";
}

function war(hand1, value1, hand2, value2) {
  var war1Value = value1;
  var war2Value = value2;
  if(hand1.length > 4) {
    while(war1Value === war2Value) {
      for(var i = 0; i < 4; i++) {
        var warHand1 = hand1.shift();
      }
      for(var i = 0; i < 4; i++) {
        var warHand2 = hand2.shift();
      }
      war1Value = parseInt(warHand1.split('_'));
      war2Value = parseInt(warHand2.split('_'));
      if(war1Value > war2Value) {
        player1.score += 10;
        winner('win1');
        showCard('player1', warHand1);
        showCard('player2', warHand2);
      } else if (war1Value < war2Value) {
        player2.score += 10;
        winner('win2');
        showCard('player1', warHand1);
        showCard('player2', warHand2);
      }
    }
  } else {
    gameWon(hand1);
  } 
}

function winner(object) {
  switch (object) {
    case 'win1':
      document.getElementById('win1').style.display = "block";
      document.getElementById('win2').style.display = "none";
      document.getElementById('war').style.display = "none";
      addRow('player1-wins', player1.score);
      break;
    case 'win2':
      document.getElementById('win1').style.display = "none";
      document.getElementById('win2').style.display = "block";
      document.getElementById('war').style.display = "none";
      addRow('player2-wins', player2.score);
      break;
      case 'war':
      document.getElementById('win1').style.display = "none";
      document.getElementById('win2').style.display = "none";
      document.getElementById('war').style.display = "block";
      break;
    default:
      document.getElementById('win1').style.display = "none";
      document.getElementById('win2').style.display = "none";
      document.getElementById('war').style.display = "none";
  }
}

function gameWon(length) {
  var test = true;
  switch (test) {
    case length.length === 0 && player1.score > player2.score:
    document.getElementById('card-back1').style.display = "none";
    document.getElementById('card-back2').style.display = "none";
    winner(1);
    displayWinner('player1');
    break;
    case length.length === 0 && player1.score < player2.score:
    document.getElementById('card-back1').style.display = "none";
    document.getElementById('card-back2').style.display = "none";
    winner(2);
    displayWinner('player2');
    break;
    case length.length === 0 && player1.score === player2.score:
    document.getElementById('card-back1').style.display = "none";
    document.getElementById('card-back2').style.display = "none";
    winner(3);
    displayWinner('tied');
    break;
    default:
  }
}

function addRow(player, score) {
  var playerId;
  if(player === 'player1-wins') {
    playerId = player1.name;
  } else {
    playerId = player2.name;
  }
    if (score !== 2) {
      var test = document.getElementById(player);
      test.innerHTML = playerId + ' won ' + score + ' cards!';
    } else {
      var h2 = document.createElement('h2');
      h2.id = player;
      h2.innerHTML = playerId + ' won 2 cards!';
      document.getElementById('display').appendChild(h2);
    }
}

function displayWinner(winner) {
  document.getElementById('winner').src = "../imgs/war/" + winner + ".png";
  document.getElementById('winner').style.display = "block";
  document.getElementById('winner-btn').style.display = "block";
}

// Reflection
/*
    What was it like to approach the problem from the perspective of JavaScript? Did you approach the problem differently?
    I don't think that I my approach was any different because this was JavaScript. I felt that my biggest issues was going too far down the rabbit hole in trying to get the game to work the way I intended. Each time I thought that I had figured one thing out and could do more, I quickly realized that it created 10 different issues I hadn't counted on.

    What did you learn about iterating over arrays in JavaScript?
    That it is not that much different from Ruby and is pretty straight forward.

    What was different about solving this problem in JavaScript?
    I think the biggest difference I had was the shear scope of what the project ended up becoming. Prior to this, I hadn't really down anything this large that wasn't primarily HTML and CSS.

    What built-in methods did you find to incorporate in your refactored solution?
    I'm sure that there are several that I could have used, but I spent so much time trying to just get it to work that I really didn't bother refactoring too much.

*/

