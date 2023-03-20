var gameActive = true;
var gameMode = "player";
var difficulty = "easy";
const squareIDs = ["top-left", "top-middle", "top-right", "middle-left", "middle-middle", "middle-right", "bottom-left", "bottom-middle", "bottom-right"];
const colours = ["#60A0FF", "#A060FF", "#fff"];
const players = ["x", "o"];
var player = 0;
var board = ['', '', '', '', '', '', '', '', ''];

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("tic-tac-toe__title").addEventListener("click", function() { switchMode(this); });
    document.getElementById("tic-tac-toe__difficulty").addEventListener("click", function() { switchDifficulty(this); });

    document.getElementById("game__info").style.color = colours[0];
    document.getElementById("game__info").innerHTML = `${players[0]} to move`;
    let squares = document.querySelectorAll(".board__square");

    Array.from(squares, function(square) {
        square.addEventListener("click", function() {
        if (this.innerHTML == '' && gameActive == true && !(player == 1 && gameMode == "computer")) {
            playMove(this);
        }});
    });
});

function playMove(square) {
    square.style.color = colours[player];
    square.innerHTML = players[player];
    square.classList.add("is-active");
    board[squareIDs.indexOf(square.id)] = players[player];
    player = (player + 1) % 2;
    document.getElementById("game__info").style.color = colours[player];
    document.getElementById("game__info").innerHTML = `${players[player]} to move`;
    result = checkResult(board);
    if (result > 0) {
        endGame(result);
        return;
    }

    if (gameMode == "computer" && player == 1) {
        if (difficulty == "easy") computerMove1();
        else if (difficulty == "medium") computerMove2();
        else if (difficulty == "impossible") computerMove3();
    }
}

function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));  
}  

async function computerMove1() {
    let empty_squares = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] == '') {
            empty_squares.push(i);
        }
    }
    await sleep(750);
    move = empty_squares[Math.floor(Math.random()*empty_squares.length)];
    playMove(document.getElementById(squareIDs[move]));
}

async function computerMove2() {
    await sleep(500);
    let empty_squares = [];
     for (let i = 0; i < board.length; i++) {
        if (board[i] == '') {
            empty_squares.push(i);
        }
    }
    for (let i = 2; i > 0; i--) {
        for (let j = 0; j < empty_squares.length; j++) {
            board[empty_squares[j]] = players[i-1];
            if (checkResult(board) == i) {
                board[empty_squares[j]] = '';
                playMove(document.getElementById(squareIDs[empty_squares[j]]));
                return;
            } else {
                board[empty_squares[j]] = '';
            }
        }
    }
    move = empty_squares[Math.floor(Math.random()*empty_squares.length)];
    playMove(document.getElementById(squareIDs[move]));    
}

