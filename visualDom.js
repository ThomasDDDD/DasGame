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
//*Bild neu Rendern

export function renderField(enemyDeck, playerRoundDeck, playerHandDeck = []) {
  //* zuerst alle Karten wieder ausblenden bevor neue eingeblendet werden.
  const allCardsDisplay = document.querySelectorAll(`.cardBG`);
  for (let card of allCardsDisplay) {
    card.style.display = `none`;
  }
  //* Die Translate bewegungen der Karten wieder auf null setzen.(damit nach einem Zug die Karten wieder richtig liegen)
  for (let i = 0; i < enemyDeckVisual.children.length; i++) {
    enemyDeckVisual.children[i].style.transform = "translateY(0px)";
  }
  for (let i = 0; i < playerRoundDeckVisual.children.length; i++) {
    playerRoundDeckVisual.children[i].style.transform = "translateY(0px)";
  }
  for (let i = 0; i < playerHandDeckVisual.children.length; i++) {
    playerHandDeckVisual.children[i].style.transform = "translateY(0px)";
  }

  //* hier wird für jedes der decks eine function aufgerufen die den html Inhalt ändert.
  htmlWriter(enemyDeck, enemyDeckVisual);
  htmlWriter(playerRoundDeck, playerRoundDeckVisual);
  htmlWriter(playerHandDeck, playerHandDeckVisual);

  enemyDeckVisual.style.display = `flex`;
  playerRoundDeckVisual.style.display = `flex`;
  playerHandDeckVisual.style.display = `flex`;
}

//* Für die Zuweisung der Schriftfarbe je Kartentyp wird der Farbarray gebraucht.
const typColor = ["rgb(0, 191, 255)", "rgb(255, 89, 0)", "rgb(234, 255, 0)"];
//* Diese Function ändert den Inhalt und die Sichbarkeit der Karten im html Document

function htmlWriter(deck, visualDeck) {
  //* Für jede Karte aus dem jeweils übergebenen Deck wird der HTML Inhalt der karte hinzugefügt.

  for (let i = 0; i < deck.length; i++) {
    visualDeck.children[i].children[0].innerText = `Level: ${deck[i].level}`;
    visualDeck.children[i].children[1].innerText = `${deck[i].name}`;
    visualDeck.children[
      i
    ].children[2].children[1].children[0].innerText = `${deck[i].hp}`;
    visualDeck.children[
      i
    ].children[3].children[1].children[0].innerText = `${deck[i].dmg}`;
    visualDeck.children[
      i
    ].children[4].children[1].children[0].innerText = `${deck[i].resi}`;
    visualDeck.children[
      i
    ].children[5].children[1].children[0].innerText = `${deck[i].strong}`;
    visualDeck.children[i].children[6].innerText = `${deck[i].typ}`;
    if (deck[i].typ === `Water`) {
      visualDeck.children[i].children[6].style.color = `${typColor[0]}`;
    } else if (deck[i].typ === `Fire`) {
      visualDeck.children[i].children[6].style.color = `${typColor[1]}`;
    } else if (deck[i].typ === `Electro`) {
      visualDeck.children[i].children[6].style.color = `${typColor[2]}`;
    }
    visualDeck.children[i].style.display = `flex`;
    visualDeck.children[i].setAttribute(`cardIndex`, `${i}`);
  }
}

export function htmlUpdateCard(card, visualDeck) {
  if (visualDeck === "EnemyDeck") {
    visualDeck = enemyDeckVisual;
  } else if (visualDeck === "PlayerRoundDeck") {
    visualDeck = playerRoundDeckVisual;
  } else if (visualDeck === "PlayerHandDeck") {
    visualDeck = playerHandDeckVisual;
  }

  for (let i = 0; i < visualDeck.children.length; i++) {
    if (visualDeck.children[i].children[1].innerText === card.name) {
      visualDeck.children[i].children[0].innerText = `Level: ${card.level}`;
      visualDeck.children[i].children[1].innerText = `${card.name}`;
      visualDeck.children[
        i
      ].children[2].children[1].children[0].innerText = `${card.hp}`;
      visualDeck.children[
        i
      ].children[3].children[1].children[0].innerText = `${card.dmg}`;
      visualDeck.children[
        i
      ].children[4].children[1].children[0].innerText = `${card.resi}`;
      visualDeck.children[
        i
      ].children[5].children[1].children[0].innerText = `${card.strong}`;
      visualDeck.children[i].children[6].innerText = `${card.typ}`;
      if (card.typ === `Water`) {
        visualDeck.children[i].children[6].style.color = `${typColor[0]}`;
      } else if (card.typ === `Fire`) {
        visualDeck.children[i].children[6].style.color = `${typColor[1]}`;
      } else if (card.typ === `Electro`) {
        visualDeck.children[i].children[6].style.color = `${typColor[2]}`;
      }
    }
  }
}

//* Funktion um eine Karte auszuwählen. Hardcode für die playerRoundCards.

export function getIndex() {
  //*? new Promise erzeugt einen return erst dann wenn das darin enthaltene resolve erfolgt ist.
  return new Promise((resolve) => {
    const cards = document.querySelectorAll(".playerRC");

    //* für jede Karte wird ein click eventListener hinzugefügt welcher die onClick function zuweist.
    cards.forEach((card) => {
      card.addEventListener("click", onCardClick);
    });

    //* Hier ist die onClick function die mir den hinterlegten Index der Karte wiedergibt.
    //* auf das darin erfolgende resolve wartet die übergeordnete new Promise function.

    function onCardClick(event) {
      const cardIndex = event.currentTarget.getAttribute("cardIndex");
      resolve(parseInt(cardIndex));

      //* wurde die onclick function ausgeführt entfernt sie nach dem resolve noch alle onClick event Listener von den Karten.
      cards.forEach((card) => {
        card.removeEventListener("click", onCardClick);
      });
    }
  });
}

//* Diese function bewegt die enemyCard wenn sie vom Computer ausgewählt wurde (hardcode)

export function moveChoice(card) {
  for (let i = 0; i < enemyDeckVisual.children.length; i++) {
    if (enemyDeckVisual.children[i].children[1].innerText === card.name) {
      enemyDeckVisual.children[i].style.transform = "translateY(75px)";
    }
  }
  for (let i = 0; i < playerRoundDeckVisual.children.length; i++) {
    if (playerRoundDeckVisual.children[i].children[1].innerText === card.name) {
      playerRoundDeckVisual.children[i].style.transform = "translateY(-75px)";
    }
  }
  for (let i = 0; i < playerHandDeckVisual.children.length; i++) {
    if (playerHandDeckVisual.children[i].children[1].innerText === card.name) {
      playerHandDeckVisual.children[i].style.transform = "translateY(-175px)";
    }
  }
}

//! Schadenszahlen
//* zuerst einen Timer das der Kampf nicht instant vorbei ist.
function fightTime(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//* dann die funktion welche nach jedem Schlag ausgeführt wird.

export async function hitFeedback(hit, hitFrom) {
  await fightTime(500);
  const fightColors = ["rgba(139, 225, 0, 0.9)", "rgba(214, 46, 3, 0.9)"];
  let color = "";
  if (hitFrom === "Player") {
    color = fightColors[0];
  } else if (hitFrom === "Enemy") {
    color = fightColors[1];
  }
  console.log(`hier muss ein Hit rein, mit sagenhaften ${hit} in ${color}`);
}
