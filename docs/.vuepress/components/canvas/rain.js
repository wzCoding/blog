import { Timer } from "../../public/util/timer";

let ctx = null;
let cvs = null;
const timer = new Timer();

/**
 * 
 * @param {object} canvas - 画布对象，用来绘制 rain
 * @param {string} text - 形成rain的文字字符串
 * @returns
 */
class Rain {
    constructor(canvas, text) {

        cvs = canvas;
        ctx = canvas.context;

        this.fontSize = 16;
        this.fontWeight = 700;
        this.fontFamily = "微软雅黑";
        
        this.text = text.length ? text.split("") : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        this.letters = Array(Math.ceil(cvs.width / this.fontSize)).fill(0);
    }
    createRain() {
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
        ctx.fillStyle = "#0f0";

        this.letters.forEach((item, index) => {
            ctx.fillText(this.text[Math.floor(Math.random() * this.text.length)], index * this.fontSize, item + this.fontSize);
            this.letters[index] = item >= cvs.height || item > 9999 * Math.random() ? 0 : item + this.fontSize;
        })
    }
    start(speed) {
        cvs.hide(false);
        timer.interval(this.createRain.bind(this), speed);
    }
    stop() {
        timer.stop();
        ctx.clearRect(0,0,cvs.width,cvs.height);
        cvs.hide(true);
    }
}

export {
    Rain
}


