import { computer, player } from ".";

const playerBoardContainer = document.querySelector("#player_board");
const playerGrid = playerBoardContainer.getElementsByClassName("grid");
const description = document.querySelector("#description");
let playerGridIndex = 0;
const playerBoard = [];
for (let row = 0; row < 10; row++) {
    playerBoard.push([]);
    for (let col = 0; col < 10; col++) {
        playerBoard[row].push(playerGrid[playerGridIndex]);
        playerGridIndex++;
    }
}
// console.log(playerBoard);
const computerBoardCOntainer = document.querySelector("#computer_board");
const computerGrid = computerBoardCOntainer.getElementsByClassName("grid");
let computerGridIndex = 0;
const computerBoard = [];
for (let row = 0; row < 10; row++) {
    computerBoard.push([]);
    for (let col = 0; col < 10; col++) {
        computerBoard[row].push(computerGrid[computerGridIndex]);
        computerGridIndex++;
    }
}
// console.log(computerBoard);
let shipsLength = [5, 4, 3, 3, 2];
let shipsLengthIndex = 0;
let computerShipsLengthIndex = 0;
let horizontal = true;
let playerTurn = true;

function highlightShip(event) {
    if (horizontal) {
        for (
            let col = parseInt(event.target.dataset.col);
            col <
            parseInt(event.target.dataset.col) + shipsLength[shipsLengthIndex];
            col++
        ) {
            if (col > 9) {
                alert("This space is not available");
                return;
            } else {
                if (
                    playerBoard[parseInt(event.target.dataset.row)][col].style
                        .backgroundColor !== "yellow"
                ) {
                    playerBoard[parseInt(event.target.dataset.row)][
                        col
                    ].style.backgroundColor = "silver";
                }
            }
        }
    } else {
        for (
            let row = parseInt(event.target.dataset.row);
            row <
            parseInt(event.target.dataset.row) + shipsLength[shipsLengthIndex];
            row++
        ) {
            if (row > 9) {
                alert("This space is not available");
                return;
            } else {
                if (
                    playerBoard[row][parseInt(event.target.dataset.col)].style
                        .backgroundColor !== "yellow"
                ) {
                    playerBoard[row][
                        parseInt(event.target.dataset.col)
                    ].style.backgroundColor = "silver";
                }
            }
        }
    }
}

function stopHighlightShip(event) {
    if (horizontal) {
        for (
            let col = parseInt(event.target.dataset.col);
            col <
            parseInt(event.target.dataset.col) + shipsLength[shipsLengthIndex];
            col++
        ) {
            if (col > 9) {
                return;
            } else {
                if (
                    playerBoard[parseInt(event.target.dataset.row)][col].style
                        .backgroundColor !== "yellow"
                ) {
                    playerBoard[parseInt(event.target.dataset.row)][
                        col
                    ].style.backgroundColor = "unset";
                }
            }
        }
    } else {
        for (
            let row = parseInt(event.target.dataset.row);
            row <
            parseInt(event.target.dataset.row) + shipsLength[shipsLengthIndex];
            row++
        ) {
            if (row > 9) {
                return;
            } else {
                if (
                    playerBoard[row][parseInt(event.target.dataset.col)].style
                        .backgroundColor !== "yellow"
                ) {
                    playerBoard[row][
                        parseInt(event.target.dataset.col)
                    ].style.backgroundColor = "unset";
                }
            }
        }
    }
}

export function placeShip() {
    description.textContent = `Place Your Ships, ${player.name}!`;
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            playerBoard[row][col].addEventListener("mouseenter", highlightShip);
            playerBoard[row][col].addEventListener(
                "mouseleave",
                stopHighlightShip
            );
        }
    }
}

function computerRandomize() {
    while (true) {
        if (computerShipsLengthIndex > 4) {
            break;
        }

        const randRow = Math.floor(Math.random() * 10);
        const randCol = Math.floor(Math.random() * 10);
        const randHorizontal = Math.random() < 0.5;
        const computerPlacedShip = computer.board.placeShip(
            shipsLength[computerShipsLengthIndex],
            randRow,
            randCol,
            randHorizontal
        );

        if (
            computerPlacedShip === false ||
            computerPlacedShip === "Overflowed"
        ) {
            computer.board.clearGameBoard();
            computerShipsLengthIndex = 0;
            continue;
        } else {
            computerShipsLengthIndex++;
        }
    }

    // console.log("Finished generating computer board");
    // console.log(computer);
    // console.log(computer.board.board);
}

