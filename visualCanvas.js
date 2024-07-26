const canvas = document.querySelector("canvas");
const cont = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 578;

// console.log(cont);
cont.fillStyle = "white";
cont.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = `./src/img/background1.png`;

let enemyCards = [new Image(), new Image(), new Image()];
enemyCards[0].src = `./src/img/Card-Pack2/Examples/textured (2).png`;
enemyCards[1].src = `./src/img/Card-Pack2/Examples/textured (9).png`;
enemyCards[2].src = `./src/img/Card-Pack2/Examples/textured (7).png`;
// [
//   {
//     cardNo: 1,
//     type: "water",
//     health: 1010,
//     dmg: 200,
//     resistance: 0.17,
//     strong: 0.3,
//   },
//   {
//     cardNo: 2,
//     type: "fire",
//     health: 1010,
//     dmg: 200,
//     resistance: 0.17,
//     strong: 0.3,
//   },
//   {
//     cardNo: 1,
//     type: "electro",
//     health: 1010,
//     dmg: 200,
//     resistance: 0.17,
//     strong: 0.3,
//   },
// ];
// enemyCard1.src = `./src/img/Card-Pack2/Examples/textured (2).png`;
// enemyCard2.src = `./src/img/Card-Pack2/Examples/textured (5).png`;
// enemyCard3.src = `./src/img/Card-Pack2/Examples/textured (3).png`;

image.onload = () => {
  cont.drawImage(image, 0, 0);
  for (let i = 0; i < 3; i++) {
    cont.drawImage(enemyCards[i], canvas.width / 2 - 210 + i * 140, 0, 140, 210);
  }
};
