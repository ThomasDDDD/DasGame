import { start } from "./index.js";

let startButton = document.querySelector(`#startGame`);

startButton.onclick = change;
console.log(`bis hier gehts`);

function change() {
  startButton.innerText = `einen schritt`;
  start();
}