function highlightSquare(event) {
    computerBoard[parseInt(event.target.dataset.row)][
        parseInt(event.target.dataset.col)
    ].style.backgroundColor = "silver";
}

function stopHightlightSquare(event) {
    computerBoard[parseInt(event.target.dataset.row)][
        parseInt(event.target.dataset.col)
    ].style.backgroundColor = "unset";
}

function playerMove(event) {
    computerBoard[parseInt(event.target.dataset.row)][
        parseInt(event.target.dataset.col)
    ].removeEventListener("mouseenter", highlightSquare);
    computerBoard[parseInt(event.target.dataset.row)][
        parseInt(event.target.dataset.col)
    ].removeEventListener("mouseleave", stopHightlightSquare);
    const isHitComputerShip = computer.board.receiveAttack(
        parseInt(event.target.dataset.row),
        parseInt(event.target.dataset.col)
    );

    if (isHitComputerShip === true) {
        computerBoard[parseInt(event.target.dataset.row)][
            parseInt(event.target.dataset.col)
        ].style.backgroundColor = "red";
        playerTurn = false;
    } else if (isHitComputerShip === false) {
        computerBoard[parseInt(event.target.dataset.row)][
            parseInt(event.target.dataset.col)
        ].style.backgroundColor = "green";
        playerTurn = false;
    } else {
        alert(isHitComputerShip);
    }

    playRound();
}

function computerMove() {
    while (true) {
        const randRow = Math.floor(Math.random() * 10);
        const randCol = Math.floor(Math.random() * 10);
        const isHitPlayerShip = player.board.receiveAttack(randRow, randCol);

        if (isHitPlayerShip === true) {
            playerBoard[randRow][randCol].style.backgroundColor = "red";
            playerTurn = true;
            break;
        } else if (isHitPlayerShip === false) {
            playerBoard[randRow][randCol].style.backgroundColor = "green";
            playerTurn = true;
            break;
        } else {
            continue;
        }
    }

    playRound();
}

function playRound() {
    description.textContent = "Make your shot!";

    const isPlayerWin = computer.board.isAllSunk();
    const isComputerWin = player.board.isAllSunk();

    if (isPlayerWin) {
        description.textContent = "You Won! Thanks for playing :)";
        return;
    }

    if (isComputerWin) {
        description.textContent = "Computer Won! Maybe next time :(";
        return;
    }

    if (playerTurn) {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (
                    computerBoard[row][col].style.backgroundColor !== "red" &&
                    computerBoard[row][col].style.backgroundColor !== "green"
                ) {
                    computerBoard[row][col].addEventListener(
                        "mouseenter",
                        highlightSquare
                    );
                    computerBoard[row][col].addEventListener(
                        "mouseleave",
                        stopHightlightSquare
                    );
                    computerBoard[row][col].addEventListener(
                        "click",
                        playerMove
                    );
                }
            }
        }
    } else {
        computerMove();
    }
}

export function clearEvents() {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            playerBoard[row][col].removeEventListener(
                "mouseenter",
                highlightShip
            );
            playerBoard[row][col].removeEventListener(
                "mouseleave",
                stopHighlightShip
            );
            playerBoard[row][col].removeEventListener("click", setShip);
        }
    }
    // console.log("Events deleted");
    computerRandomize();
    playRound();
}

function setShip(event) {
    const shipPlaced = player.board.placeShip(
        shipsLength[shipsLengthIndex],
        parseInt(event.target.dataset.row),
        parseInt(event.target.dataset.col),
        horizontal
    );

    if (shipPlaced === true) {
        shipsLengthIndex++;
        // console.log(player.board);
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (player.board.board[row][col] === 1) {
                    playerBoard[row][col].style.backgroundColor = "yellow";
                }
            }
        }
    } else if (shipPlaced === false) {
        alert("A ship is already placed here");
        return;
    }

    if (shipsLengthIndex > 4) {
        clearEvents();
    }
}

export function confirmShip() {
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
