const playerBoardContainer = document.querySelector("#player_board");
const playerGrid = playerBoardContainer.getElementsByClassName("grid"); 
let playerGridIndex = 0; 
export const playerBoard = []; 
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
            playerBoard[row][col].removeEventListener("mouseenter", placeShip); 
            playerBoard[row][col].removeEventListener("mouseleave", placeShip); 
        }
    }

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            playerBoard[row][col].addEventListener("mouseenter", (e) => {
                e.target.style.backgroundColor = "green"; 
                if (horizontal === true) {
                    for (let addCol = col + 1; addCol < col + shipsLength[shipsLengthIndex]; addCol++) {
                        playerBoard[row][addCol].style.backgroundColor = "green"; 
                    }
                } else {
                    for (let addRow = row + 1; addRow < row + shipsLength[shipsLengthIndex]; addRow++) {
                        playerBoard[addRow][col].style.backgroundColor = "green"; 
                    }
                }
                
            }); 
    
            playerBoard[row][col].addEventListener("mouseleave", (e) => {
                e.target.style.backgroundColor = "unset"; 
                if (horizontal === true) {
                    for (let addCol = col + 1; addCol < col + shipsLength[shipsLengthIndex]; addCol++) {
                        playerBoard[row][addCol].style.backgroundColor = "unset"; 
                    }
                } else {
                    for (let addRow = row + 1; addRow < row + shipsLength[shipsLengthIndex]; addRow++) {
                        playerBoard[addRow][col].style.backgroundColor = "unset"; 
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
 