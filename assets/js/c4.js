var gameActive = true;
var gameMode = "player";
var difficulty = "easy";
const colours = ["#60A0FF", "#A060FF", "#fff", "#333333", "#60A0FF90", "#A060FF90"];
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

if (typeof window !== 'undefined') {
    window.addEventListener("DOMContentLoaded", function() {
        document.getElementById("connect-4__title").addEventListener("click", function() { switchMode(this); });
        document.getElementById("connect-4__difficulty").addEventListener("click", function() { switchDifficulty(this); });
        document.getElementById("game__info").style.color = colours[0];
        document.getElementById("game__info").innerHTML = `${players[0]} to move`;
    
        let cells = document.querySelectorAll(".board__cell");
        let columns = [];
        for (let i = 0; i < 7; i++) {
            columns.push(Array.from(document.querySelectorAll(`[data-col="${i}"]`)).reverse())
        }
    
        Array.from(cells, function(cell) {
            cell.addEventListener("click", function() {
                if (!(this.classList.contains("p1") || this.classList.contains("p2")) && gameActive == true && !(player == 1 && gameMode == "computer")) {
                    if (gameActive == true && !(player == 1 && gameMode == "computer")) {
                        let column = columns[cell.getAttribute("data-col")];
                        column.every(function(newCell) {
                            if (newCell == cell || isEmpty(newCell)) playMove(newCell);
                            else return true;
                        });
                    }
                }
            });
        });
    
        Array.from(cells, function(cell) {
            cell.addEventListener("mouseover", function() {
                if (!(this.classList.contains("p1") || this.classList.contains("p2")) && gameActive == true && !(player == 1 && gameMode == "computer")) {
                    if (gameActive == true && !(player == 1 && gameMode == "computer")) {
                        let column = Array.from(document.querySelectorAll(`[data-col="${cell.getAttribute("data-col")}"]`)).reverse();
                        column.every(function(newCell) {
                            if (newCell == cell || isEmpty(newCell)) newCell.style.backgroundColor = colours[player+4];
                            else return true;
                        });
                    }
                }
            });
        });
    
        Array.from(cells, function(cell) {
            cell.addEventListener("mouseout", function() {
                if (!(this.classList.contains("p1") || this.classList.contains("p2")) && gameActive == true && !(player == 1 && gameMode == "computer")) {
                    if (gameActive == true && !(player == 1 && gameMode == "computer")) {
                        let column = Array.from(document.querySelectorAll(`[data-col="${cell.getAttribute("data-col")}"]`)).reverse();
                        column.every(function(newCell) {
                            if (newCell == cell || isEmpty(newCell)) newCell.style.backgroundColor = "#333333";
                            else return true;
                        });
                    }
                }
            });
        });
    });
}

function printBoard() {
    for (let row of board) {
        console.log(row);
    }
}

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
    cell.classList.add("is-active");
    cell.style.backgroundColor = colours[player];
    cell.classList.add(`p${player+1}`);
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

    if (gameMode == "computer" && player == 1) {
        if (difficulty == "easy") computerMove1();
        else if (difficulty == "medium") computerMove2();
        else if (difficulty == "hard") computerMove3();
    }
}

function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));  
}  

async function computerMove1() {
    let possible_moves = [];
    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row < board.length; row++) {
            if (isEmpty([row, col])) {
                possible_moves.push([row, col]);
                break;
            }
        }
    }

    await sleep(750);
    let choice = Math.floor(Math.random()*possible_moves.length);
    let move = possible_moves[choice];
    playMove(document.querySelector(`[data-row="${move[0]}"][data-col="${move[1]}"]`));
}

async function computerMove2() {
    let possible_moves = [];
    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row < board.length; row++) {
            if (isEmpty([row, col])) {
                possible_moves.push([row, col]);
                break;
            }
        }
    }

    await sleep(750);

    for (let i = 1; i >= 0; i--) {
        for (let j = 0; j < possible_moves.length; j++) {
            board[possible_moves[j][0]][possible_moves[j][1]] = i;
            if (checkResult(board) == i+1) {
                board[possible_moves[j][0]][possible_moves[j][1]] = -1;
                playMove(document.querySelector(`[data-row="${possible_moves[j][0]}"][data-col="${possible_moves[j][1]}"]`));
                return;
            } else {
                board[possible_moves[j][0]][possible_moves[j][1]] = -1;
            }
        }
    }
    let move;
    for (let i = 1; i >= 0; i--) {
        for (let j = 5; j <= board[0].length; j++) {
            let sub = board[0].slice(j-5, j).join('');
            if (sub == `-1${i}${i}-1-1`) move = [j-2, j-5];
            else if (sub == `-1-1${i}${i}-1`) move = [j-1, j-4];
            else if (sub == `-1${i}-1${i}-1`) move = [j-1, j-3, j-5];
            else continue;
            playMove(document.querySelector(`[data-row="0"][data-col="${move[Math.floor(Math.random()*2)]}"]`));
            return;
        }
    }
    
    move = possible_moves[Math.floor(Math.random()*possible_moves.length)];
    playMove(document.querySelector(`[data-row="${move[0]}"][data-col="${move[1]}"]`));
}

