import { enemyDeck, baseStats } from "./index.js";

//*to test the file:
//*generate(enemyDeck);

export function generate(deck, level) {
  //*  3 Karten mit Random level werden erzeugt
  for (let i = 0; i < 3; i++) {
    if (deck.length <= 3) {
      deck.push({ level: Math.ceil(Math.random() * (level[1] - level[0]) + level[0]) });
    }
  }

  //* einmal duch das Kartendeck map'en und pro Karte die Stats berechnen
  //* und einen Namen generieren
  //* den Karten mit den statPoints über die baseStats ihre stats berechnen
  //* den Karten einen namen generieren
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
      const statPoints = Math.ceil(Math.random() * (points / 4));
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
