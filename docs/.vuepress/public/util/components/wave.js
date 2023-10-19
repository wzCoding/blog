import { Timer } from "../timer";

const timer = new Timer();
let ctx = null;

class Wave {
    constructor({
        canvas,
        wavePeriod,
        waveHeight,
        wavexAxisCoord,
        waveyAxisCoord,
        wavexAxisMove,
        horizontalSpeed,
        verticalSpeed,
        waveColor
        // y=Asin(2∏/B - C/B) + D
    }) {
        this.canvas = canvas;
        ctx = canvas.context;

        this.period = wavePeriod || 3; //周期，波形宽度
        this.waveHeight = waveHeight || 30; //振幅，波形高度
        this.wavexAxisMove = wavexAxisMove || 0; //相移，波形水平移动
        this.waveyAxisMove = 0; //波形垂直移动
        this.wavexAxisCoord = wavexAxisCoord || 0; //x轴波形位置
        this.waveyAxisCoord = waveyAxisCoord || 500; //y轴波形位置
        this.horizontalSpeed = horizontalSpeed || 0.05; //波形水平移动速度
        this.verticalSpeed = verticalSpeed; //波形垂直移动速度
        this.waveColor = waveColor || "#409eff";

        this.startyAxisCoord = 0;
    }
    createWave() {
        this.wavexAxisMove += this.horizontalSpeed;
        if (this.verticalSpeed) {
            this.waveyAxisMove += this.verticalSpeed;
            if (this.waveyAxisMove >= Math.PI) {
                this.waveyAxisMove = 0
            }
        }
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        ctx.moveTo(this.wavexAxisCoord, this.startyAxisCoord);
        for (let x = 0; x < this.canvas.width; x++) {
            const period = 2 * Math.PI * this.period * x / this.canvas.width;
            this.startyAxisCoord = this.waveHeight * Math.sin(period + this.wavexAxisMove) + this.waveyAxisCoord + Math.sin(this.waveyAxisMove) * 100;
            ctx.lineTo(x, this.startyAxisCoord);
        }

        ctx.strokeStyle = "#4c9af0";
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.lineTo(this.canvas.width, this.canvas.height);
        ctx.lineTo(this.wavexAxisCoord, this.canvas.height);
        ctx.lineTo(this.wavexAxisCoord, this.startyAxisCoord);

        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 0;
        ctx.fillStyle = this.waveColor;

        ctx.fill();
        ctx.closePath();
    }
    start(speed) {
        timer.interval(() => {
            this.createWave()
        }, speed)
    }
    stop() {
        timer.clear();
    }
}

export {
    Wave
}