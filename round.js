//import rs from "readline-sync";

import {
  playerHandDeck,
  playerRoundDeck,
  enemyDeck,
  baseStats,
  lost,
  roundCount,
  level,
  enemyMultiplier,
} from "./index.js";
import { getIndex, renderField, moveChoice } from "./visualDom.js";

//! Kampfrunde

//* eine Runde solange Gegner oder Spieler noch karten im Kampf haben

export async function round(playerRoundDeck, enemyDeck) {
  console.log(`Gegner Deck: `);
  console.log(enemyDeck);
  console.log(`Spieler Deck:  `);
  console.log(playerRoundDeck);

  let playerCard = {};
  let enemyCard = {};
  while (playerRoundDeck.length > 0 && enemyDeck.length > 0) {
    playerCard = await playerChoise(playerRoundDeck, enemyCard);
    enemyCard = enemyChoise(enemyDeck, playerCard);

    fightPlayerVsEnemy(playerCard, enemyCard);
    if (playerRoundDeck.length === 0 || enemyDeck.length === 0) {
      break;
    }
    console.log(`The Enemy Deck`);
    console.log(enemyDeck);
    console.log(`You fill up your Handdeck:`);
    console.log(playerHandDeck);
    console.log(`The Rest of your Round Deck:`);
    console.log(playerRoundDeck);
    renderField(enemyDeck, playerRoundDeck, playerHandDeck);

    enemyCard = enemyChoise(enemyDeck, playerCard);
    moveChoice(enemyCard);
    playerCard = await playerChoise(playerRoundDeck, enemyCard);
    renderField(enemyDeck, playerRoundDeck, playerHandDeck);
    fightEnemyVsPlayer(playerCard, enemyCard);

    console.log(`The Enemy Deck`);
    console.log(enemyDeck);
    console.log(`You fill up your Handdeck:`);
    console.log(playerHandDeck);
    console.log(`The Rest of your Round Deck:`);
    console.log(playerRoundDeck);
    renderField(enemyDeck, playerRoundDeck, playerHandDeck);
  }
  //statReset(playerRoundDeck, playerHandDeck);

  if (playerRoundDeck.length === 0) {
    console.log(`YOU LOOOOOOOOOSE`);
    lost.push(1);
    // Hier muss noch ne bestenlisten export rein
  } else {
    console.log(`You WON THIS ROUND`);
    roundCount.push(1);
    statReset(playerRoundDeck, playerHandDeck);
    changeLevel(level, enemyMultiplier);
  }
}

//* Spieler wählt über ReadlineSync.KeyInSelect aus seinem Deck eine Karte für den Kampf:
async function playerChoise(playerRoundDeck, enemyCard) {
  if (enemyCard === true) {
    console.log(`Dein Gegener schickt ${enemyCard.name} in den Kampf!`);
    console.log(enemyCard);
  }
  //const auswahl = [];
  //for (let card of playerRoundDeck) {
  //  auswahl.push(card.name);
  //}
  const index = await getIndex();
  console.log(index);
  const kartenWahl = playerRoundDeck[index];

  console.log(kartenWahl);
  return kartenWahl;
}

//* Ki das der Gegner eine Karte aus seinem Deck wählt die gut gegen die Spielerkarte ist.
function enemyChoise(enemyDeck, playerCard) {
  let kartenWahl = enemyDeck[Math.floor(Math.random() * enemyDeck.length)];
  //console.log(`random`);
  //console.log(kartenWahl);

  if (playerCard === true) {
    for (let card of enemyDeck) {
      //console.log(`${kartenWahl.level} + ${card.level}`);
      if (
        (kartenWahl.level <= card.level ||
          kartenWahl.hp + kartenWahl.dmg <= card.hp + card.dmg) &&
        ((playerCard.typ === "Fire" && kartenWahl.typ !== "Water") ||
          (playerCard.typ === "Water" && kartenWahl.typ !== "Electro") ||
          (playerCard.typ === "Electro" && kartenWahl.typ !== "Fire"))
      ) {
        //console.log(`rein `);
        if (
          playerCard.level < card.level &&
          ((playerCard.typ === "Fire" && card.typ === "Water") ||
            (playerCard.typ === "Water" && card.typ === "Electro") ||
            (playerCard.typ === "Electro" && card.typ === "Fire")) &&
          (playerCard.hp + playerCard.dmg * playerCard.strong <
            card.hp + card.dmg * card.strong ||
            playerCard.resi < card.strong ||
            playerCard.hp < card.dmg * card.strong * 3)
        ) {
          //console.log(`1.1`);
          kartenWahl = card;
        } else if (
          playerCard.level < card.level &&
          (playerCard.hp + playerCard.dmg * playerCard.strong <
            card.hp + card.dmg * card.strong ||
            playerCard.resi < card.strong ||
            playerCard.hp < card.dmg * card.strong * 3)
        ) {
          //console.log(`1.2`);
          kartenWahl = card;
        } else if (
          playerCard.level - 20 < card.level &&
          (playerCard.hp + playerCard.dmg * playerCard.strong <
            card.hp + card.dmg * card.strong ||
            playerCard.resi < card.strong ||
            playerCard.hp < card.dmg * card.strong * 3)
        ) {
          //console.log(`1.3`);
          kartenWahl = card;
        } else if (
          playerCard.level - 40 < card.level &&
          ((playerCard.typ === "Fire" && card.typ === "Water") ||
            (playerCard.typ === "Water" && card.typ === "Electro") ||
            (playerCard.typ === "Electro" && card.typ === "Fire")) &&
          (playerCard.hp + playerCard.dmg * playerCard.strong <
            card.hp + card.dmg * card.strong ||
            playerCard.resi < card.strong ||
            playerCard.hp < card.dmg * card.strong * 3)
        ) {
          //console.log(`1.4`);
          kartenWahl = card;
        }
      }
    }
  } else {
    for (let card of enemyDeck) {
      if (
        kartenWahl.level <= card.level ||
        kartenWahl.hp + kartenWahl.dmg < card.hp + card.dmg
      ) {
        kartenWahl = card;
      }
    }
  }
  console.log(`Dein Gegner schickt ${kartenWahl.name} in den Kampf!`);
  console.log(kartenWahl);
  return kartenWahl;
}

