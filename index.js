const canvas = document.querySelector("canvas");
const cont = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 578;

// console.log(cont);
cont.fillStyle = "white";
cont.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = `./src/img/background1.png`;

image.onload = () => {
  cont.drawImage(image, 0, 0);
};
