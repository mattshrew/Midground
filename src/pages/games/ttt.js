import React from 'react';
import { useState, useEffect } from 'react';

import '../../styles.css';
import '../../styles/games.css';
 
const TTT = () => {
    const modes = ["PLAYER\xa0VS\xa0PLAYER  ", "PLAYER\xa0VS\xa0COMPUTER"];
    const [gameState, setGameState] = useState(0);
    const [mode, setMode] = useState(0);
    const [difficulty, setDifficulty] = useState("EASY");

    const squareIDs = ["top-left", "top-middle", "top-right", "middle-left", "middle-middle", "middle-right", "bottom-left", "bottom-middle", "bottom-right"];
    const colours = ["#60A0FF", "#A060FF", "#fff"];
    const players = ["x", "o"];
    const results = [
        '',
        `${players[0]} has won!`,
        `${players[1]} has won!`,
        "‎Draw!"
    ];

    const [player, setPlayer] = useState(0);
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);

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

    function playMove(square, computer=false) {
        let index = squareIDs.indexOf(square.id);
        if (board[index] !== '' || gameState !== 0 || (mode === 1 && player === 1 && computer === false)) return;
        const newBoard = board.map((s, i) => {
            if (i === index) return players[player];
            else return s;
        });
        let result = checkResult(newBoard);
        setBoard(newBoard);
        setPlayer((player + 1) % 2);
        if (result > 0) return setGameState(result);
        // runs before setPlayer changes 'player'; same thing with newBoard isntead of board
    }

    function sleep(ms) {  
        return new Promise(resolve => setTimeout(resolve, ms));  
    } 

    async function computerMove(testBoard) {
        let empty_squares = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                empty_squares.push(i);
            }
        }
        
        await sleep(750);

        if (difficulty === "EASY") {
            let move = empty_squares[Math.floor(Math.random()*empty_squares.length)];
            return playMove(document.getElementById(squareIDs[move]), true);
        } else if (difficulty === "MEDIUM") {
            for (let i = 2; i > 0; i--) {
                for (let j = 0; j < empty_squares.length; j++) {
                    testBoard[empty_squares[j]] = players[i-1];
                    if (checkResult(testBoard) === i) {
                        testBoard[empty_squares[j]] = '';
                        return playMove(document.getElementById(squareIDs[empty_squares[j]]), true);
                    } else {
                        testBoard[empty_squares[j]] = '';
                    }
                }
            }
            let move = empty_squares[Math.floor(Math.random()*empty_squares.length)];
            return playMove(document.getElementById(squareIDs[move]), true);
        } else {
            let empty = empty_squares.length;
            let empty_corners = [];
            let empty_edges = [];
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    if (i === 0 || i === 2 || i === 6 || i === 8) empty_corners.push(i);
                    if (i === 1 || i === 3 || i === 5 || i === 7) empty_edges.push(i);
                }
            }

            // eslint-disable-next-line
            switch (empty) {
                case 9:
                    let choices = [0, 2, 4, 6, 8];
                    return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                case 8:
                    if (board[4] === '') return playMove(document.getElementById(squareIDs[4]), true);
                    else return playMove(document.getElementById(squareIDs[empty_corners[Math.floor(Math.random()*empty_corners.length)]]), true);
                case 6:
                    if (board[4] === players[0]) {
                        if ((board[0] !== '' && board[8] !== '') || (board[2] !== '' && board[6] !== '')) {
                            return playMove(document.getElementById(squareIDs[empty_corners[Math.floor(Math.random()*empty_corners.length)]]), true);
                        } else if (board[1] === players[0]) {
                            if (board[7] === '') return playMove(document.getElementById(squareIDs[7]), true);
                        } else if (board[3] === players[0]) {
                            if (board[5] === '') return playMove(document.getElementById(squareIDs[5]), true);
                        } else if (board[5] === players[0]) {
                            if (board[3] === '') return playMove(document.getElementById(squareIDs[3]), true);
                        } else if (board[7] === players[0]) {
                            if (board[1] === '') return playMove(document.getElementById(squareIDs[1]), true);
                        }
                    } else if (board[0] === players[0]) {
                        if (board[1] === players[0]) {
                            return playMove(document.getElementById(squareIDs[2]), true);
                        } else if (board[2] === players[0]) {
                            return playMove(document.getElementById(squareIDs[1]), true);
                        } else if (board[3] === players[0]) {
                            return playMove(document.getElementById(squareIDs[6]), true);
                        } else if (board[6] === players[0]) {
                            return playMove(document.getElementById(squareIDs[3]), true);
                        } else if (board[5] === players[0]) {
                            let choices = [2, 7, 8];
                            return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                        } else if (board[7] === players[0]) {
                            let choices = [6, 5, 8];
                            return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                        } else if (board[8] === players[0]) {
                            return playMove(document.getElementById(squareIDs[empty_edges[Math.floor(Math.random()*empty_edges.length)]]), true);
                        }
                    } else if (board[2] === players[0]) {
                        if (board[1] === players[0]) {
                            return playMove(document.getElementById(squareIDs[0]), true);
                        } else if (board[0] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[1]), true);
                        } else if (board[5] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[8]), true);
                        } else if (board[8] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[5]), true);
                        } else if (board[3] === players[0]) { 
                            let choices = [0, 6, 7];
                            return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                        } else if (board[7] === players[0]) { 
                            let choices = [3, 6, 8];
                            return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                        } else if (board[6] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[empty_edges[Math.floor(Math.random()*empty_edges.length)]]), true);
                        }
                    } else if (board[6] === players[0]){
                        if (board[3] === players[0]) {
                            return playMove(document.getElementById(squareIDs[0]), true);
                        } else if (board[0] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[3]), true);
                        } else if (board[7] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[8]), true);
                        } else if (board[8] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[7]), true);
                        } else if (board[5] === players[0]) { 
                            let choices = [1, 2, 8];
                            return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                        } else if (board[1] === players[0]) { 
                            let choices = [0, 2, 5];
                            return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                        } else if (board[2] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[empty_edges[Math.floor(Math.random()*empty_edges.length)]]), true);
                        }
                    } else if (board[8] === players[0]) {
                        if (board[5] === players[0]) {
                            return playMove(document.getElementById(squareIDs[2]), true);
                        } else if (board[2] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[5]), true);
                        } else if (board[7] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[6]), true);
                        } else if (board[6] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[7]), true);
                        } else if (board[3] === players[0]) { 
                            let choices = [0, 1, 6]
                            return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                        } else if (board[1] === players[0]) { 
                            let choices = [0, 3, 2]
                            return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                        } else if (board[0] === players[0]) { 
                            return playMove(document.getElementById(squareIDs[empty_edges[Math.floor(Math.random()*empty_edges.length)]]), true);
                        }
                        return;
                    } else if (board[1] === players[0] && board[3] === players[0]) {
                        let choices = [0, 2, 6];
                        return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                    } else if (board[3] === players[0] && board[7] === players[0]) {
                        let choices = [0, 6, 8];
                        return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                    } else if (board[7] === players[0] && board[5] === players[0]) {
                        let choices = [2, 6, 8];
                        return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                    } else if (board[5] === players[0] && board[1] === players[0]) {
                        let choices = [0, 2, 8];
                        return playMove(document.getElementById(squareIDs[choices[Math.floor(Math.random()*choices.length)]]), true);
                    } else if (board[1] === players[0] && board[7] === players[0]) {
                        return playMove(document.getElementById(squareIDs[empty_corners[Math.floor(Math.random()*empty_corners.length)]]), true);
                    } else if (board[3] === players[0] && board[5] === players[0]) {
                        return playMove(document.getElementById(squareIDs[empty_corners[Math.floor(Math.random()*empty_corners.length)]]), true);
                    }
            }

            for (let i = 2; i > 0; i--) {
                for (let j = 0; j < empty_squares.length; j++) {
                    testBoard[empty_squares[j]] = players[i-1];
                    if (checkResult(testBoard) === i) {
                        testBoard[empty_squares[j]] = '';
                        return playMove(document.getElementById(squareIDs[empty_squares[j]]), true);
                    } else {
                        testBoard[empty_squares[j]] = '';
                    }
                }
            }
            let move = empty_squares[Math.floor(Math.random()*empty_squares.length)];
            return playMove(document.getElementById(squareIDs[move]), true);    
        }
    }

    function checkResult(board) {
        let empty = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') empty++;
        }

        if (empty > 5) return 0;

        for (let i = 0; i < 2; i++) {
            const p = players[i];

            if (board[0] === p && board[1] === p && board[2] === p) return i + 1;
            if (board[3] === p && board[4] === p && board[5] === p) return i + 1;
            if (board[6] === p && board[7] === p && board[8] === p) return i + 1;

            if (board[0] === p && board[3] === p && board[6] === p) return i + 1;
            if (board[1] === p && board[4] === p && board[7] === p) return i + 1;
            if (board[2] === p && board[5] === p && board[8] === p) return i + 1;

            if (board[0] === p && board[4] === p && board[8] === p) return i + 1;
            if (board[2] === p && board[4] === p && board[6] === p) return i + 1;
        }

        if (empty === 0) return 3;

        return 0;
    }

    function resetGame() {
        setPlayer(0);
        setBoard(['', '', '', '', '', '', '', '', '']);
        setGameState(0);
    }


    return (
        <div className="tic-tac-toe">
            <div id="game__title" data-content={modes[mode]} onClick={switchMode} >
                <span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>P</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>L</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>A</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>Y</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>E</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>R</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>&nbsp;</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>V</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>S</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>&nbsp;</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>P</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>L</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>A</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>Y</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>E</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}>R</span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}></span><span onMouseEnter={() => titleHover(true)} onMouseLeave={() => titleHover(false)}></span>
            </div>
            <br />
            <div id="game__difficulty" onClick={switchDifficulty}>DIFFICULTY: {difficulty}</div>

            <p id="game__info" style={{color: (gameState === 0) ? colours[player] : colours[gameState - 1]}}>{(gameState === 0) ? `${players[player]} to move` : "‎Game Over!"}</p>

            <div className="board">
                { squareIDs.map((s, i) => { return <div key={s} className={`board__square${(board[i] !== '') ? " is-active" : ""}`} id={s} style={{color: colours[players.indexOf(board[i])]}} onClick={(e) => playMove(e.target)}>{board[i]}</div> }) }
            </div>

            <p id="game__result" style={{color: colours[gameState - 1]}}>{(mode === 1 && gameState === 1 && difficulty === "HARD") ? "‎Please tell me how.." : results[gameState]}</p>
            <button className="game__reset" onClick={resetGame}>RESET</button>
        </div>
    );
};
 
export default TTT;