export function renderBoard() {
    const description = document.querySelector("#description"); 
    const playerBoardContainer = document.querySelector("#player_board");
    const computerBoardContainer = document.querySelector("#computer_board");  
    const playerBoard = playerBoardContainer.getElementsByClassName("grid"); 
    const computerBoard = computerBoardContainer.getElementsByClassName("grid"); 
    description.textContent = "Place your ships"; 
    // let shipsLength = [5, 4, 3, 3, 2]; 
    // for (let i = 0; i < shipsLength.length; i++) {
    //     player.board.placeShip(shipsLength[i]); 
    // }
    console.log(playerBoard); 
    console.log(computerBoard); 
}