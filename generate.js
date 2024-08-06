import { enemyDeck, baseStats } from "./index.js";
//import { statReset } from "./round.js";

//*to test the file:
//*generate(enemyDeck);

export function generate(deck, level) {
  //*  3 Karten mit Random level werden erzeugt
  for (let i = 0; i < 3; i++) {
    if (deck.length < 3) {
      deck.push({
        level: Math.ceil(Math.random() * (level[1] - level[0]) + level[0]),
      });
    }
  }

  //* einmal duch das Kartendeck map'en und pro Karte die CardStatpoints berechnen
  //* einen Namen generieren
  //* den Karten mit den statPoints über die baseStats ihre stats berechnen
  //console.log(deck);
  deck = deck.map((card) => {
    cardStatPoints(card);
    cardNamesGenerator(card);
    statCalculate(card);
    return card;
  });
  //*das fertige Deck zurück geben..
  return deck;
}

//* die statPoints werden anhand des random levels random verteilt

function cardStatPoints(card) {
  card.statPointsArr = [0, 0, 0, 0];
  let points = card.level;
  while (points > 0) {
    for (let i = 0; i < card.statPointsArr.length; i++) {
      const statPoints = Math.ceil(Math.random() * (points / 4)); //* 80/4=20 => 16/ => 74/4=18.5 =>7/ => 67/4 = 16,5 =10
      points -= statPoints;
      card.statPointsArr[i] += statPoints;
    }
  }
  // console.log(card);
}

//* Namensgenerator

export function cardNamesGenerator(card) {
  const consonanten = "bdfghklmnprstwz";
  const vokal = "aeiou";
  card.name = "";
  for (let i = 0; i < Math.ceil(Math.random() * 2) + 2; i++) {
    card.name += `${consonanten[Math.floor(Math.random() * consonanten.length)]}${
      vokal[Math.floor(Math.random() * vokal.length)]
    }`;
  }
  card.name = card.name[0].toUpperCase() + card.name.slice(1).toLowerCase();
}

//* Stats werden berechnet

export function statCalculate(card) {
  const { health, dmg, resi, strong, elem } = baseStats;
  card.hp = health * card.statPointsArr[0];
  card.dmg = dmg * card.statPointsArr[1];
  card.resi = Number((Math.floor(resi * card.statPointsArr[2] * 1000) / 1000 + 1).toFixed(3));
  card.strong = Number((Math.floor(strong * card.statPointsArr[3] * 1000) / 1000 + 1).toFixed(3));
  card.typ = elem[Math.floor(Math.random() * 3)];
}

//* generiere Text für bestenliste
/*
export function bestListGenerate(spielerName, round, playerRoundDeckCopy, playerHandDeck) {
  statReset(playerRoundDeckCopy, playerHandDeck);
  let playerRD = "";
  for (let card of playerRoundDeckCopy) {
    playerRD += `\n===${card.name}===\n==Level: ${card.level}==\n===HP: ${
      Math.round(card.hp * 100) / 100
    }===\n===DMG: ${card.dmg}===\n=Resi:   ${card.resi}=\n=Power:  ${card.strong}=\n====${card.typ}====\n`;
  }
  let playerHD = "";
  for (let card of playerHandDeck) {
    playerHD += `\n===${card.name}===\n==Level: ${card.level}==\n===HP: ${
      Math.round(card.hp * 100) / 100
    }===\n===DMG: ${card.dmg}===\n=Resi:  ${card.resi}=\n=Power:  ${card.strong}=\n====${card.typ}====\n`;
  }

  return `\n=================================\n${spielerName} ist in der ${
    round + 1
  }. Runde gestorben.\n\nDas letztes Kampfset:\n${playerRD}\nDie übrigen Handkarten:\n${playerHD}`;
}
*/
