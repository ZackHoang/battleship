import "./styles.css";
import "./normalize.css"; 
import { Player } from "./Player";
import { renderBoard } from "./dom";

const playerName = prompt("Welcome to Battleship! Enter your name: ", "Player 1"); 
const playerNameDisplay = document.querySelector("#player"); 
playerNameDisplay.textContent = playerName; 
export const player = new Player(playerName); 
export const computer = new Player("Computer");
export const shipsLocation = []; 

renderBoard(); 