//* ein Kampf: player vs enemy

function fightPlayerVsEnemy(playerCard, enemyCard) {
  let playerCardCopy = { ...playerCard };
  let enemyCardCopy = { ...enemyCard };
  const typMultiplier = typMulti(playerCard, enemyCard);

  //* Kampfhandlung
  while (playerCardCopy.hp > 0 && enemyCardCopy.hp > 0) {
    let hit = Number(
      (
        (playerCardCopy.dmg * playerCardCopy.strong * typMultiplier) /
        enemyCardCopy.resi
      ).toFixed(3)
    );
    console.log(`you hit with ${hit} DMG`);
    enemyCardCopy.hp -= hit;
    if (enemyCardCopy.hp <= 0) {
      break;
    }
    hit = Number(
      (
        (enemyCardCopy.dmg * enemyCardCopy.strong * typMultiplier) /
        playerCardCopy.resi
      ).toFixed(3)
    );
    console.log(`you got a hit with ${hit} DMG`);
    playerCardCopy.hp -= hit;
  }
  //* Karten verbrennen oder in handdeck umschichten. globales Deck aktuallisieren.
  cardSortAfterFight(enemyCardCopy, enemyCard, playerCardCopy, playerCard);

  //* gwählten Karten für den Spielzug der runde reseten
  playerCard = {};
  enemyCard = {};
  // console.log(playerCardCopy);
  // console.log(enemyCardCopy);
  // console.log(playerHandDeck);
  // console.log(playerRoundDeck);
  // console.log(enemyDeck);
}

//* ein Kampf: enemy vs. player

function fightEnemyVsPlayer(playerCard, enemyCard) {
  let playerCardCopy = { ...playerCard };
  let enemyCardCopy = { ...enemyCard };
  const typMultiplier = typMulti(playerCard, enemyCard);

  //* Kampfhandlung
  while (playerCardCopy.hp > 0 && enemyCardCopy.hp > 0) {
    let hit = Number(
      (
        (enemyCardCopy.dmg * enemyCardCopy.strong * typMultiplier) /
        playerCardCopy.resi
      ).toFixed(3)
    );
    console.log(`you got a hit with ${hit} DMG`);
    playerCardCopy.hp -= hit;
    if (playerCardCopy.hp <= 0) {
      break;
    }
    hit = Number(
      (
        (playerCardCopy.dmg * playerCardCopy.strong * typMultiplier) /
        enemyCardCopy.resi
      ).toFixed(3)
    );
    console.log(`you hit with ${hit} DMG`);
    enemyCardCopy.hp -= hit;
  }

  //* Karten verbrennen oder in handdeck umschichten. globales Deck aktuallisieren.
  cardSortAfterFight(enemyCardCopy, enemyCard, playerCardCopy, playerCard);

  //* gwählten Karten für den Spielzug der runde reseten
  playerCard = {};
  enemyCard = {};
  // console.log(playerCardCopy);
  // console.log(enemyCardCopy);
  // console.log(playerHandDeck);
  // console.log(playerRoundDeck);
  // console.log(enemyDeck);
}

//? Einzelfuntionen:

//* multiplier für klasse gegen Klasse ermittelnst
function typMulti(playerCard, enemyCard) {
  if (
    (playerCard.typ === "Fire" && enemyCard.typ === "Water") ||
    (playerCard.typ === "Water" && enemyCard.typ === "Electro") ||
    (playerCard.typ === "Electro" && enemyCard.typ === "Fire")
  ) {
    return 0.8;
  } else if (playerCard.typ === enemyCard.typ) {
    return 1;
  } else {
    return 1.2;
  }
}

//* Karten nach Einzelkampf umschlichten
function cardSortAfterFight(
  enemyCardCopy,
  enemyCard,
  playerCardCopy,
  playerCard
) {
  if (enemyCardCopy.hp <= 0) {
    console.log(`Sieg -> Du bekommst ${enemyCard.name} in dein Handdeck.`);
    playerHandDeck.push(enemyCard);
    let index = enemyDeck.findIndex((card) => card.name === enemyCard.name);
    enemyDeck.splice(index, 1);
    index = playerRoundDeck.findIndex((card) => card.name === playerCard.name);
    playerRoundDeck.splice(index, 1, playerCardCopy);
  } else {
    console.log(
      `Verloren... ein schwerer Verlust. ${playerCard.name} wird verbrannt.`
    );
    let index = playerRoundDeck.findIndex(
      (card) => card.name === playerCard.name
    );
    playerRoundDeck.splice(index, 1);
    index = enemyDeck.findIndex((card) => card.name === enemyCard.name);
    enemyDeck.splice(index, 1, enemyCardCopy);
  }
}

//* am Rundenende stats der überlebten karten reseten
export function statReset(playerRoundDeck, playerHandDeck) {
  const { health } = baseStats;
  for (let card of playerRoundDeck) {
    card.hp = health * card.statPointsArr[0];
  }
  for (let card of playerHandDeck) {
    card.hp = health * card.statPointsArr[0];
  }
}
//* für Kartengenerator den level Array nach Runde erhöhen

function changeLevel(levelIn, multi) {
  level.splice(0, 2, levelIn[0] + multi, levelIn[1] + multi);
}
