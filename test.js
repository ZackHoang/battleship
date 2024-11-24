import { describe, expect, test } from "@jest/globals";
import { Ship } from "./src/Ship";
import { GameBoard } from "./src/GameBoard";

const myShip = new Ship(5);
for (let i = 0; i < 5; i++) {
    myShip.hit();
}

const myGameBoard = new GameBoard();

describe("Initialize a ship", () => {
    test("Ship's length is 5", () => {
        expect(myShip.length).toBe(5);
    });
    test("Ship is hit 5 times", () => {
        expect(myShip.hitNum).toBe(5);
    });
    test("Ship is sunk", () => {
        myShip.isSunk();
        expect(myShip.sunk).toBeTruthy();
    });
});

describe("Initialize gameboard", () => {
    test("Gameboard is a 10x10 board", () => {
        for (let row = 0; row < myGameBoard.board.length; row++) {
            for (let col = 0; col < myGameBoard.board[row].length; col++) {
                expect(myGameBoard.board[row][col]).toBe(null);
            }
        }
    });
    test("Gameboard can place a ship", () => {
        myGameBoard.placeShip(5, 2, 3);
        for (let i = 3; i < 8; i++) {
            expect(myGameBoard.board[2][i]).toBe(1);
        }
    });
    test("Gameboard register a successful attack", () => {
        for (let i = 3; i < 8; i++) {
            myGameBoard.receiveAttack(2, i);
            expect(myGameBoard.board[2][i]).toBe(0);
        }
        expect(myGameBoard.ships[0].hitNum).toBe(5);
        myGameBoard.isAllSunk();
        expect(myGameBoard.shipsSunked).toBe(1);
        expect(myGameBoard.allSunk).toBeTruthy();
    });
    test("Gameboard register a missed attack", () => {
        myGameBoard.receiveAttack(0, 0);
        expect(myGameBoard.board[0][0]).toBe(null);
        expect(myGameBoard.missed).toBe(1);
    });
});
