let ctx = null
class Sea {
    constructor(canvas) {
        console.log(canvas)
        this.canvas = canvas;
        ctx = canvas.context;

        this.createWave();
    }
    createWave() {
        const waveWidth = 100; // A 波浪宽度
        const waveHeight = 5; // B 波浪高度
        const xOffset = 0; // C 水平位动
        const yOffset = 0; // D 垂直位移

        ctx.beginPath();

        for (let x = 0; x < this.canvas.width; x += 0.5) {
            const y = waveHeight * Math.sin(x * (2 * Math.PI) / waveWidth - (xOffset / waveWidth)) + yOffset;
            ctx.lineTo(x, this.canvas.height / 2 + y);
        }

        ctx.lineTo(this.canvas.width, this.canvas.height);
        ctx.lineTo(0, this.canvas.height);
        ctx.stroke();
        ctx.fill();

    }
    createCloud() {

    }
    createSun() {

    }
    createWhale() {

    }
}

export {
    Sea
}