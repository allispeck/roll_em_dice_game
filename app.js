/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he/she wants. Each result get added to their ROUND score
- BUT, if the player rolls a 1, all ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScore, activePlayer, dice, gamePlaying, input;

initGame();

let rollDisabled = false;

let lastDice;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        if (rollDisabled) return;

        // 1. Random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. display the dice roll result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src           = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src           = 'dice-' + dice2 + '.png';


        // update the round score if the number rolled was not a 1

        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            console.log(roundScore);
            document.querySelector('#current-' + activePlayer).innerHTML = roundScore;
        }
        else {
            rollDisabled = true;
            setTimeout(() => {
                nextPlayer();
            }, 1000);
        }
        lastDice = dice;
    }
});


function nextPlayer() {
    rollDisabled = false;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');


    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;
        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if (input) {
            winningScore = input;
            console.log(winningScore)
        } else {
            winningScore = 100;
        }

        //check if player won game
        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false;
            toggleModal();
            initGame();
        }
        else {
            nextPlayer();
        }
    }
});

// function to reset dice

function initGame() {
    gamePlaying = true;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    scores       = [0, 0];
    roundScore   = 0;
    activePlayer = 0;


    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('final-score').value = "";
}


//model
let modal       = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    // check if modal is already showing
    if (!modal.classList.contains('show-modal')) {
        document.querySelector('.winner-text').textContent = `PLAYER ${activePlayer + 1} WINS!`;
    }
    // if modal is showing, close modal, if not than open the modal
    modal.classList.toggle("show-modal");
}

// close the modal
closeButton.addEventListener("click", toggleModal);

// rules modal
let howModal         = document.querySelector(".how-modal");
let closeRulesButton = document.querySelector(".close-rules-button");

document.querySelector('.btn-how').addEventListener('click', function () {
    howModal.classList.toggle("show-rules-modal");

});

closeRulesButton.addEventListener("click", function () {
    howModal.classList.toggle("show-rules-modal");

});