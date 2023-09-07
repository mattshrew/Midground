import React from 'react';
import { useState, useEffect } from 'react';

import '../../styles.css';
import '../../styles/games.css';
 
const C4 = () => {
    const modes = ["PLAYER\xa0VS\xa0PLAYER  ", "PLAYER\xa0VS\xa0COMPUTER"];
    const [gameState, setGameState] = useState(0);
    const [mode, setMode] = useState(0);
    const [difficulty, setDifficulty] = useState("EASY");

    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const colours = ["#60A0FF", "#A060FF", "#fff", "#333333", "#60A0FF90", "#A060FF90"];
    const players = ["P1", "P2"];
    const results = [
        '',
        `${players[0]} has won!`,
        `${players[1]} has won!`,
        "‎Draw!"
    ];


    const [player, setPlayer] = useState(0);
    const [board, setBoard] = useState([
        [-1, -1, -1, -1, -1, -1, -1], 
        [-1, -1, -1, -1, -1, -1, -1], 
        [-1, -1, -1, -1, -1, -1, -1], 
        [-1, -1, -1, -1, -1, -1, -1], 
        [-1, -1, -1, -1, -1, -1, -1], 
        [-1, -1, -1, -1, -1, -1, -1]
    ]);

    useEffect(() => {
        if (gameState === 0 && mode === 1 && player === 1) computerMove(board);
        // eslint-disable-next-line
    }, [player]);

    function titleHover(hover) {
        if (hover) {
            for (let letter of document.getElementById("game__title").children) letter.classList.add("span--active");
        } else {
            for (let letter of document.getElementById("game__title").children) letter.classList.remove("span--active");
        }
    }

    function switchMode() {
        let newMode = (mode + 1) % 2;
        setMode(newMode);
    
        resetGame();
        let title_chars = document.getElementById("game__title").children;
        for (let i = 0; i < title_chars.length; i++) {
            title_chars[i].innerHTML = (modes[newMode][i] === ' ' && i < title_chars.length - 3) ? '\xa0' : modes[newMode][i];
        }
    
        if (newMode === 0) document.getElementById("game__difficulty").style.display = "none";
        else document.getElementById("game__difficulty").style.display = "inline-block";
    }

    function switchDifficulty() {
        resetGame();
        if (difficulty === "EASY") setDifficulty("MEDIUM");
        else if (difficulty === "MEDIUM") setDifficulty("HARD");
        else setDifficulty("EASY");
    }

    function cellHover(cell, hover) {
        if (gameState !== 0 || (mode === 1 && player === 1)) return;
        let row = Number(cell.getAttribute("data-row"));
        let col = Number(cell.getAttribute("data-col"));
        for (let i = 0; i <= row; i++) {
            if (isEmpty([i, col])) {
                let hoveredCell = document.querySelector(`[data-row="${i}"][data-col="${col}"]`);
                hoveredCell.style.backgroundColor = (hover) ? colours[player+4] : "#333333";
                break;
            }
        }
    }

    function isEmpty(cell) {
        if (board[cell[0]][cell[1]] === -1) return true;
        else return false;
    }

    function playMove(cell, computer=false) {
        let row = Number(cell.getAttribute("data-row"));
        let col = Number(cell.getAttribute("data-col"));
        
        if (gameState !== 0 || (mode === 1 && player === 1 && computer === false)) return;
        let eligible = false;
        for (let i = 0; i <= row; i++) {
            if (isEmpty([i, col])) {
                row = i;
                eligible = true;
                break;
            }
        }
        if (!eligible) return;

        const newBoard = board.map((r, i) => {
            if (i === row) return r.map((c, j) => {
                if (j === col) return player;
                else return c;
            })
            else return r;
        });
        let result = checkResult(newBoard);
        setBoard(newBoard);
        setPlayer((player + 1) % 2);
        if (result > 0) return setGameState(result);
    }

    function sleep(ms) {  
        return new Promise(resolve => setTimeout(resolve, ms));  
    } 

    async function computerMove(testBoard) {
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

        if (difficulty === "EASY") {
            let choice = Math.floor(Math.random()*possible_moves.length);
            let move = possible_moves[choice];
            return playMove(document.querySelector(`[data-row="${move[0]}"][data-col="${move[1]}"]`), true);
        } else if (difficulty === "MEDIUM") {
            for (let i = 1; i >= 0; i--) {
                for (let j = 0; j < possible_moves.length; j++) {
                    testBoard[possible_moves[j][0]][possible_moves[j][1]] = i;
                    if (checkResult(testBoard) === i+1) {
                        testBoard[possible_moves[j][0]][possible_moves[j][1]] = -1;
                        return playMove(document.querySelector(`[data-row="${possible_moves[j][0]}"][data-col="${possible_moves[j][1]}"]`), true);
                    } else {
                        testBoard[possible_moves[j][0]][possible_moves[j][1]] = -1;
                    }
                }
            }

            let move;
            for (let i = 1; i >= 0; i--) {
                for (let j = 5; j <= testBoard[0].length; j++) {
                    let sub = testBoard[0].slice(j-5, j).join('');
                    if (sub === `-1${i}${i}-1-1`) move = [j-2, j-5];
                    else if (sub === `-1-1${i}${i}-1`) move = [j-1, j-4];
                    else if (sub === `-1${i}-1${i}-1`) move = [j-1, j-3, j-5];
                    else continue;
                    return playMove(document.querySelector(`[data-row="0"][data-col="${move[Math.floor(Math.random()*2)]}"]`), true);
                }
            }

            move = possible_moves[Math.floor(Math.random()*possible_moves.length)];
            return playMove(document.querySelector(`[data-row="${move[0]}"][data-col="${move[1]}"]`), true);
        } else {
            function score(board) {
                const scoring = {0: 0, 1: 1, 2: 3, 3: 10, 4:99999999};
                let scores = [0, 0];
        
        
                for (let i = board.length - 1; i >= 0; i--) {
                    for (let j = 0; j < board[i].length; j++) {
                        if (isEmpty([i, j])) continue;
                        let res = searchC4(board, i, j);
                        let p = board[i][j];
                        scores[p] += scoring[res];
                    }
                }
                scores = [Math.round(scores[0]), Math.round(scores[1])];
                return scores;
            }

            function searchC4(board, row, col, count=1, direction, max=0) {
                if (count > max) max = count;
                if (direction === undefined) {
                    for (const dir of directions) {
                        let r = row + dir[0];
                        let c = col + dir[1];
                        if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                            if (board[r][c] === board[row][col]) {
                                max = searchC4(board, r, c, count+1, dir, max);
                            }
                        }
                    }
                } else {
                    let r = row + direction[0];
                    let c = col + direction[1];
                    if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                        if (board[r][c] === board[row][col]) {
                            max = searchC4(board, r, c, count+1, direction, max);
                        }
                    }
                }
                return max;
            }

            let scores = new Proxy({}, {
                get: (target, name) => name in target ? target[name] : 0
            });
        
            for (let i = 1; i >= 0; i--) {

                for (let j = 0; j < possible_moves.length; j++) {
                    let cur_move = possible_moves[j].slice()
                    let max_score = -10e99;
                    testBoard[cur_move[0]][cur_move[1]] = i;
        
                    for (let k = 0; k < possible_moves.length; k++) {
                        // res[i]: computer score, res[(i+1)%2]: player score
                        let next_move = possible_moves[k].slice()
                        if (j === k) {
                            if (next_move[0] + 1 >= testBoard.length) continue;
                            next_move[0] += 1;
                        }
                        testBoard[next_move[0]][next_move[1]] = (i + 1) % 2;
                        let res = score(testBoard);
                        testBoard[next_move[0]][next_move[1]] = -1;
                        if (next_move[1] === 0 || next_move[1] === testBoard[0].length-1) res = [Math.round(res[0]/100) - 5, Math.round(res[1]/10) - 5];
                        let new_score = (res[(i + 1) % 2] - res[i]);
                        if (new_score > max_score) max_score = new_score;
                    }

                    testBoard[cur_move[0]][cur_move[1]] = -1;
                    if (cur_move[1] === 0 || cur_move[1] === testBoard[0].length-1 || cur_move[0] === testBoard.length-1) max_score *= 10;
                    scores[cur_move] = scores[cur_move] - (max_score);
                }
            }
            
            let moves = [];
            let max = Math.max.apply(Math, Object.values(scores));
        
            for (const key in scores) {
                if (scores[key] === max) moves.push(key);
            }
            
            let move = moves[Math.floor(Math.random()*moves.length)];
            return playMove(document.querySelector(`[data-row="${move[0]}"][data-col="${move[2]}"]`), true);
        }
    }

    function checkResult(board) {
        let empty = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (isEmpty([i, j])) empty++;
            }
        }
        
        if (empty > 36) return 0;
        
        for (let i = board.length - 1; i >= 0; i--) {
            for (let j = 0; j < board[i].length; j++) {
                if (isEmpty([i, j])) continue;
                if (searchC4(i, j)) return board[i][j] + 1;
            }
        }
        
        if (empty === 0) return 3;
        return 0;
    
        function searchC4(row, col, count=1, direction) {
            if (count === 4) return true;
            if (direction === undefined) {
                for (const dir of directions) {
                    let r = row + dir[0];
                    let c = col + dir[1];
                    if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                        if (board[r][c] === board[row][col]) {
                            if (searchC4(r, c, count+1, dir)) return true;
                        }
                    }
                }
            } else {
                let r = row + direction[0];
                let c = col + direction[1];
                if ((r >= 0 && r < board.length) && (c >= 0 && c < board[0].length)) {
                    if (board[r][c] === board[row][col]) {
                        if (searchC4(r, c, count+1, direction)) return true;
                    }
                } else {
                    return false;
                }
            }
        }
    }

    function resetGame() {
        setPlayer(0);
        setBoard([
            [-1, -1, -1, -1, -1, -1, -1], 
            [-1, -1, -1, -1, -1, -1, -1], 
            [-1, -1, -1, -1, -1, -1, -1], 
            [-1, -1, -1, -1, -1, -1, -1], 
            [-1, -1, -1, -1, -1, -1, -1], 
            [-1, -1, -1, -1, -1, -1, -1]
        ]);
        setGameState(0);
    }

    return (
        <div className="connect-4">
            <div id="game__title" data-content={modes[mode]} onClick={switchMode}>
                <span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>P</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>L</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>A</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>Y</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>E</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>R</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>&nbsp;</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>V</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>S</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>&nbsp;</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>P</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>L</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>A</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>Y</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>E</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>R</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}></span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}></span>
            </div>
            <br />
            <div id="game__difficulty" onClick={switchDifficulty}>DIFFICULTY: {difficulty}</div>

            <p id="game__info" style={{color: (gameState === 0) ? colours[player] : colours[gameState - 1]}}>{(gameState === 0) ? `${players[player]} to move` : "‎Game Over!"}</p>
            
            <table className="board">
                <tbody>
                    {
                        [...Array(6).keys()].reverse().map((row) => {
                            return (
                                <tr key={`board__row--${row}`} className="board__row">
                                    {[...Array(7).keys()].map((col) => { 
                                        return <td key={`board__col--${col}`} className={`board__cell${(board[row][col] !== -1) ? " is-active" : ""}`} data-row={row} data-col={col} style={{backgroundColor: colours[board[row][col]]}} onClick={(e) => playMove(e.target)} onMouseEnter={(e) => cellHover(e.target, true)} onMouseLeave={(e) => cellHover(e.target, false)}></td> 
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <p id="game__result" style={{color: colours[gameState - 1]}}>{results[gameState]}</p>
            <button className="game__reset" onClick={resetGame}>RESET</button>
        </div>
    );
};
 
export default C4;