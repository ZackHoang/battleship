import { player } from ".";

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

export let shipsLength = [5, 4, 3, 3, 2]; 
export let shipsLengthIndex = 0; 
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

function setShip (event) {
    
    const shipPlaced = player.board.placeShip(shipsLength[shipsLengthIndex], parseInt(event.target.dataset.row), parseInt(event.target.dataset.col), horizontal); 

    if (shipPlaced) {
        shipsLengthIndex++; 
        console.log(player.board); 
    } else {
        return; 
    }

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (player.board.board[row][col] === 1) {
                playerBoard[row][col].style.backgroundColor = "yellow";
                playerBoard[row][col].removeEventListener("mouseenter", highlightShip); 
                playerBoard[row][col].removeEventListener("mouseleave", stopHighlightShip);
            }
        }
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
 