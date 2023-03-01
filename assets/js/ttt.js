var gameActive = true;
const squareIDs = ['top-left', 'top-middle', 'top-right', 'middle-left', 'middle-middle', 'middle-right', 'bottom-left', 'bottom-middle', 'bottom-right'];
const colours = ['#60A0FF', '#A060FF', '#fff'];
const players = ['✖', 'Ｏ'];
var player = 0;
var board = ['', '', '', '', '', '', '', '', ''];

window.addEventListener("DOMContentLoaded", function() {
    document.getElementsByClassName('game__info')[0].style.color = colours[0];
    document.getElementsByClassName('game__info')[0].innerHTML = `${players[0]} to move`;
    let squares = document.querySelectorAll(".board__square");

    Array.from(squares, function(square) {
        square.addEventListener("click", function() {
        if (this.innerHTML == '' && gameActive == true) playMove(document.getElementById(this.id));
        });
    });
});

function playMove(square) {
    square.style.color = colours[player];
    square.innerHTML = players[player];
    board[squareIDs.indexOf(square.id)] = players[player];
    player = (player + 1) % 2;
    document.getElementsByClassName('game__info')[0].style.color = colours[player];
    document.getElementsByClassName('game__info')[0].innerHTML = `${players[player]} to move`;
    result = checkResult(board);
    if (result > 0) endGame(result);
}

function checkResult(board) {
    let empty_squares = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i] == '') empty_squares++;
    }

    if (empty_squares >= 5) return 0;

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

    if (empty_squares == 0) return 3;

    return 0;
}

function endGame(result) {
    document.getElementsByClassName('game__result')[0].style.color = colours[result - 1];
    if (result == 3) {
        document.getElementsByClassName('game__result')[0].innerHTML = 'Draw!';
    } else {
        document.getElementsByClassName('game__result')[0].innerHTML = `${players[result - 1]} has won!`;
    }
    document.getElementsByClassName('game__info')[0].style.color = colours[result - 1];
    document.getElementsByClassName('game__info')[0].innerHTML = "Game over!";
    gameActive = false;
}

function resetGame() {
    player = 0;
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementsByClassName('game__info')[0].style.color = colours[0];
    document.getElementsByClassName('game__info')[0].innerHTML = `${players[0]} to move`;
    document.getElementsByClassName('game__result')[0].innerHTML = '';
    for (let i = 0; i < squareIDs.length; i++) {
        document.getElementById(squareIDs[i]).innerHTML = '';
    }
}