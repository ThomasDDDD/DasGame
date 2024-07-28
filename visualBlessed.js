import blessed from "blessed";
import { start } from "./index.js";

let screen = blessed.screen({
  smartCSR: true,
  terminal: `xterm-256color`,
  title: "The-Game",
});

let background = blessed.box({
  top: "center",
  left: "center",
  width: "100%",
  height: "100%",
  content: "",
  tags: true,

  style: {
    fg: "white",
    bg: 144,
    border: {
      fg: 208,
    },
    hover: {
      bg: "",
    },
  },
});
let gameName = blessed.bigtext({
  parent: background,
  top: "top",
  left: "center",
  width: "60%",
  height: "30%",
  content: `The Card Game`,
  align: `center`,
  style: {
    fg: 16,
    bg: 144,
    border: {
      fg: 208,
    },
    hover: {
      bg: "",
    },
  },
});
let startMenu = blessed.box({
  parent: background,
  top: "center",
  left: "center",
  width: "40%",
  height: "30%",
  padding: 0,
  content: "HALLO",
  tags: true,
  border: {
    type: "fg",
  },
  style: {
    fg: "white",
    bg: 214,
    border: {
      fg: 46,
    },
    hover: {
      bg: "",
    },
  },
});
let startButton = blessed.button({
  parent: startMenu,
  top: "58%",
  left: "2%",
  width: "30%",
  height: "30%",
  shrink: false,
  content: "Start Game",
  align: "center",
  valign: "middle",
  tags: true,
  border: {
    type: "bg",
  },
  style: {
    fg: "white",
    bg: 214,
    border: {
      fg: 46,
    },
    hover: {
      bg: 148,
    },
  },
});
let loadButton = blessed.button({
  parent: startMenu,
  top: "58%",
  left: "34%",
  width: "30%",
  height: "30%",
  shrink: false,
  content: "Load Game",
  align: "center",
  valign: "middle",
  tags: true,
  border: {
    type: "bg",
  },
  style: {
    fg: "white",
    bg: 214,
    border: {
      fg: 46,
    },
    hover: {
      bg: 148,
    },
  },
});
let endButton = blessed.button({
  parent: startMenu,
  top: "58%",
  left: "66%",
  width: "30%",
  height: "30%",
  shrink: false,
  content: "Quit Game",
  align: "center",
  valign: "middle",
  tags: true,
  border: {
    type: "bg",
  },
  style: {
    fg: "white",
    bg: 214,
    border: {
      fg: 46,
    },
    hover: {
      bg: 148,
    },
  },
});
const buttonArr = [startButton, loadButton, endButton];

startButton.on("click", function (data) {
  start();
  screen.render();
});
loadButton.on("click", function (data) {
  console.log(`comming soon...`);
  screen.render();
});
endButton.on("click", function (data) {
  process.exit(0);
});

screen.append(background);
background.append(gameName);
background.append(startMenu);
startMenu.append(startButton, loadButton, endButton);

//! ZUM STOPPEN:
screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});
screen.render();
