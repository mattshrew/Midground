var gameActive = true;
var gamemode = "player";
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
        document.getElementById("connect-4__difficulty").addEventListener("click", function() { switchDifficulty(this); });
        document.getElementById("game__info").style.color = colours[0];
        document.getElementById("game__info").innerHTML = `${players[0]} to move`;

        let title = document.getElementById("connect-4__title"); title.addEventListener("click", function() { switchMode(this); });
        let title_letters = title.children;
        for (let title_letter of title_letters) {
            title_letter.addEventListener("mouseover", function() {
                for (let letter of title_letters) {
                    letter.classList.add("span--active");
                }
            });

            title_letter.addEventListener("mouseout", function() {
                for (let letter of title_letters) {
                    letter.classList.remove("span--active");
                }
            });
        }
    
        let cells = document.querySelectorAll(".board__cell");
        let columns = [];
        for (let i = 0; i < 7; i++) {
            columns.push(Array.from(document.querySelectorAll(`[data-col="${i}"]`)).reverse())
        }
    
        Array.from(cells, function(cell) {
            cell.addEventListener("click", function() {
                if (!(this.classList.contains("p1") || this.classList.contains("p2")) && gameActive == true && !(player == 1 && gamemode == "computer")) {
                    if (gameActive == true && !(player == 1 && gamemode == "computer")) {
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
                if (!(this.classList.contains("p1") || this.classList.contains("p2")) && gameActive == true && !(player == 1 && gamemode == "computer")) {
                    if (gameActive == true && !(player == 1 && gamemode == "computer")) {
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
                if (!(this.classList.contains("p1") || this.classList.contains("p2")) && gameActive == true && !(player == 1 && gamemode == "computer")) {
                    if (gameActive == true && !(player == 1 && gamemode == "computer")) {
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

    if (gamemode == "computer" && player == 1) {
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

    await sleep(500);
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

    await sleep(500);

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
    // console.log(possible_moves);
    await sleep(350);

    function score(board) {
        const scoring = {0: 0, 1: 1, 2: 3, 3: 10, 4:99999999};
        // let lines = [];
        let scores = [0, 0];


        for (let i = board.length - 1; i >= 0; i--) {
            for (let j = 0; j < board[i].length; j++) {
                if (isEmpty([i, j])) continue;
                let res = searchC4(i, j);
                // console.log(res);

                // let sortedPath = res[1].sort(function(a, b) {
                //     if (b[0] == a[0]) return b[1] - a[1];
                //     return b[0] - a[0]; 
                // });

                // if (!lines.includes(sortedPath)) {
                //     lines.push(sortedPath);
                //     let p = board[sortedPath[0][0]][sortedPath[0][1]];
                //     scores[p] += scoring[res[0]] / res[2];
                // } 

                let p = board[i][j];
                scores[p] += scoring[res];

            }
        }
        scores = [Math.round(scores[0]), Math.round(scores[1])];

        return scores;
    }

    function searchC4(row, col, count=1, direction, max=0) {
        // console.log(`${row} ${col} ${count} ${direction}`);
        if (count > max) max = count;

        if (direction === undefined) {
            for (const dir of directions) {
                let r = row + dir[0];
                let c = col + dir[1];
                if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                    if (board[r][c] == board[row][col]) {
                        max = searchC4(r, c, count+1, dir, max);
                    }
                }
            }
        } else {
            let r = row + direction[0];
            let c = col + direction[1];
            if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                if (board[r][c] == board[row][col]) {
                    max = searchC4(r, c, count+1, direction, max);
                }
            }
        }
        return max;
    }

    /*
    let scores = new Proxy({}, {
        get: (target, name) => name in target ? target[name] : 0
    });

    const depth = 2;

    function minimax(turn, _depth=1) {
        let max_score = -10e99;
        for (let i = 0; i < possible_moves.length; i++) {
            let next_move = possible_moves[i].slice();
            while (board[next_move[0]][next_move[1]] != -1) {
                if (next_move[0] + 1 >= board.length) break;
                else next_move[0] += 1;
            }
            if (board[next_move[0]][next_move[1]] != -1) continue;

            board[next_move[0]][next_move[1]] = turn;

            let res, new_score;
            if (_depth + 1 == depth) {
                res = score(board);
                if (next_move[1] == 0 || next_move[1] == board[0].length-1) res = [Math.round(res[0]/100) - 5, Math.round(res[1]/10) - 5];
                new_score = (res[turn] - res[(turn + 1) % 2]);
                // console.log(`${next_move}: ${new_score} (${res})`);
            } else {
                new_score = minimax((turn + 1) % 2, _depth + 1);
            }
            // console.log(`${next_move}: ${new_score} (${_depth})`);
            board[next_move[0]][next_move[1]] = -1;
            if (new_score > max_score) max_score = new_score;
        }
        return max_score;
    }

    for (let i = 0; i < possible_moves.length; i++) {
        let cur_move = possible_moves[i].slice();
        let move_score = 0;
        board[cur_move[0]][cur_move[1]] = 1; 
        // console.log('\n\n', cur_move, '(1)');
        let s0 = minimax(0);
        board[cur_move[0]][cur_move[1]] = 0; 
        // console.log('\n', cur_move, '(0)');
        let s1 = minimax(1);
        board[cur_move[0]][cur_move[1]] = -1; 
        move_score += s0;
        move_score += s1;
        // console.log(`\n${s0} + ${s1} = ${move_score}`);
        if (cur_move[1] == 0 || cur_move[1] == board[0].length-1 || cur_move[0] == board.length-1) move_score *= 10;
        scores[cur_move] = move_score;
    }

    

    let moves = [];
    let min = Math.min.apply(Math, Object.values(scores));

    for (const key in scores) {
        if (scores[key] == min) moves.push(key);
    }
    console.log(JSON.stringify(scores).replace(/,"/g, ', "').replace(/":/g, '): ').replace(/"/g, '('));
    
    console.log('\n\n\n');
    */

    
    let scores = new Proxy({}, {
        get: (target, name) => name in target ? target[name] : 0
    });

    var depth = 3;

    function minimax(turn, _depth=1) {
        let res_score;
        if ((depth - _depth) % 2 == 1) res_score = -10e999;
        else res_score = 10e999;

        for (let i = 0; i < possible_moves.length; i++) {
            let next_move = possible_moves[i].slice();
            while (board[next_move[0]][next_move[1]] != -1) {
                if (next_move[0] + 1 >= board.length) break;
                else next_move[0] += 1;
            }
            if (board[next_move[0]][next_move[1]] != -1) continue;

            board[next_move[0]][next_move[1]] = turn;

            let res, new_score;
            if (_depth + 1 == depth) {
                res = score(board);
                if (next_move[1] == 0 || next_move[1] == board[0].length-1) res[turn] = Math.round(res[turn]/10) - 5;
                new_score = (res[turn] - res[(turn + 1) % 2]);
            } else {
                // console.log('\n');
                new_score = minimax((turn + 1) % 2, _depth + 1);
            }
            // console.log(`${next_move}: ${new_score} (${_depth}) - ${res}`);
            board[next_move[0]][next_move[1]] = -1;
            if ((depth - _depth) % 2 == 1) {
                if (new_score > res_score) res_score = new_score;
            } else {
                if (new_score < res_score) res_score = new_score;
            }
            
        }
        return res_score;
    }

    for (let i = 0; i < possible_moves.length; i++) {
        let cur_move = possible_moves[i].slice();
        let move_score = 0;
        board[cur_move[0]][cur_move[1]] = 1; 
        // console.log('\n\n', cur_move, '(1)');
        let s0 = minimax(0);
        board[cur_move[0]][cur_move[1]] = 0; 
        // console.log('\n', cur_move, '(0)');
        let s1 = minimax(1);
        board[cur_move[0]][cur_move[1]] = -1; 
        move_score += s0;
        move_score += s1;
        // console.log(`\n${s0} + ${s1} = ${move_score}`);
        if (cur_move[1] == 0 || cur_move[1] == board[0].length-1 || cur_move[0] == board.length-1) move_score = Math.round(move_score/10);
        scores[cur_move] = move_score;
    }

    

    let moves = [];
    let optimal_score = Math.max.apply(Math, Object.values(scores));

    for (const key in scores) {
        if (scores[key] == optimal_score) moves.push(key);
    }
    console.log(JSON.stringify(scores).replace(/,"/g, ', "').replace(/":/g, '): ').replace(/"/g, '('));
    
    
    // console.log('\n\n\n');
    
    // scores = new Proxy({}, {
    //     get: (target, name) => name in target ? target[name] : 0
    // });

    // var depth = 2;

    // for (let i = 0; i < possible_moves.length; i++) {
    //     let cur_move = possible_moves[i].slice();
    //     let move_score = 0;
    //     board[cur_move[0]][cur_move[1]] = 1; 
    //     console.log('\n\n', cur_move, '(1)');
    //     let s0 = minimax(0);
    //     board[cur_move[0]][cur_move[1]] = 0; 
    //     console.log('\n', cur_move, '(0)');
    //     let s1 = minimax(1);
    //     board[cur_move[0]][cur_move[1]] = -1; 
    //     move_score += s0;
    //     move_score += s1;
    //     console.log(`\n${s0} + ${s1} = ${move_score}`);
    //     if (cur_move[1] == 0 || cur_move[1] == board[0].length-1 || cur_move[0] == board.length-1) move_score = Math.round(move_score/10);
    //     scores[cur_move] = move_score;
    // }


    /*
    for (let i = 1; i >= 0; i--) {
        console.log('\n\n', i);
        for (let j = 0; j < possible_moves.length; j++) {
            let cur_move = possible_moves[j].slice()
            let max_score = -10e99;
            board[cur_move[0]][cur_move[1]] = i;
            console.log(`\n\n${cur_move} (${i})`);

            for (let k = 0; k < possible_moves.length; k++) {
                // res[i]: computer score, res[(i+1)%2]: player score
                let next_move = possible_moves[k].slice()
                if (j == k) {
                    if (next_move[0] + 1 >= board.length) continue;
                    next_move[0] += 1;
                }
                board[next_move[0]][next_move[1]] = (i + 1) % 2;
                let res = score(board);
                board[next_move[0]][next_move[1]] = -1;
                if (next_move[1] == 0 || next_move[1] == board[0].length-1) res = [Math.round(res[0]/100) - 5, Math.round(res[1]/10) - 5];
                let new_score = (res[(i + 1) % 2] - res[i]);
                if (new_score > max_score) max_score = new_score;
                
                console.log(`${next_move}: ${new_score} (${res})`);
            }
            board[cur_move[0]][cur_move[1]] = -1;
            if (cur_move[1] == 0 || cur_move[1] == board[0].length-1 || cur_move[0] == board.length-1) max_score *= 10;
            scores[cur_move] = scores[cur_move] + (max_score);
            console.log(i, cur_move, max_score);
        }
    }
    */

    // for (let i = 1; i >= 0; i--) {
    //     // console.log('\n\n', i);
    //     for (let j = 0; j < possible_moves.length; j++) {
    //         let cur_move = possible_moves[j].slice();
    //         let min_score = 10e99;
    //         board[cur_move[0]][cur_move[1]] = i;
    //         // console.log(`\n\n${cur_move} (${i})`);

    //         for (let k = 0; k < possible_moves.length; k++) {
    //             let next_move = possible_moves[k].slice();
    //             let new_score = -10e99;
                
    //             while (board[next_move[0]][next_move[1]] != -1) {
    //                 if (next_move[0] + 1 >= board.length) break;
    //                 next_move[0] += 1;
    //             }
    //             if (board[next_move[0]][next_move[1]] != -1) continue;

    //             board[next_move[0]][next_move[1]] = (i + 1) % 2;
    //             // console.log('\n', next_move);

    //             for (let l = 0; l < possible_moves.length; l++) {
    //                 let next_next_move = possible_moves[l].slice();
    //                 while (board[next_next_move[0]][next_next_move[1]] != -1) {
    //                     if (next_next_move[0] + 1 >= board.length) break;
    //                     next_next_move[0] += 1;
    //                 }
    //                 if (board[next_next_move[0]][next_next_move[1]] != -1) continue;

    //                 board[next_next_move[0]][next_next_move[1]] = i;
    //                 // res[i]: computer score, res[(i+1)%2]: player score
                
    //                 let res = score(board);
    //                 board[next_next_move[0]][next_next_move[1]] = -1;
    //                 if (next_next_move[1] == 0 || next_next_move[1] == board[0].length-1) res[i] = Math.round(res[i]/10) - 5;
    //                 let next_new_score = (res[i] - res[(i + 1) % 2]);
    //                 if (next_new_score > new_score) new_score = next_new_score;
    //                 console.log(`${next_next_move}: ${next_new_score} (${res})`);
    //             }

    //             board[next_move[0]][next_move[1]] = -1;
    //             // console.log('', next_move, new_score);

    //             if (new_score < min_score) min_score = new_score;
    //             console.log(`${next_move}: ${new_score}\n`);
    //         }
    //         board[cur_move[0]][cur_move[1]] = -1;
    //         if (cur_move[1] == 0 || cur_move[1] == board[0].length-1 || cur_move[0] == board.length-1) min_score = Math.round(min_score/10);
    //         scores[cur_move] = scores[cur_move] + (min_score);
            
    //         // console.log(`\n${cur_move} (${min_score})`);
    //         // console.log(i, cur_move, -max_score);
    //     }
    // }
    
    // console.log('\n\n');

    // moves = [];
    // max = Math.max.apply(Math, Object.values(scores));

    // for (const key in scores) {
    //     if (scores[key] == max) moves.push(key);
    // }
    // console.log(JSON.stringify(scores).replace(/,"/g, ', "').replace(/":/g, '): ').replace(/"/g, '('));
    

    let move = moves[Math.floor(Math.random()*moves.length)];
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
            if (searchC4(i, j)) return board[i][j] + 1;
        }
    }

    return 0;

    function searchC4(row, col, count=1, direction) {
        if (count == 4) return true;
        // console.log(`${row} ${col} ${count} ${direction}`);
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
    if (gamemode == "player") {
        var newHTML = "PLAYER\xa0VS\xa0COMPUTER";
        gamemode = "computer";
    } else {
        var newHTML = "PLAYER\xa0VS\xa0PLAYER  ";
        gamemode = "player";
    }

    resetGame();
    let title_chars = title.children;
    for (let i = 0; i < title_chars.length; i++) {
        title_chars[i].innerHTML = newHTML[i];
    }

    // title.innerHTML = newHTML;
    title.setAttribute("data-content", newHTML);
    if (gamemode == "computer") document.getElementById("connect-4__difficulty").style.display = "inline-block";
    else document.getElementById("connect-4__difficulty").style.display = "none";
}

function switchDifficulty(diff) {
    if (difficulty == "easy") {
        var newHTML = "DIFFICULTY: MEDIUM";
        difficulty = "medium";
    } else if (difficulty == "medium") {
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