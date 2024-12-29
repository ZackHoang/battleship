import "./styles.css";
import "./normalize.css"; 
import { Player } from "./Player";
import { changeOrientation, confirmShip, placeShip } from "./dom";

const playerName = prompt("Welcome to Battleship! Enter your name: ", "Player 1"); 
const playerNameDisplay = document.querySelector("#player"); 
playerNameDisplay.textContent = playerName; 
export const player = new Player(playerName); 
export const computer = new Player("Computer");


placeShip(); 
const btn = document.querySelector("button"); 
btn.addEventListener("click", () => {
    changeOrientation(); 
}); 
confirmShip(); 
