const playerBoardContainer = document.querySelector("#player_board");
const playerGrid = playerBoardContainer.getElementsByClassName("grid"); 
const playerBoard = []; 
let playerGridIndex = 0; 
for (let row = 0; row < 10; row++) {
    playerBoard.push([]);  
    for (let col = 0; col < 10; col++) {
        playerBoard[row].push(playerGrid[playerGridIndex]); 
        playerGridIndex++; 
    }
}

export function renderBoard() {
    const description = document.querySelector("#description"); 
    description.textContent = "Place your ships"; 
    console.log(playerBoard); 
    const shipsLength = [5, 4, 3, 3, 2];  

    for (let i = 0; i < shipsLength.length; i++) {
        let randomRow = Math.floor(Math.random() * 10); 
        let randomCol = Math.floor(Math.random() * 10);
        const randomVertical = false;  
        if (!randomVertical) {
            let colIter = []; 
            for (let j = 0; j < shipsLength[i]; j++) {
                colIter.push(randomCol + j); 
            }
            if (colIter.some((col) => col > 9)) {
                const difference = colIter[colIter.length - 1] - 9; 
                randomCol -= difference; 
            }
            for (let j = 0; j < shipsLength[i]; j++) {
                playerBoard[randomRow][randomCol + j].style.backgroundColor = "green"; 
            }
        }
    }
}