async function computerMove3() {
    let possible_moves = [];

    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row < board.length; row++) {
            if (isEmpty([row, col])) {
                possible_moves.push([row, col]);
                break;
            }
        }
    }

    function score(board) {
        const scoring = {0: 0, 1: 1, 2: 3, 3: 10, 4:99999};
        let lines = [];
        let scores = [0, 0];


        for (let i = board.length - 1; i >= 0; i--) {
            for (let j = 0; j < board[i].length; j++) {
                if (isEmpty([i, j])) continue;
                res = searchC4(i, j, [[i, j]]);

                let sortedPath = res[1].sort(function(a, b) {
                    if (b[0] == a[0]) return b[1] - a[1];
                    return b[0] - a[0]; 
                });

                if (!lines.includes(sortedPath)) {
                    lines.push(sortedPath);
                    let p = board[sortedPath[0][0]][sortedPath[0][1]];
                    scores[p] += scoring[res[0]] / res[2];
                } 
                
            }
        }
        return scores;
    }

    let scores = new Proxy({}, {
        get: (target, name) => name in target ? target[name] : 0
      })

    for (let i = 1; i >= 0; i--) {
        for (let j = 0; j < possible_moves.length; j++) {
            board[possible_moves[j][0]][possible_moves[j][1]] = i;
            let res = score(board);
            scores[possible_moves[j]] = scores[possible_moves[j]] + (res[i] - res[(i + 1) % 2]);
            board[possible_moves[j][0]][possible_moves[j][1]] = -1;
        }
    }

    console.log(scores);
    let moves = [];
    let max = Math.max.apply(Math, Object.values(scores));

    for (const key in scores) {
        if (scores[key] == max) moves.push(key);
    }

    let move = moves[Math.floor(Math.random()*moves.length)];
    console.log(document.querySelector(`[data-row="${move[0]}"][data-col="${move[2]}"]`));
    playMove(document.querySelector(`[data-row="${move[0]}"][data-col="${move[2]}"]`));
}


function checkResult(board) {
    let empty = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (isEmpty([i, j])) empty++;
        }
    }
    
    if (empty > 36) return 0;
    else if (empty == 0) return 3;

    for (let i = board.length - 1; i >= 0; i--) {
        for (let j = 0; j < board[i].length; j++) {
            if (isEmpty([i, j])) continue;
            if (searchC4(i, j) == 4) return board[i][j] + 1;
        }
    }

    return 0;
}

function searchC4(row, col, path, count=1, direction) {
    // console.log(`${row} ${col} ${count} ${direction}`);
    if (count == 4) {
        if (path === undefined) return count;
        else return [count, path, 1];
    }
    if (direction === undefined) {
        for (const dir of directions) {
            let r = row + dir[0];
            let c = col + dir[1];
            if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                if (board[r][c] == board[row][col]) {
                    if (path !== undefined) path.push([r, c]);
                    return searchC4(r, c, path, count+1, dir);
                }
            }
        }
    } else {
        let r = row + direction[0];
        let c = col + direction[1];
        if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
            if (board[r][c] == board[row][col]) {
                if (path !== undefined) path.push([r, c]);
                return searchC4(r, c, path, count+1, direction);
            }
        } else {
            if (path === undefined) return count;
            else return [count, path, 100]; // hit edge
        }
    }
    if (path === undefined) return count;
    else return [count, path, 1];
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
        cells[i].classList.remove("is-active");
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
    if (gameMode == "computer") document.getElementById("connect-4__difficulty").style.display = "inline-block";
    else document.getElementById("connect-4__difficulty").style.display = "none";
}

function switchDifficulty(diff) {
    if (diff.innerHTML.slice(12) == "EASY") {
        var newHTML = "DIFFICULTY: MEDIUM";
        difficulty = "medium";
    } else if (diff.innerHTML.slice(12) == "MEDIUM") {
        var newHTML = "DIFFICULTY: HARD";
        difficulty = "hard";
    } else {
        var newHTML = "DIFFICULTY: EASY";
        difficulty = "easy";
    }

    resetGame();
    diff.innerHTML = newHTML;
    diff.setAttribute("data-content", newHTML);
}