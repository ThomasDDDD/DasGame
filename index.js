//! Import
//import rs from "./node_modules/readline-sync";
//import fs from "./";

import { generate /*bestListGenerate*/ } from "./generate.js";
import { round } from "./round.js";
import { base } from "./base.js";
import { baseBurnMateRoundVisual, renderField } from "./visualDom.js";

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
export let roundCount = [1];
export let lost = [];
export let enemyDeck = [];
export let playerHandDeck = [
  {
    level: 97,
    statPointsArr: [36, 24, 28, 9],
    name: "Mubemo",
    hp: 1800,
    dmg: 168,
    resi: 1.42,
    strong: 1.27,
    typ: "Electro",
  },
  {
    level: 67,
    statPointsArr: [11, 24, 15, 17],
    name: "Fusota",
    hp: 550,
    dmg: 168,
    resi: 1.224,
    strong: 1.51,
    typ: "Fire",
  },
  {
    level: 56,
    statPointsArr: [20, 13, 8, 15],
    name: "Wowafesu",
    hp: 1000,
    dmg: 91,
    resi: 1.12,
    strong: 1.449,
    typ: "Electro",
  },
  {
    level: 97,
    statPointsArr: [36, 24, 28, 9],
    name: "tester1",
    hp: 1800,
    dmg: 168,
    resi: 1.42,
    strong: 1.27,
    typ: "Electro",
  },
  {
    level: 67,
    statPointsArr: [11, 24, 15, 17],
    name: "tester2",
    hp: 550,
    dmg: 168,
    resi: 1.224,
    strong: 1.51,
    typ: "Fire",
  },
  {
    level: 56,
    statPointsArr: [20, 13, 8, 15],
    name: "tester3",
    hp: 1000,
    dmg: 91,
    resi: 1.12,
    strong: 1.449,
    typ: "Electro",
  },
];
export let playerRoundDeck = [
  {
    level: 120,
  },
  {
    level: 120,
  },
  {
    level: 120,
  },
];

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
    await round(playerRoundDeck, enemyDeck);
    //console.log(lost);
    if (lost.length !== 0) {
      break;
    }
    playerRoundDeckCopy = await base(playerRoundDeck, playerHandDeck);

    console.log(level);
    enemyDeck = generate(enemyDeck, level);
    renderField(enemyDeck, playerRoundDeckCopy, playerHandDeck);
  }
  console.log(`you are lost...but nice try...`);
  baseBurnMateRoundVisual(`DU HAST VERLOOOOOREN!`);
  const rounds = roundCount.reduce((acc, num) => {
    return acc + num;
  }, 0);
  //const lastSet = bestListGenerate(spielerName, rounds, playerRoundDeckCopy, playerHandDeck);
  // if (rounds >= 1) {
  //   fs.appendFileSync(filePath, lastSet);
  // }
}

//start();
