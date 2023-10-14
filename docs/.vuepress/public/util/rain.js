import { Timer } from "./timer";

const width = window.innerWidth, height = window.innerHeight;
const myCanvas = new createCanvas("vp-blog-mask", {
  backgroundColor: "#000000",
  width,
  height,
});
const ctx = myCanvas.getContext("2d");

const fontSize = 16;
const fontWeight = 700;
const fontFamily = "微软雅黑";

const letters = Array(Math.ceil(width / fontSize)).fill(0);
const text = "wzCoding".split("");

const codeRain = function () {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, width, height);
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = "#0f0";

  letters.forEach(function (item, index) {
    ctx.fillText(text[Math.floor(Math.random() * text.length)], index * fontSize, item + fontSize);
    letters[index] = item >= height || item > 8888 * Math.random() ? 0 : item + fontSize;
  })
}

const timer = new Timer();
timer.interval(codeRain, 60)