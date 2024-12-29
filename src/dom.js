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

export function placeShip () {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            playerBoard[row][col].addEventListener("mouseenter", (e) => {
                e.target.style.backgroundColor = "green"; 
                if (horizontal === true) {
                    for (let addCol = col + 1; addCol < col + shipsLength[shipsLengthIndex]; addCol++) {
                        if (addCol > 9) {
                            alert("This space is not available"); 
                            return; 
                        } else {
                            playerBoard[row][addCol].style.backgroundColor = "green"; 
                        }
                    }
                } else {
                    for (let addRow = row + 1; addRow < row + shipsLength[shipsLengthIndex]; addRow++) {
                        if (addRow > 9) {
                            alert("This space is not available"); 
                            return;  
                        } else {
                            playerBoard[addRow][col].style.backgroundColor = "green"; 
                        }
                    }
                }
                
            }); 
    
            playerBoard[row][col].addEventListener("mouseleave", (e) => {
                e.target.style.backgroundColor = "unset"; 
                if (horizontal === true) {
                    for (let addCol = col + 1; addCol < col + shipsLength[shipsLengthIndex]; addCol++) {
                        if (addCol > 9) {
                            return; 
                        } else {
                            playerBoard[row][addCol].style.backgroundColor = "unset"; 
                        }
                    }
                } else {
                    for (let addRow = row + 1; addRow < row + shipsLength[shipsLengthIndex]; addRow++) {
                        if (addRow > 9) {
                            return; 
                        } else {
                            playerBoard[addRow][col].style.backgroundColor = "unset"; 
                        }
                    }
                }
            }); 
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

                for (let row = 0; row < 10; row++) {
                    for (let col = 0; col < 10; col++) {
                        if (player.board.board[row][col] === 1) {
                            playerBoard[row][col].style.backgroundColor = "yellow"; 
                            playerBoard[row][col].removeEventListener("mouseenter", placeShip); 
                            playerBoard[row][col].removeEventListener("mouseleave", placeShip); 
                        }
                    }
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
 