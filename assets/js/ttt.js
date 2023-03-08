var gameActive = true;
var gameMode = "player";
const squareIDs = ['top-left', 'top-middle', 'top-right', 'middle-left', 'middle-middle', 'middle-right', 'bottom-left', 'bottom-middle', 'bottom-right'];
const colours = ['#60A0FF', '#A060FF', '#fff'];
const players = ['x', 'o'];
var player = 0;
var board = ['', '', '', '', '', '', '', '', ''];

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById('tic-tac-toe__title').addEventListener("click", function() {
        switchMode(this);
    });
    document.getElementById('game__info').style.color = colours[0];
    document.getElementById('game__info').innerHTML = `${players[0]} to move`;
    let squares = document.querySelectorAll(".board__square");

    Array.from(squares, function(square) {
        square.addEventListener("click", function() {
        if (this.innerHTML == '' && gameActive == true && !(player == 1 && gameMode == 'computer')) {
            playMove(this);
        }});
    });
});

function playMove(square) {
    square.style.color = colours[player];
    square.innerHTML = players[player];
    square.classList.add('is-active');
    board[squareIDs.indexOf(square.id)] = players[player];
    player = (player + 1) % 2;
    document.getElementById('game__info').style.color = colours[player];
    document.getElementById('game__info').innerHTML = `${players[player]} to move`;
    result = checkResult(board);
    if (result > 0) {
        endGame(result);
        return;
    }

    if (gameMode == 'computer' && player == 1) {
        computerMove();
    }
}

function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));  
}  

async function computerMove() {
    let empty_squares = []
    for (let i = 0; i < board.length; i++) {
        if (board[i] == '') {
            empty_squares.push(i);
        }
    }
    await sleep(750);
    move = empty_squares[Math.floor(Math.random()*empty_squares.length)];
    playMove(document.getElementById(squareIDs[move]));
}

function checkResult(board) {
    let empty = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i] == '') empty++;
    }

    if (empty >= 5) return 0;

    for (let i = 0; i < 2; i++) {
        const p = players[i];

        if (board[0] == p && board[1] == p && board[2] == p) return i + 1;
        if (board[3] == p && board[4] == p && board[5] == p) return i + 1;
        if (board[6] == p && board[7] == p && board[8] == p) return i + 1;

        if (board[0] == p && board[3] == p && board[6] == p) return i + 1;
        if (board[1] == p && board[4] == p && board[7] == p) return i + 1;
        if (board[2] == p && board[5] == p && board[8] == p) return i + 1;

        if (board[0] == p && board[4] == p && board[8] == p) return i + 1;
        if (board[2] == p && board[4] == p && board[6] == p) return i + 1;
    }

    if (empty == 0) return 3;

    return 0;
}

function endGame(result) {
    document.getElementById('game__result').style.color = colours[result - 1];
    if (result == 3) {
        document.getElementById('game__result').innerHTML = '‎Draw!';
    } else {
        document.getElementById('game__result').innerHTML = `${players[result - 1]} has won!`;
    }
    document.getElementById('game__info').style.color = colours[result - 1];
    document.getElementById('game__info').innerHTML = "‎Game Over!";
    gameActive = false;
}

function resetGame() {
    player = 0;
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('game__info').style.color = colours[0];
    document.getElementById('game__info').innerHTML = `${players[0]} to move`;
    document.getElementById('game__result').innerHTML = '';
    for (let i = 0; i < squareIDs.length; i++) {
        document.getElementById(squareIDs[i]).innerHTML = '';
        document.getElementById(squareIDs[i]).classList.remove('is-active');
    }
}


function switchMode(title) {
    if (title.innerHTML.slice(10) == "PLAYER") {
        var newHTML = "PLAYER VS COMPUTER";
        gameMode = "computer";
    } else {
        var newHTML = "PLAYER VS PLAYER";
        gameMode = "player";
    }

    resetGame();
    title.innerHTML = newHTML;
    title.setAttribute("data-content", newHTML);
}