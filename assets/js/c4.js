var gameActive = true;
var gameMode = "player";
var difficulty = "easy";
const colours = ["#60A0FF", "#A060FF", "#fff", "#333333"];
const players = ["P1", "P2"];
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
            if (!(this.classList.contains("p1") || this.classList.contains("p2")) && gameActive == true && !(player == 1 && gameMode == "computer")) playMove(this);
            if (gameActive == true && !(player == 1 && gameMode == "computer")) {
                if () // check column
            }
        });
    });
});



function playMove(cell) {
    cell.style.backgroundColor = colours[player];
    cell.classList.add(`p${player+1}`)
    player = (player + 1) % 2;
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

    // resetGame();
    title.innerHTML = newHTML;
    title.setAttribute("data-content", newHTML);
    if (gameMode == "computer") document.getElementById("connect-4__difficulty").style.display = "inline-block";
    else document.getElementById("connect-4__difficulty").style.display = "none";
}