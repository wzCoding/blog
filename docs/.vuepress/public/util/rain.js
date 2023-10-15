import { Timer } from "./timer";

let ctx = null;
const timer = new Timer();

class Rain {
    constructor(context,width,height) {
        this.fontSize = 16;
        this.fontWeight = 700;
        this.fontFamily = "微软雅黑";

        this.width = width;
        this.height = height;

        this.letters = Array(Math.ceil(this.width / this.fontSize)).fill(0);

        ctx = context;
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
        timer.interval(() => {
            this.createRain(text);
        }, speed);
    }
    stop(){
        timer.stop();
    }
}

export {
    Rain
}


