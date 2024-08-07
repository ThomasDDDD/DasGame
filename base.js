//! import:

import { cardNamesGenerator, statCalculate } from "./generate.js";
import { playerHandDeck } from "./index.js";
import {
  choicemateOrBurn,
  choiceMateOrRound,
  renderField,
  getIndex,
  moveChoice,
  yesNo,
  baseBurnMateRoundVisual,
} from "./visualDom.js";

//*...

export async function base(playerRoundDeck, playerHandDeck) {
  //* Round Karten in Handdeck schieben und in RoundDeck löschen
  for (let card of playerRoundDeck) {
    playerHandDeck.push(card);
  }
  playerRoundDeck = [];

  console.log(playerRoundDeck);
  console.log(playerHandDeck);
  renderField(enemyDeck, playerRoundDeck, playerHandDeck);
  //* Auswahl paaren/verbrennen/abbrechen

  while (playerHandDeck.length > 9) {
    renderField([], [], playerHandDeck);
    let choice = await choicemateOrBurn();
    if (choice === "Paaren") {
      await mateCards(playerHandDeck);
    } else if (choice === "Verbrennen") {
      await burnCards(playerHandDeck);
    }
  }
  while (playerHandDeck.length > 3) {
    renderField([], [], playerHandDeck);
    let choice = await choiceMateOrRound();
    if (choice === "Paaren") {
      await mateCards(playerHandDeck);
    } else if (choice === "nächste Runde") {
      break;
    }
  }
  renderField([], playerRoundDeck, playerHandDeck);
  await choseRoundDeck(playerRoundDeck, playerHandDeck);
  //console.log(playerRoundDeck);

  return playerRoundDeck;

  //*
}

//? Einzelfunktionen:

//* karte verbrennen

async function burnCards(playerHandDeck) {
  baseBurnMateRoundVisual("Bitte wähle eine karte die du verbrennen möchtest!");
  let sure = 1;
  let kartenWahl = {};

  while (sure === 1) {
    let index = await getIndex(`.playerHC`);
    kartenWahl = playerHandDeck[index];
    moveChoice(kartenWahl);
    let choice = await yesNo();
    if (choice === "Ja") {
      sure = 0;
    } else if (choice === "Nein") {
      sure = 1;
    } else if (choice === "Abbrechen") {
      sure = 2;
    }
    if (sure === 1) {
      baseBurnMateRoundVisual(`dann wähle eine andere Karte!`);
      renderField([], [], playerHandDeck);
      continue;
    } else if (sure === 2) {
      break;
    }
  }
  if (sure === 0) {
    const cardToBurn = playerHandDeck.findIndex((card) => card.name === kartenWahl.name);
    playerHandDeck.splice(cardToBurn, 1);
  }
}

//* karten zum paaren wählen

async function mateCards(playerHandDeck) {
  baseBurnMateRoundVisual("Bitte wähle zwei karten die du paaren möchtest!");
  let sure = 1;
  let kartenWahlToPair = [];

  while (sure === 1) {
    if (kartenWahlToPair.length > 0) {
      kartenWahlToPair = [];
    }

    while (kartenWahlToPair.length < 2) {
      let index = await getIndex(`.playerHC`);
      let kartenWahl = playerHandDeck[index];
      kartenWahlToPair.push(kartenWahl);
      moveChoice(kartenWahl);
    }

    let choice = await yesNo();
    if (choice === "Ja") {
      sure = 0;
    } else if (choice === "Nein") {
      sure = 1;
    } else if (choice === "Abbrechen") {
      sure = 2;
    }
    if (sure === 1) {
      renderField([], [], playerHandDeck);
      baseBurnMateRoundVisual(`dann wähle zwei neue Karten!`);
      continue;
    } else if (sure === 2) {
      kartenWahlToPair = [];
      renderField([], [], playerHandDeck);
      break;
    }
  }
  if (sure === 0) {
    const newCard = mate(kartenWahlToPair);
    playerHandDeck.push(newCard);
    renderField([], [], playerHandDeck);
  }
}
//* paaren:

function mate(kartenWahlToPair) {
  console.log(kartenWahlToPair);
  const newCard = {};
  const newStatPointsArr = [];
  for (let i = 0; i < 4; i++) {
    newStatPointsArr.push(
      kartenWahlToPair[0].statPointsArr[i] > kartenWahlToPair[1].statPointsArr[i]
        ? kartenWahlToPair[0].statPointsArr[i]
        : kartenWahlToPair[1].statPointsArr[i]
    );
  }
  newCard.level = 0;
  newCard.statPointsArr = newStatPointsArr;
  for (let stat of newStatPointsArr) {
    newCard.level += stat;
  }
  cardNamesGenerator(newCard);
  statCalculate(newCard);
  for (let card of kartenWahlToPair) {
    let index = playerHandDeck.indexOf(card);
    console.log(index);
    playerHandDeck.splice(index, 1);
  }
  return newCard;
}

//* Rundenkarten für nächste Runde wählen

async function choseRoundDeck(playerRoundDeck, playerHandDeck) {
  baseBurnMateRoundVisual("Bitte wähle drei karten die du in die nächste Runde mit nehmen möchtest!");
  let sure = 1;

  while (sure === 1) {
    if (playerRoundDeck.length > 0) {
      playerRoundDeck = [];
    }

    while (playerRoundDeck.length < 3) {
      let index = await getIndex(`.playerHC`);
      let kartenWahl = playerHandDeck[index];
      playerRoundDeck.push(kartenWahl);
      moveChoice(kartenWahl);
    }

    let choice = await yesNo();
    if (choice === "Ja") {
      sure = 0;
    } else if (choice === "Nein") {
      sure = 1;
    } else if (choice === "Abbrechen") {
      sure = 2;
    }
    if (sure === 1 || sure === 2) {
      renderField([], [], playerHandDeck);
      baseBurnMateRoundVisual(`dann wähle drei neue Karten!`);
      sure = 1;
      continue;
    }
  }
  if (sure === 0) {
    for (let card of playerRoundDeck) {
      let index = playerHandDeck.indexOf(card);
      console.log(index);
      playerHandDeck.splice(index, 1);
    }
    renderField([], playerRoundDeck, playerHandDeck);
  }
}
