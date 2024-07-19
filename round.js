import rs from "readline-sync";
//* next import nur für test:
import { playerRoundDeck } from "./index.js";
import { enemyDeck } from "./index.js";

//! Kampfrunde

export function round(playerRoundDeck, enemyDeck) {
  const playerCard = playerChoise(playerRoundDeck);
  const enemyCard = enemyChoise(enemyDeck, playerCard);
  console.log(enemyCard);
  //!...hier gehts weiter...
}

function playerChoise(playerRoundDeck) {
  const [one, two, three] = playerRoundDeck;
  console.log(playerRoundDeck);
  const auswahl = [one.name, two.name, three.name];
  const kartenWahl = playerRoundDeck[rs.keyInSelect(auswahl, `\nBitte wähle eine Karte: `)];
  console.log(`Du schickst ${kartenWahl.name} in den Kampf!`);
  console.log(kartenWahl);
  return kartenWahl;
}

function enemyChoise(enemyDeck, playerCard) {
  let kartenWahl = enemyDeck[Math.floor(Math.random() * 3)];
  for (let card of enemyDeck) {
    if (playerCard.level < card.level) {
      if (
        (playerCard.typ === "fire" && card.typ === "water") ||
        (playerCard.typ === "water" && card.typ === "electro") ||
        (playerCard.typ === "electro" && card.typ === "fire")
      ) {
        if (playerCard.statPointsArr[0] + playerCard.statPointsArr[1] < card.statPointsArr[0] + card.statPointsArr[1]) {
          kartenWahl = card;
        } else if (playerCard.resi < card.strong) {
          kartenWahl = card;
        } else if (playerCard.hp < card.strong * 5) {
          kartenWahl = card;
        }
      }
    }
  }
  console.log(`Dein Gegner schickt ${kartenWahl.name} in den Kampf!`);
  return kartenWahl;
}
