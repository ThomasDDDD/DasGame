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
let playerMultiplier = 1;

//! PROGRAMM STARTET HIER

function start() {
  //spielerName = rs.question(`Wie ist dein Name junger Padawan?`);
  enemyDeck = generate(enemyDeck, enemyMultiplier, level);
  playerRoundDeck = generate(playerRoundDeck, playerMultiplier, level);
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
    enemyDeck = generate(enemyDeck, enemyMultiplier, level);
  }
  console.log(`you are lost...but nice try...`);
  //bestenliste irgendwie bauen
}

start();
