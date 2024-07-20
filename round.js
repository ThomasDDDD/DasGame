import rs from "readline-sync";
//* next import nur für test:
import { playerHandDeck, playerRoundDeck, enemyDeck } from "./index.js";

//! Kampfrunde

export function round(playerRoundDeck, enemyDeck) {
  console.log(`Gegner Deck: `);
  console.log(enemyDeck);
  console.log(`Spieler Deck:  `);
  console.log(playerRoundDeck);

  let playerCard = {};
  let enemyCard = {};

  playerCard = playerChoise(playerRoundDeck, enemyCard);
  enemyCard = enemyChoise(enemyDeck, playerCard);

  fightPlayerVsEnemy(playerCard, enemyCard);

  enemyCard = enemyChoise(enemyDeck, playerCard);
  playerCard = playerChoise(playerRoundDeck, enemyCard);

  //figthEnemyVsPlayer(playerCard, enemyCard);

  //!...hier gehts weiter...
}

//* Spieler wählt über ReadlineSync.KeyInSelect aus seinem Deck eine Karte für den Kampf:
function playerChoise(playerRoundDeck, enemyCard) {
  if (enemyCard === true) {
    console.log(`Dein Gegener schickt ${enemyCard.name} in den Kampf!`);
    console.log(enemyCard);
  }
  const auswahl = [];
  for (let card of playerRoundDeck) {
    auswahl.push(card.name);
  }

  const kartenWahl = playerRoundDeck[rs.keyInSelect(auswahl, `\nBitte wähle eine Karte für den Kampf: `)];

  console.log(`Du schickst ${kartenWahl.name} in den Kampf!`);
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
        (kartenWahl.level <= card.level || kartenWahl.hp + kartenWahl.dmg <= card.hp + card.dmg) &&
        ((playerCard.typ === "fire" && kartenWahl.typ !== "water") ||
          (playerCard.typ === "water" && kartenWahl.typ !== "electro") ||
          (playerCard.typ === "electro" && kartenWahl.typ !== "fire"))
      ) {
        //console.log(`rein `);
        if (
          playerCard.level < card.level &&
          ((playerCard.typ === "fire" && card.typ === "water") ||
            (playerCard.typ === "water" && card.typ === "electro") ||
            (playerCard.typ === "electro" && card.typ === "fire")) &&
          (playerCard.hp + playerCard.dmg * playerCard.strong < card.hp + card.dmg * card.strong ||
            playerCard.resi < card.strong ||
            playerCard.hp < card.dmg * card.strong * 3)
        ) {
          //console.log(`1.1`);
          kartenWahl = card;
        } else if (
          playerCard.level < card.level &&
          (playerCard.hp + playerCard.dmg * playerCard.strong < card.hp + card.dmg * card.strong ||
            playerCard.resi < card.strong ||
            playerCard.hp < card.dmg * card.strong * 3)
        ) {
          //console.log(`1.2`);
          kartenWahl = card;
        } else if (
          playerCard.level - 20 < card.level &&
          (playerCard.hp + playerCard.dmg * playerCard.strong < card.hp + card.dmg * card.strong ||
            playerCard.resi < card.strong ||
            playerCard.hp < card.dmg * card.strong * 3)
        ) {
          //console.log(`1.3`);
          kartenWahl = card;
        } else if (
          playerCard.level - 40 < card.level &&
          ((playerCard.typ === "fire" && card.typ === "water") ||
            (playerCard.typ === "water" && card.typ === "electro") ||
            (playerCard.typ === "electro" && card.typ === "fire")) &&
          (playerCard.hp + playerCard.dmg * playerCard.strong < card.hp + card.dmg * card.strong ||
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
      if (kartenWahl.level <= card.level || kartenWahl.hp + kartenWahl.dmg <= card.hp + card.dmg) {
        kartenWahl = card;
      }
    }
  }
  console.log(`Dein Gegner schickt ${kartenWahl.name} in den Kampf!`);
  console.log(kartenWahl);
  return kartenWahl;
}

//* ein Kampf player vs enemy

function fightPlayerVsEnemy(playerCard, enemyCard) {
  let playerCardCopy = { ...playerCard };
  let enemyCardCopy = { ...enemyCard };

  //* multiplier für klasse ermitteln
  let typMulti = 1;
  if (
    (playerCard.typ === "fire" && enemyCard.typ === "water") ||
    (playerCard.typ === "water" && enemyCard.typ === "electro") ||
    (playerCard.typ === "electro" && enemyCard.typ === "fire")
  ) {
    typMulti = 0.8;
  } else if (playerCard.typ === enemyCard.typ) {
    typMulti = 1;
  } else {
    typMulti = 1.2;
  }

  //* Kampfhandlung
  while (playerCardCopy.hp > 0 && enemyCardCopy.hp > 0) {
    let hit = Number(((playerCardCopy.dmg * playerCardCopy.strong * typMulti) / enemyCardCopy.resi).toFixed(3));
    console.log(`you hit with ${hit} DMG`);
    enemyCardCopy.hp -= hit;
    if (enemyCardCopy.hp <= 0) {
      break;
    }
    hit = Number(((enemyCardCopy.dmg * enemyCardCopy.strong) / typMulti / playerCardCopy.resi).toFixed(3));
    console.log(`you got a hit with ${hit} DMG`);
    playerCardCopy.hp -= hit;
  }

  //* Karten verbrennen oder in handdeck umschichten. globales Deck aktuallisieren.
  if (enemyCardCopy.hp <= 0) {
    console.log(`Sieg -> Du bekommst ${enemyCard.name} in dein Handdeck.`);
    playerHandDeck.push(enemyCard);
    let index = enemyDeck.findIndex((card) => card.name === enemyCard.name);
    enemyDeck.splice(index, 1);
    index = playerRoundDeck.findIndex((card) => card.name === playerCard.name);
    playerRoundDeck.splice(index, 1, playerCardCopy);
  } else {
    console.log(`Verloren... ein schwerer Verlust. ${playerCard.name} wird verbrannt.`);
    let index = playerRoundDeck.findIndex((card) => card.name === playerCard.name);
    playerRoundDeck.splice(index, 1);
    index = enemyDeck.findIndex((card) => card.name === enemyCard.name);
    enemyDeck.splice(index, 1, enemyCardCopy);
  }
  playerCard = {};
  enemyCard = {};
  // console.log(playerCardCopy);
  // console.log(enemyCardCopy);
  // console.log(playerHandDeck);
  // console.log(playerRoundDeck);
  // console.log(enemyDeck);
}
