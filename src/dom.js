import { computer, player } from ".";

const playerBoardContainer = document.querySelector("#player_board");
const playerGrid = playerBoardContainer.getElementsByClassName("grid"); 
let playerGridIndex = 0; 
const playerBoard = []; 
for (let row = 0; row < 10; row++) {
    playerBoard.push([]); 
    for (let col = 0; col < 10; col++) {
        playerBoard[row].push(playerGrid[playerGridIndex]); 
        playerGridIndex++; 
    }
}
console.log(playerBoard); 
let shipsLength = [5, 4, 3, 3, 2]; 
let shipsLengthIndex = 0; 
let computerShipsLengthIndex = 0; 
let horizontal = true; 

function highlightShip (event) {
    if (horizontal) {
        for (let col = parseInt(event.target.dataset.col); col < parseInt(event.target.dataset.col) + shipsLength[shipsLengthIndex]; col++) {
            if (col > 9) {
                alert("This space is not available"); 
                return; 
            } else {
                if (playerBoard[parseInt(event.target.dataset.row)][col].style.backgroundColor !== "yellow") {
                    playerBoard[parseInt(event.target.dataset.row)][col].style.backgroundColor = "green"; 
                }
            }
        }
    } else {
        for (let row = parseInt(event.target.dataset.row); row < parseInt(event.target.dataset.row) + shipsLength[shipsLengthIndex]; row++) {
            if (row > 9) {
                alert("This space is not available"); 
                return; 
            } else {
                if (playerBoard[row][parseInt(event.target.dataset.col)].style.backgroundColor !== "yellow") {
                    playerBoard[row][parseInt(event.target.dataset.col)].style.backgroundColor = "green"; 
                }
            }
        }
    }
}

function stopHighlightShip (event) {
        if (horizontal) {
            for (let col = parseInt(event.target.dataset.col); col < parseInt(event.target.dataset.col) + shipsLength[shipsLengthIndex]; col++) {
                if (col > 9) {
                    return;  
                } else { 
                    if (playerBoard[parseInt(event.target.dataset.row)][col].style.backgroundColor !== "yellow") {
                        playerBoard[parseInt(event.target.dataset.row)][col].style.backgroundColor = "unset"; 
                    } 
                }
            }
        } else {
            for (let row = parseInt(event.target.dataset.row); row < parseInt(event.target.dataset.row) + shipsLength[shipsLengthIndex]; row++) {
                if (row > 9) {
                    return;  
                } else {
                    if (playerBoard[row][parseInt(event.target.dataset.col)].style.backgroundColor !== "yellow") {
                        playerBoard[row][parseInt(event.target.dataset.col)].style.backgroundColor = "unset"; 
                    } 
                }
            }
        }
}

export function placeShip () {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            playerBoard[row][col].addEventListener("mouseenter", highlightShip)  
            playerBoard[row][col].addEventListener("mouseleave", stopHighlightShip); 
        }
    }
}

function computerRandomize () {
    while (true) {
        if (computerShipsLengthIndex > 4) {
            break; 
        }

        const randRow = Math.floor(Math.random() * 10); 
        const randCol = Math.floor(Math.random() * 10); 
        const randHorizontal = Math.random() < 0.5; 
        const computerPlacedShip = computer.board.placeShip(shipsLength[computerShipsLengthIndex], randRow, randCol, randHorizontal); 

        if (computerPlacedShip === false || computerPlacedShip === "Overflowed") {
            computer.board.clearGameBoard(); 
            computerShipsLengthIndex = 0; 
            continue; 
        } else {
            computerShipsLengthIndex++; 
        }
    }

    console.log("Finished generating computer board"); 
    console.log(computer);
    console.log(computer.board.board); 
}

function clearEvents() {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            playerBoard[row][col].removeEventListener("mouseenter", highlightShip); 
            playerBoard[row][col].removeEventListener("mouseleave", stopHighlightShip); 
            playerBoard[row][col].removeEventListener("click", setShip);
        }
    }
    console.log("Events deleted"); 
    computerRandomize(); 
}

function setShip (event) {
    
    const shipPlaced = player.board.placeShip(shipsLength[shipsLengthIndex], parseInt(event.target.dataset.row), parseInt(event.target.dataset.col), horizontal); 

    if (shipPlaced) {
        shipsLengthIndex++; 
        console.log(player.board); 
    } else {
        alert("A ship is already placed here"); 
        return; 
    }

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (player.board.board[row][col] === 1) {
                playerBoard[row][col].style.backgroundColor = "yellow";
            }
        }
    }

    if (shipsLengthIndex > 4) {
        clearEvents(); 
    }
}

export function confirmShip () {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            playerBoard[row][col].addEventListener("click", setShip); 
        } 
    }
} 


export function changeOrientation() {
    if (horizontal === true) {
        horizontal = false; 
    } else {
        horizontal = true; 
    }    
}
 