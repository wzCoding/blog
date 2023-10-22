let ctx = null;

class Wave {
    constructor({
        canvas,
        wavePeriod,
        waveHeight,
        wavexCoord,
        waveyCoord,
        wavexMove,
        horizontalSpeed,
        verticalSpeed,
        waveColor
        // y=Asin(2∏/B - C/B) + D
    }) {
        this.canvas = canvas;
        ctx = canvas.context;

        this.period = wavePeriod || 3; //周期，波形宽度
        this.waveHeight = waveHeight || 30; //振幅，波形高度
        this.wavexMove = wavexMove || 0; //相移，波形水平移动
        this.waveyMove = 0; //波形垂直移动
        this.wavexCoord = wavexCoord || 0; //x轴波形位置
        this.waveyCoord = waveyCoord || 500; //y轴波形位置
        this.horizontalSpeed = horizontalSpeed || 0.05; //波形水平移动速度
        this.verticalSpeed = verticalSpeed; //波形垂直移动速度
        this.waveColor = waveColor || "#409eff";

        this.startyCoord = 0;
    }
    create() {
        this.wavexMove += this.horizontalSpeed;
        if (this.verticalSpeed) {
            this.waveyMove += this.verticalSpeed;
            if (this.waveyMove >= Math.PI) {
                this.waveyMove = 0
            }
        }

        ctx.beginPath();
        ctx.moveTo(this.wavexCoord, this.startyCoord);
        for (let x = 0; x < this.canvas.width; x++) {
            const period = 2 * Math.PI * this.period * x / this.canvas.width;
            this.startyCoord = this.waveHeight * Math.sin(period + this.wavexMove) + this.waveyCoord + Math.sin(this.waveyMove) * 100;
            ctx.lineTo(x, this.startyCoord);
        }

        ctx.strokeStyle = "#4c9af0";
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 10;

        ctx.lineTo(this.canvas.width, this.canvas.height);
        ctx.lineTo(this.wavexCoord, this.canvas.height);
        ctx.lineTo(this.wavexCoord, this.startyCoord);


        ctx.fillStyle = this.waveColor;

        ctx.fill();
        ctx.closePath();



        ctx.globalCompositeOperation = "source-over";
    }
}

export {
    Wave
}