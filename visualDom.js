import { start } from "./index.js";

const startMenu = document.querySelector(`.startMenu`);
const inputMenu = document.querySelector(`.inputMenu`);
const inputPartMenu = document.querySelector(`.input`);

const startButton = document.querySelector(`#startGame`);
const inputButton = document.querySelector(`#inputBtn`);
const inputForm = document.getElementById("nameForm");
const inputField = document.getElementById("input");
let playerName = "";

const enemyDeckVisual = document.getElementById(`enemyDeck`);
const playerRoundDeckVisual = document.getElementById(`playerRoundDeck`);
const playerHandDeckVisual = document.getElementById(`playerHandDeck`);

startButton.onclick = toNameInput;
inputButton.onclick = safeNameInput;

console.log(`bis hier gehts`);

function toNameInput() {
  startMenu.style.display = "none";
  inputPartMenu.style.display = `flex`;
  inputPartMenu.children[0].innerText = "Dein Name:";
  inputMenu.style.display = `flex`;
}

export function safeNameInput() {
  console.log(`jetzt bis hier her`);
  inputForm.onsubmit = function (event) {
    event.preventDefault(); // Verhindert das Standardformularverhalten (Seitenneuladen)
    playerName = inputField.value;
    console.log("Spielername:", playerName);
    inputField.value = "";
    inputMenu.style.display = `none`;
    start(playerName);

    // Hier kannst du die Logik fortsetzen, z.B. das nächste Menü anzeigen oder das Spiel starten
  };
}

export function renderField(enemyDeck, playerRoundDeck, playerHandDeck = []) {
  //jetzt be creative
  const typColor = ["rgb(0, 191, 255)", "rgb(255, 89, 0)", "rgb(234, 255, 0)"];
  for (let i = 0; i < enemyDeck.length; i++) {
    enemyDeckVisual.children[
      i
    ].children[0].innerText = `Level: ${enemyDeck[i].level}`;
    enemyDeckVisual.children[i].children[1].innerText = `${enemyDeck[i].name}`;
    enemyDeckVisual.children[
      i
    ].children[2].children[1].children[0].innerText = `${enemyDeck[i].hp}`;
    enemyDeckVisual.children[
      i
    ].children[3].children[1].children[0].innerText = `${enemyDeck[i].dmg}`;
    enemyDeckVisual.children[
      i
    ].children[4].children[1].children[0].innerText = `${enemyDeck[i].resi}`;
    enemyDeckVisual.children[
      i
    ].children[5].children[1].children[0].innerText = `${enemyDeck[i].strong}`;
    enemyDeckVisual.children[i].children[6].innerText = `${enemyDeck[i].typ}`;
    if (enemyDeck[i].typ === `Water`) {
      enemyDeckVisual.children[i].children[6].style.color = `${typColor[0]}`;
    } else if (enemyDeck[i].typ === `Fire`) {
      enemyDeckVisual.children[i].children[6].style.color = `${typColor[1]}`;
    } else if (enemyDeck[i].typ === `Electro`) {
      enemyDeckVisual.children[i].children[6].style.color = `${typColor[2]}`;
    }
    enemyDeckVisual.children[i].style.display = `flex`;
  }
  for (let i = 0; i < playerRoundDeck.length; i++) {
    playerRoundDeckVisual.children[
      i
    ].children[0].innerText = `Level: ${playerRoundDeck[i].level}`;
    playerRoundDeckVisual.children[
      i
    ].children[1].innerText = `${playerRoundDeck[i].name}`;
    playerRoundDeckVisual.children[
      i
    ].children[2].children[1].children[0].innerText = `${playerRoundDeck[i].hp}`;
    playerRoundDeckVisual.children[
      i
    ].children[3].children[1].children[0].innerText = `${playerRoundDeck[i].dmg}`;
    playerRoundDeckVisual.children[
      i
    ].children[4].children[1].children[0].innerText = `${playerRoundDeck[i].resi}`;
    playerRoundDeckVisual.children[
      i
    ].children[5].children[1].children[0].innerText = `${playerRoundDeck[i].strong}`;
    playerRoundDeckVisual.children[
      i
    ].children[6].innerText = `${playerRoundDeck[i].typ}`;
    if (playerRoundDeck[i].typ === `Water`) {
      playerRoundDeckVisual.children[
        i
      ].children[6].style.color = `${typColor[0]}`;
    } else if (playerRoundDeck[i].typ === `Fire`) {
      playerRoundDeckVisual.children[
        i
      ].children[6].style.color = `${typColor[1]}`;
    } else if (playerRoundDeck[i].typ === `Electro`) {
      playerRoundDeckVisual.children[
        i
      ].children[6].style.color = `${typColor[2]}`;
    }
    playerRoundDeckVisual.children[i].style.display = `flex`;
  }

  for (let i = 0; i < playerHandDeck.length; i++) {
    playerHandDeckVisual.children[
      i
    ].children[0].innerText = `Level: ${playerHandDeck[i].level}`;
    playerHandDeckVisual.children[
      i
    ].children[1].innerText = `${playerHandDeck[i].name}`;
    playerHandDeckVisual.children[
      i
    ].children[2].children[1].children[0].innerText = `${playerHandDeck[i].hp}`;
    playerHandDeckVisual.children[
      i
    ].children[3].children[1].children[0].innerText = `${playerHandDeck[i].dmg}`;
    playerHandDeckVisual.children[
      i
    ].children[4].children[1].children[0].innerText = `${playerHandDeck[i].resi}`;
    playerHandDeckVisual.children[
      i
    ].children[5].children[1].children[0].innerText = `${playerHandDeck[i].strong}`;
    playerHandDeckVisual.children[
      i
    ].children[6].innerText = `${playerHandDeck[i].typ}`;
    if (playerHandDeck[i].typ === `Water`) {
      playerHandDeckVisual.children[
        i
      ].children[6].style.color = `${typColor[0]}`;
    } else if (playerHandDeck[i].typ === `Fire`) {
      playerHandDeckVisual.children[
        i
      ].children[6].style.color = `${typColor[1]}`;
    } else if (playerHandDeck[i].typ === `Electro`) {
      playerHandDeckVisual.children[
        i
      ].children[6].style.color = `${typColor[2]}`;
    }
    playerHandDeckVisual.children[i].style.display = `flex`;
  }

  enemyDeckVisual.style.display = `flex`;
  playerRoundDeckVisual.style.display = `flex`;
  playerHandDeckVisual.style.display = `flex`;
}
