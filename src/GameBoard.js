import { Ship } from "./Ship";

export class GameBoard {
    constructor() {
        this.board = [];
        for (let row = 0; row < 10; row++) {
            this.board.push([]);
            for (let col = 0; col < 10; col++) {
                this.board[row].push(null);
            }
        }
        this.ships = [];
        this.missed = 0;
        this.shipsSunked = 0;
        this.allSunk = false;
    }

    placeShip(length, row, col, horizontal) {
        const ship = new Ship(length);

        if (horizontal === true) {
            const colLastPos = col + ship.length; 
            if (colLastPos > 9) {
                return "Overflowed"; 
            }

            for (let i = col; i < col + ship.length; i++) {
                if (this.board[row][i] === 1) { 
                    return false; 
                }
            }

            for (let i = col; i < col + ship.length; i++) {
                this.board[row][i] = 1; 
                ship.col.push(i); 
            }

            ship.row.push(row);
            this.ships.push(ship);
        } else {
            const rowLastPos = row + ship.length; 
            if (rowLastPos > 9) {
                return "Overflowed"; 
            }

            for (let i = row; i < row + ship.length; i++) {
                if (this.board[i][col] === 1) { 
                    return false; 
                }
            }

            for (let i = row; i < row + ship.length; i++) {
                this.board[i][col] = 1; 
                ship.row.push(i); 
            }
            
            ship.col.push(col);
            this.ships.push(ship);
        }

        return true; 
    }

    receiveAttack(row, col) {
        if (this.board[row][col] !== null) {
            for (let i = 0; i < this.ships.length; i++) {
                if (
                    this.ships[i].row.includes(row) &&
                    this.ships[i].col.includes(col)
                ) {
                    this.ships[i].hit();
                    this.board[row][col] = 0;
                    break;
                }
            }
        } else {
            this.missed++;
        }
    }

    isAllSunk() {
        for (let i = 0; i < this.ships.length; i++) {
            this.ships[i].isSunk();
            if (this.ships[i].sunk) {
                this.shipsSunked++;
            }
        }
        if (this.shipsSunked === this.ships.length) {
            this.allSunk = true;
        }
    }

    clearGameBoard() {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                this.board[row][col] = null; 
            }
        }

        while (this.ships.length > 0) {
            this.ships.pop(); 
        }
    }
}
