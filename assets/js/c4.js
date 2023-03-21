var gameActive = true;
var gameMode = "player";
// var difficulty = "easy";
const colours = ["#60A0FF", "#A060FF", "#fff", "#333333"];
const players = ["P1", "P2"];
const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
var player = 0;
var board = [
    [-1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1]
];

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("connect-4__title").addEventListener("click", function() { switchMode(this); });

    document.getElementById("game__info").style.color = colours[0];
    document.getElementById("game__info").innerHTML = `${players[0]} to move`;

    let cells = document.querySelectorAll(".board__cell");

    Array.from(cells, function(cell) {
        cell.addEventListener("click", function() {
            if (!(this.classList.contains("p1") || this.classList.contains("p2")) && gameActive == true && !(player == 1 && gameMode == "computer")) {
                if (gameActive == true && !(player == 1 && gameMode == "computer")) {
                    let column = Array.from(document.querySelectorAll(`[data-col="${cell.getAttribute("data-col")}"]`)).reverse();
                    column.every(function(newCell) {
                        if (newCell == cell) playMove(cell);
                        else if (isEmpty(newCell)) return false;
                        else return true;
                    });
                }
            }
        });
    });
});


function isEmpty(cell) {
    // document.querySelector(`[data-row="${cell[0]}"][data-col="${cell[1]}"]`);
    if (Array.isArray(cell)) {
        if (board[cell[0]][cell[1]] == -1) return true;
        else return false;
    }
    if (!cell.classList.contains("p1") && !cell.classList.contains("p2")) return true;
    return false;
}


function playMove(cell) {
    cell.style.backgroundColor = colours[player];
    cell.classList.add(`p${player+1}`)
    row = cell.getAttribute("data-row");
    col = cell.getAttribute("data-col");
    board[row][col] = player;
    player = (player + 1) % 2;
    document.getElementById("game__info").style.color = colours[player];
    document.getElementById("game__info").innerHTML = `${players[player]} to move`;

    let result = checkResult(board);
    if (result > 0) {
        endGame(result);
        return;
    }
}


function checkResult(board) {
    let empty = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (isEmpty([i, j])) empty++;
        }
    }
    
    
    if (empty > 35) return 0;
    else if (empty == 0) return 3;

    function searchC4(row, col, count=1, direction) {
        if (count == 4) return true;
        // alert(`${row} ${col} ${count} ${direction}`);
        if (direction === undefined) {
            for (const dir of directions) {
                let r = row + dir[0];
                let c = col + dir[1];
                if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                    if (board[r][c] == board[row][col]) {
                        if (searchC4(r, c, count+1, dir)) return true;
                    }
                }
            }
        } else {
            let r = row + direction[0];
            let c = col + direction[1];
            if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                if (board[r][c] == board[row][col]) {
                    if (searchC4(r, c, count+1, direction)) return true;
                }
            } else {
                return false;
            }
        }
        
    }

    for (let i = board.length - 1; i >= 0; i--) {
        for (let j = 0; j < board[i].length; j++) {
            if (isEmpty([i, j])) continue;
            if (searchC4(i, j)) return board[i][j] + 1;
        }
    }

    return 0;
}


function endGame(result) {
    document.getElementById("game__result").style.color = colours[result - 1];
    if (result == 3) {
        document.getElementById("game__result").innerHTML = "‎Draw!";
    } else {
        document.getElementById("game__result").innerHTML = `${players[result - 1]} has won!`;
        // if (gameMode == "computer" && difficulty == "impossible" && result == 1) document.getElementById("game__result").innerHTML = "‎Please tell me how..";
    }
    document.getElementById("game__info").style.color = colours[result - 1];
    document.getElementById("game__info").innerHTML = "‎Game Over!";
    gameActive = false;
}


function resetGame() {
    player = 0;
    board = [[-1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1]];
    gameActive = true;
    document.getElementById("game__info").style.color = colours[0];
    document.getElementById("game__info").innerHTML = `${players[0]} to move`;
    document.getElementById("game__result").innerHTML = '';
    let cells = document.getElementsByClassName("board__cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = colours[3];
        cells[i].classList.remove("p1");
        cells[i].classList.remove("p2");
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
    // if (gameMode == "computer") document.getElementById("connect-4__difficulty").style.display = "inline-block";
    // else document.getElementById("connect-4__difficulty").style.display = "none";
}