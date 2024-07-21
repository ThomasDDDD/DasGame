//! import:
import rs from "readline-sync";

//*...

export function base(playerRoundDeck, playerHandDeck) {
  //* Round Karten in Handdeck schieben und in RoundDeck löschen
  for (let card of playerRoundDeck) {
    playerHandDeck.push(card);
  }
  playerRoundDeck = [];

  console.log(playerRoundDeck);
  console.log(playerHandDeck);

  //* Auswahl paaren/verbrennen/abbrechen
  const choses = ["Karten paaren?", "Karten verbrennen?", "auf nächsten Kampf vorbereiten"];

  while (playerHandDeck.length > 9) {
    let index = rs.keyInSelect(
      choses,
      `Du darfst nur 9 Karten besitzen wenn du in die nächste Runde gehst! was willst du nun tun?`
    );
    if (index === 0) {
      mateCards(playerHandDeck);
    } else if (index === 1) {
      burnCards(playerHandDeck);
      console.log(playerHandDeck);
    }
  }
  while (playerHandDeck.length > 3) {
    const yesNo = ["YES", "NO"];
    let mateCard = rs.keyInSelect(
      yesNo,
      `möchtest du noch Karten Paaren bevor du dich für die nächste Runde vorbreitest??`
    );
    if (mateCard === 0) {
      mateCards(playerHandDeck);
    } else if (mateCard === 1) {
      break;
    }
  }
  choseRoundDeck(playerRoundDeck, playerHandDeck);
  console.log(playerRoundDeck);
  return playerRoundDeck;

  //*
}

//? Einzelfunktionen:

//* karte verbrennen

function burnCards(playerHandDeck) {
  console.log(playerHandDeck);
  const cardAuswahl = [];
  for (let card of playerHandDeck) {
    cardAuswahl.push(card.name);
  }

  let sure = 1;
  let kartenWahl = {};

  while (sure === 1) {
    kartenWahl = playerHandDeck[rs.keyInSelect(cardAuswahl, `\nBitte wähle eine Karte die du verbennen möchtest: `)];
    const yesNo = ["YES", "NO", "Abbrechen"];
    sure = rs.keyInSelect(yesNo, `bist du dir sicher das du ${kartenWahl.name} unwiederruflich verbrennen möchtest?`);
    if (sure === 1) {
      console.log(`dann wähle eine andere Karte: `);
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

//* karten paaren

function mateCards(playerHandDeck) {
  console.log(`hier könnte ihre werbung stehen`);
}

//* Rundenkarten für nächste Runde wählen

function choseRoundDeck(playerRoundDeck, playerHandDeck) {
  let cardAuswahl = [];
  const yesNo = ["YES", "NO"];
  let sure = 1;

  while (sure === 1) {
    // console.log(`vor umschichtung:`);
    // console.log(playerRoundDeck);
    if (playerRoundDeck.length > 0) {
      for (let card of playerRoundDeck) {
        playerHandDeck.push(card);
      }
      playerRoundDeck = [];
    }
    // console.log(`nach umschichtung:`);
    // console.log(playerRoundDeck);
    // console.log(playerRoundDeck.length);
    // console.log(playerHandDeck);
    while (playerRoundDeck.length < 3) {
      console.log(playerHandDeck);

      cardAuswahl = [];
      for (let card of playerHandDeck) {
        cardAuswahl.push(card.name);
      }
      const cardForRound =
        playerHandDeck[
          rs.keyInSelect(
            cardAuswahl,
            `Wähle eine Karte die du mit in die nächste Runde nehmen möchtest! Du musst 3 Karten wählen:`
          )
        ];
      let index = playerHandDeck.findIndex((card) => card.name === cardForRound.name);
      playerRoundDeck.push(cardForRound);
      playerHandDeck.splice(index, 1);
    }
    console.log(playerRoundDeck);
    sure = rs.keyInSelect(yesNo, `Bist du mit deiner Auswahl zufrieden?`);
    console.log(sure);
  }
}
