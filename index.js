//! Import

import { generate } from "./generate.js";
import { round } from "./round.js";

//! Globale variablen

export const baseStats = {
  health: 50,
  dmg: 7,
  resi: 0.015,
  strong: 0.03,
  elem: ["water", "fire", "electro"],
};
const level = [50, 100];

let roundCount = 0;
let enemyMultiplier = 1;
let playerMultiplayer = 1;
let lost = false;

export let enemyDeck = [];
export let playerHandDeck = [];
export let playerRoundDeck = [];

function start() {
  enemyDeck = generate(enemyDeck, enemyMultiplier, level);
  playerRoundDeck = generate(playerRoundDeck, playerMultiplayer, level);
  // while (!lost) {
  round(playerRoundDeck, enemyDeck);
  //   base(playerRoundDeck, playerHandDeck);
  // }
  // console.log(`you are lost...`);

  //console.log(`playerRoundDeck: ${playerRoundDeck}`);
}

start();
