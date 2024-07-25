//! Import
import rs from "readline-sync";
import fs from "fs";

import { generate } from "./generate.js";
import { round } from "./round.js";
import { base } from "./base.js";

//! for FileSystem - Bestenliste:

const filePath = "./Bestenliste.txt";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(
    filePath,
    `\n=========================\n=======Bestenliste=======\n=========================\n`,
    (err) => {
      if (err) {
        console.error("Error during file creation.");
        return;
      }
    }
  );
}

//! Globale variablen

export const baseStats = {
  health: 50,
  dmg: 7,
  resi: 0.015,
  strong: 0.03,
  elem: ["water", "fire", "electro"],
};
export let roundCount = [];
export let lost = [];
export let enemyDeck = [];
export let playerHandDeck = [];
export let playerRoundDeck = [];

export let level = [50, 100];
export let enemyMultiplier = 5;
export let playerMultiplier = 1;

//! PROGRAMM STARTET HIER - Spielablauf

function start() {
  let spielerName = rs.question(`Wie ist dein Name junger Padawan?`);
  spielerName = spielerName[0].toUpperCase() + spielerName.slice(1).toLowerCase();

  enemyDeck = generate(enemyDeck, level);

  playerRoundDeck = generate(playerRoundDeck, level);

  let playerRoundDeckCopy = [];

  while (lost.length === 0) {
    if (playerRoundDeckCopy.length > 0) {
      playerRoundDeck = playerRoundDeckCopy;
    }
    round(playerRoundDeck, enemyDeck);
    //console.log(lost);
    if (lost.length > 0) {
      break;
    }
    playerRoundDeckCopy = base(playerRoundDeck, playerHandDeck);
    //console.log(playerRoundDeckCopy);
    console.log(level);
    enemyDeck = generate(enemyDeck, level);
  }
  console.log(`you are lost...but nice try...`);
  const rounds = roundCount.reduce((acc, num) => {
    return acc + num;
  }, 0);
  const lastSet = bestListGenerate(spielerName, rounds, playerRoundDeckCopy, playerHandDeck);
  fs.appendFileSync(filePath, lastSet);
  //bestenliste irgendwie bauen
}

//* generiere Text für bestenliste

function bestListGenerate(spielerName, round, playerRoundDeckCopy, playerHandDeck) {
  console.log(playerRoundDeckCopy);
  console.log(playerHandDeck);
  let playerRD = "";
  for (let card of playerRoundDeckCopy) {
    playerRD += `\n===${card.name}===\n==Level: ${card.level}==\n==HP: ${Math.round(card.hp * 100) / 100}==\n==DMG: ${
      card.dmg
    }==\n=Resi: ${card.resi}=\n=Power:${card.strong}=\n===${card.typ}===\n`;
  }
  let playerHD = "";
  for (let card of playerHandDeck) {
    playerHD += `\n===${card.name}===\n=Level: ${card.level}=\n=HP: ${Math.round(card.hp * 100) / 100}=\n=DMG: ${
      card.dmg
    }=\n=Resi: ${card.resi}=\n=Power:${card.strong}=\n===${card.typ}===\n`;
  }

  return `\n=================================\n${spielerName} ist in der ${
    round + 1
  }. Runde gestorben.\nDas letztes Kampfset: ${playerRD}\nDie übrigen Handkarten: ${playerHD}`;
}

start();
