//! Import
//import rs from "./node_modules/readline-sync";
//import fs from "./";

import { generate /*bestListGenerate*/ } from "./generate.js";
//import { round } from "./round.js";
//import { base } from "./base.js";
import { renderField } from "./visualDom.js";

//! for FileSystem - Bestenliste:

/*
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
*/

//! Globale variablen

export const baseStats = {
  health: 50,
  dmg: 7,
  resi: 0.015,
  strong: 0.03,
  elem: ["Water", "Fire", "Electro"],
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

export async function start(playerName) {
  let spielerName = playerName;
  spielerName[0].toUpperCase() + spielerName.slice(1).toLowerCase();
  console.log(spielerName, `geht schon bis hier`);
  enemyDeck = generate(enemyDeck, level);
  console.log(enemyDeck);

  playerRoundDeck = generate(playerRoundDeck, level);
  console.log(playerRoundDeck);
  renderField(enemyDeck, playerRoundDeck, playerHandDeck);

  let playerRoundDeckCopy = [];

  while (lost.length === 0) {
    if (playerRoundDeckCopy.length > 0) {
      playerRoundDeck = [...playerRoundDeckCopy];
    }
    round(playerRoundDeck, enemyDeck);
    //console.log(lost);
    if (lost.length !== 0) {
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
  const lastSet = bestListGenerate(
    spielerName,
    rounds,
    playerRoundDeckCopy,
    playerHandDeck
  );
  if (rounds >= 1) {
    fs.appendFileSync(filePath, lastSet);
  }
}

//start();
