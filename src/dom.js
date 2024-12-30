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
    event.target.style.backgroundColor = "green"; 
    if (horizontal === true) {
        for (let addCol = parseInt(event.target.dataset.col) + 1; addCol < parseInt(event.target.dataset.col) + shipsLength[shipsLengthIndex]; addCol++) {
            if (addCol > 9) {
                alert("This space is not available"); 
                return; 
            } else {
                playerBoard[parseInt(event.target.dataset.row)][addCol].style.backgroundColor = "green"; 
            }
        }
    } else {
        for (let addRow = parseInt(event.target.dataset.row) + 1; addRow < parseInt(event.target.dataset.row) + shipsLength[shipsLengthIndex]; addRow++) {
            if (addRow > 9) {
                alert("This space is not available"); 
                return;  
            } else {
                playerBoard[addRow][parseInt(event.target.dataset.col)].style.backgroundColor = "green"; 
            }
        }
    }
}

function stopHighlightShip (event) {
    event.target.style.backgroundColor = "unset"; 
    if (horizontal === true) {
        for (let addCol = parseInt(event.target.dataset.col) + 1; addCol < parseInt(event.target.dataset.col) + shipsLength[shipsLengthIndex]; addCol++) {
            if (addCol > 9) {
                return; 
            } else {
                playerBoard[parseInt(event.target.dataset.row)][addCol].style.backgroundColor = "unset"; 
            }
        }
    } else {
        for (let addRow = parseInt(event.target.dataset.row) + 1; addRow < parseInt(event.target.dataset.row) + shipsLength[shipsLengthIndex]; addRow++) {
            if (addRow > 9) {
                return; 
            } else {
                playerBoard[addRow][parseInt(event.target.dataset.col)].style.backgroundColor = "unset"; 
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

export function confirmShip () {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            playerBoard[row][col].addEventListener("click", (e) => {
                if (e.target.style.backgroundColor !== "yellow") {
                    player.board.placeShip(shipsLength[shipsLengthIndex], row, col, horizontal); 
                    shipsLengthIndex++; 
                    console.log(player.board); 
                } else {
                    alert("A ship is already placed here")
                }

                if (player.board.board[row][col] === 1) {
                    e.target.style.backgroundColor = "yellow";
                    e.target.removeEventListener("mouseenter", highlightShip); 
                    e.target.removeEventListener("mouseleave", stopHighlightShip);
                }
            });
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
 