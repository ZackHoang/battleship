import "./styles.css";
import "./normalize.css"; 
import { Player } from "./Player";
import { renderBoard } from "./dom";

const playerName = prompt("Welcome to Battleship! Enter your name: ", "Player 1"); 
const playerNameDisplay = document.querySelector("#player"); 
playerNameDisplay.textContent = playerName; 
const player = new Player(playerName); 
const computer = new Player("Computer");

renderBoard(); 
