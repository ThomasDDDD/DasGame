//! Import
import rs from "readline-sync";

import { generate } from "./generate.js";
import { round } from "./round.js";
import { base } from "./base.js";

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

const level = [50, 100];
let enemyMultiplier = 1 + roundCount.length / 20;
let playerMultiplayer = 1;

//! DEMODECK FÜR TESTZWECKE
let playerHandDeckDemo = [
  {
    level: 87,
    statPointsArr: [27, 28, 17, 15],
    name: "Deboto",
    hp: 1350,
    dmg: 196,
    resi: 1.255,
    strong: 1.449,
    typ: "electro",
  },
  // {
  //   level: 53,
  //   statPointsArr: [12, 18, 11, 12],
  //   name: "Teriso",
  //   hp: 600,
  //   dmg: 126,
  //   resi: 1.164,
  //   strong: 1.36,
  //   typ: "electro",
  // },
  // {
  //   level: 81,
  //   statPointsArr: [25, 21, 18, 17],
  //   name: "Dikemezo",
  //   hp: 1250,
  //   dmg: 147,
  //   resi: 1.27,
  //   strong: 1.51,
  //   typ: "fire",
  // },
  // {
  //   level: 87,
  //   statPointsArr: [27, 28, 17, 15],
  //   name: "Debotoro",
  //   hp: 1350,
  //   dmg: 196,
  //   resi: 1.255,
  //   strong: 1.449,
  //   typ: "electro",
  // },
  // {
  //   level: 53,
  //   statPointsArr: [12, 18, 11, 12],
  //   name: "Terisoro",
  //   hp: 600,
  //   dmg: 126,
  //   resi: 1.164,
  //   strong: 1.36,
  //   typ: "electro",
  // },
  // {
  //   level: 81,
  //   statPointsArr: [25, 21, 18, 17],
  //   name: "Dikemezoro",
  //   hp: 1250,
  //   dmg: 147,
  //   resi: 1.27,
  //   strong: 1.51,
  //   typ: "fire",
  // },
  {
    level: 87,
    statPointsArr: [27, 28, 17, 15],
    name: "Debototini",
    hp: 1350,
    dmg: 196,
    resi: 1.255,
    strong: 1.449,
    typ: "electro",
  },
  {
    level: 53,
    statPointsArr: [12, 18, 11, 12],
    name: "Terisoti",
    hp: 600,
    dmg: 126,
    resi: 1.164,
    strong: 1.36,
    typ: "electro",
  },
  {
    level: 81,
    statPointsArr: [25, 21, 18, 17],
    name: "Dikemezoti",
    hp: 1250,
    dmg: 147,
    resi: 1.27,
    strong: 1.51,
    typ: "fire",
  },
];
let playerRoundDeckDemo = [
  {
    level: 66,
    statPointsArr: [23, 18, 14, 11],
    name: "Karizabo",
    hp: 1150,
    dmg: 126,
    resi: 1.21,
    strong: 1.329,
    typ: "fire",
  },
];

//! PROGRAMM STARTET HIER

function start() {
  //spielerName = rs.question(`Wie ist dein Name junger Padawan?`);
  enemyDeck = generate(enemyDeck, enemyMultiplier, level);
  playerRoundDeck = generate(playerRoundDeck, playerMultiplayer, level);
  let playerRoundDeckCopy = [];
  console.log(playerRoundDeckCopy.length);

  while (lost.length === 0) {
    if (playerRoundDeckCopy.length > 0) {
      playerRoundDeck = playerRoundDeckCopy;
    }
    round(playerRoundDeck, enemyDeck);
    //console.log(lost);
    if (lost.length > 0) {
      break;
    }
    // console.log(`The Rest of your Round Deck:`);
    // console.log(playerRoundDeck);
    // console.log(`You fill up your Handdeck:`);
    // console.log(playerHandDeck);
    // console.log(`The Enemy Deck`);
    // console.log(enemyDeck);

    // console.log(roundCount);

    //*remove this after working! from:
    //playerRoundDeck = playerRoundDeckDemo;
    //playerHandDeck = playerHandDeckDemo;
    //* to.

    playerRoundDeckCopy = base(playerRoundDeck, playerHandDeck);
    //console.log(playerRoundDeckCopy);

    enemyDeck = generate(enemyDeck, enemyMultiplier, level);
  }
  console.log(`you are lost...but nice try...`);
  //bestenliste irgendwie bauen
}

start();
