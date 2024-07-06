const playerRed = "R";
const playerGreen = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;

const rows = 6;
const columns = 7;
let currColumns = []; //keeps track of which row each column is at.

window.onload = () => {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    const startColor = document.getElementById("winner");
    startColor.innerText = "Red Turn";
    startColor.style.color = "red";

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            const tile = document.createElement("div");
            tile.id = `${r.toString()}-${c.toString()}`;
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }

}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    const coords = this.id.split("-");
    let r = parseInt(coords[0]);
    const c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c];

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    const tile = document.getElementById(`${r.toString()}-${c.toString()}`);
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerGreen;
        const green = document.getElementById("winner");
        green.innerText = "Green Turn";
        green.style.color = "green";

    }
    else {
        tile.classList.add("green-piece");
        currPlayer = playerRed;
        const red = document.getElementById("winner");
        red.innerText = "Red Turn";
        red.style.color = "red";
    }

    r--; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
}

function checkWinner() {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' && (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3])) {
                setWinner(r, c);
                return;
            }
        }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ' && (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c])) {
                setWinner(r, c);
                return;
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' && (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3])) {
                setWinner(r, c);
                return;
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' && (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3])) {
                setWinner(r, c);
                return;
            }
        }
    }
}

function setWinner(r, c) {
    const winner = document.getElementById("winner");
    winner.innerText = board[r][c] == playerRed ? "Red Wins! Game will restart in 5 sec." : "Green Wins! Game will restart in 5 sec.";
    winner.style = winner.innerText == "Red Wins! Game will restart in 5 sec." ? winner.classList.add("red-win") : winner.classList.add("green-win");
    gameOver = true;
    //restart game after 5 seconds with a new game board
    setTimeout(() => {
        winner.classList.remove("red-win", "green-win");
        gameOver = false;
        currPlayer = playerRed;
        document.getElementById("board").innerHTML = "";
        setGame();
    }, 5000); //5 seconds
}

function copyright() {
    document.querySelector('.footer').innerHTML = `tabrez &copy; ${new Date().getFullYear()}`;
}
document.addEventListener('DOMContentLoaded', copyright);