async function computerMove3() {
    await sleep(500);
    let empty_squares = [];
    let empty_corners = [];
    let empty_edges = [];

     for (let i = 0; i < board.length; i++) {
        if (board[i] == '') {
            empty_squares.push(i);
            if (i == 0 || i == 2 || i == 6 || i == 8) empty_corners.push(i);
            if (i == 1 || i == 3 || i == 5 || i == 7) empty_edges.push(i);
        }
    }

    let empty = empty_squares.length;

    switch (empty) {
        case 9:
            let choices = [0, 2, 4, 6, 8];
            playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
            return;
        case 8:
            if (board[4] == '') playMove(document.getElementById(squareIDs[4]));
            else playMove(document.getElementById(squareIDs[empty_corners[Math.floor(Math.random()*empty_corners.length)]]));
            return;
        case 6:
            if (board[4] == players[0]) {
                if ((board[0] != " && board[8] != ") || (board[2] != " && board[6] != ")) {
                    playMove(document.getElementById(squareIDs[empty_corners[Math.floor(Math.random()*empty_corners.length)]]));
                    return;
                } else if (board[1] == players[0]) {
                    if (board[7] == '') playMove(document.getElementById(squareIDs[7]));
                    return;
                } else if (board[3] == players[0]) {
                    if (board[5] == '') playMove(document.getElementById(squareIDs[5]));
                    return;
                } else if (board[5] == players[0]) {
                    if (board[3] == '') playMove(document.getElementById(squareIDs[3]));
                    return;
                } else if (board[7] == players[0]) {
                    if (board[1] == '') playMove(document.getElementById(squareIDs[1]));
                    return;
                }
            } else if (board[0] == players[0]) {
                if (board[1] == players[0]) {
                    playMove(document.getElementById(squareIDs[2]));
                    return;
                } else if (board[2] == players[0]) {
                    playMove(document.getElementById(squareIDs[1]));
                    return;
                } else if (board[3] == players[0]) {
                    playMove(document.getElementById(squareIDs[6]));
                    return;
                } else if (board[6] == players[0]) {
                    playMove(document.getElementById(squareIDs[3]));
                    return;
                } else if (board[5] == players[0]) {
                    let choices = [2, 7, 8];
                    playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                    return;
                } else if (board[7] == players[0]) {
                    let choices = [6, 5, 8];
                    playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                    return;
                } else if (board[8] == players[0]) {
                    playMove(document.getElementById(squareIDs[empty_edges[Math.floor(Math.random()*empty_edges.length)]]));
                    return;
                }
            } else if (board[2] == players[0]) {
                if (board[1] == players[0]) {
                    playMove(document.getElementById(squareIDs[0]));
                    return;
                } else if (board[0] == players[0]) { 
                    playMove(document.getElementById(squareIDs[1]));
                    return;
                } else if (board[5] == players[0]) { 
                    playMove(document.getElementById(squareIDs[8]));
                    return;
                } else if (board[8] == players[0]) { 
                    playMove(document.getElementById(squareIDs[5]));
                    return;
                } else if (board[3] == players[0]) { 
                    let choices = [0, 6, 7];
                    playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                    return;
                } else if (board[7] == players[0]) { 
                    let choices = [3, 6, 8];
                    playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                    return;
                } else if (board[6] == players[0]) { 
                    playMove(document.getElementById(squareIDs[empty_edges[Math.floor(Math.random()*empty_edges.length)]]));
                    return;
                }
            } else if (board[6] == players[0]){
                if (board[3] == players[0]) {
                    playMove(document.getElementById(squareIDs[0]));
                    return;
                } else if (board[0] == players[0]) { 
                    playMove(document.getElementById(squareIDs[3]));
                    return;
                } else if (board[7] == players[0]) { 
                    playMove(document.getElementById(squareIDs[8]));
                    return;
                } else if (board[8] == players[0]) { 
                    playMove(document.getElementById(squareIDs[7]));
                    return;
                } else if (board[5] == players[0]) { 
                    let choices = [1, 2, 8];
                    playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                    return;
                } else if (board[1] == players[0]) { 
                    let choices = [0, 2, 5];
                    playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                    return;
                } else if (board[2] == players[0]) { 
                    playMove(document.getElementById(squareIDs[empty_edges[Math.floor(Math.random()*empty_edges.length)]]));
                    return;
                }
            } else if (board[8] == players[0]) {
                if (board[5] == players[0]) {
                    playMove(document.getElementById(squareIDs[2]));
                    return;
                } else if (board[2] == players[0]) { 
                    playMove(document.getElementById(squareIDs[5]));
                    return;
                } else if (board[7] == players[0]) { 
                    playMove(document.getElementById(squareIDs[6]));
                    return;
                } else if (board[6] == players[0]) { 
                    playMove(document.getElementById(squareIDs[7]));
                    return;
                } else if (board[3] == players[0]) { 
                    let choices = [0, 1, 6]
                    playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                    return;
                } else if (board[1] == players[0]) { 
                    let choices = [0, 3, 2]
                    playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                    return;
                } else if (board[0] == players[0]) { 
                    playMove(document.getElementById(squareIDs[empty_edges[Math.floor(Math.random()*empty_edges.length)]]));
                    return;
                }
                return;
            } else if (board[1] == players[0] && board[3] == players[0]) {
                let choices = [0, 2, 6];
                playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                return;
            } else if (board[3] == players[0] && board[7] == players[0]) {
                let choices = [0, 6, 8];
                playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                return;
            } else if (board[7] == players[0] && board[5] == players[0]) {
                let choices = [2, 6, 8];
                playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                return;
            } else if (board[5] == players[0] && board[1] == players[0]) {
                let choices = [0, 2, 8];
                playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]));
                return;
            } else if (board[1] == players[0] && board[7] == players[0]) {
                playMove(document.getElementById(squareIDs[empty_corners[Math.floor(Math.random()*empty_corners.length)]]));
                return;
            } else if (board[3] == players[0] && board[5] == players[0]) {
                playMove(document.getElementById(squareIDs[empty_corners[Math.floor(Math.random()*empty_corners.length)]]));
                return;
            }
    }


    for (let i = 2; i > 0; i--) {
        for (let j = 0; j < empty; j++) {
            board[empty_squares[j]] = players[i-1];
            if (checkResult(board) == i) {
                board[empty_squares[j]] = '';
                playMove(document.getElementById(squareIDs[empty_squares[j]]));
                return;
            } else {
                board[empty_squares[j]] = '';
            }
        }
    }
    
    let move = empty_squares[Math.floor(Math.random()*empty)];
    playMove(document.getElementById(squareIDs[move]));    
}


function checkResult(board) {
    let empty = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i] == '') empty++;
    }

    if (empty > 5) return 0;

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
    document.getElementById("game__result").style.color = colours[result - 1];
    if (result == 3) {
        document.getElementById("game__result").innerHTML = "‎Draw!";
    } else {
        document.getElementById("game__result").innerHTML = `${players[result - 1]} has won!`;
        if (gameMode == "computer" && difficulty == "impossible" && result == 1) document.getElementById("game__result").innerHTML = "‎Please tell me how..";
    }
    document.getElementById("game__info").style.color = colours[result - 1];
    document.getElementById("game__info").innerHTML = "‎Game Over!";
    gameActive = false;
}

function resetGame() {
    player = 0;
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById("game__info").style.color = colours[0];
    document.getElementById("game__info").innerHTML = `${players[0]} to move`;
    document.getElementById("game__result").innerHTML = '';
    for (let i = 0; i < squareIDs.length; i++) {
        document.getElementById(squareIDs[i]).innerHTML = '';
        document.getElementById(squareIDs[i]).classList.remove("is-active");
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
    if (gameMode == "computer") document.getElementById("tic-tac-toe__difficulty").style.display = "inline-block";
    else document.getElementById("tic-tac-toe__difficulty").style.display = "none";
}

function switchDifficulty(diff) {
    if (diff.innerHTML.slice(12) == "EASY") {
        var newHTML = "DIFFICULTY: MEDIUM";
        difficulty = "medium";
    } else if (diff.innerHTML.slice(12) == "MEDIUM") {
        var newHTML = "DIFFICULTY: IMPOSSIBLE";
        difficulty = "impossible";
    } else {
        var newHTML = "DIFFICULTY: EASY";
        difficulty = "easy";
    }

    resetGame();
    diff.innerHTML = newHTML;
    diff.setAttribute("data-content", newHTML);
}
