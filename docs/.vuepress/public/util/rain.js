import { Timer } from "./timer";

let cvs = null;
let ctx = null;

class Rain {
    constructor(canvas) {
        this.fontSize = 16;
        this.fontWeight = 700;
        this.fontFamily = "微软雅黑";

        this.width = canvas.width;
        this.height = canvas.height;

        this.letters = Array(Math.ceil(this.width / this.fontSize)).fill(0);

        cvs = canvas;
        ctx = canvas.getContext("2d");
    }
    createRain(text) {

        const textList = text.length ? text.split("") : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");;

        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
        ctx.fillStyle = "#0f0";

        this.letters.forEach((item, index) => {
            ctx.fillText(textList[Math.floor(Math.random() * textList.length)], index * this.fontSize, item + this.fontSize);
            this.letters[index] = item >= this.height || item > 8888 * Math.random() ? 0 : item + this.fontSize;
        })
    }
    start(text, speed) {
        const timer = new Timer();
        timer.interval(() => {
            this.createRain(text);
        }, speed);
    }
}

export {
    Rain
}


