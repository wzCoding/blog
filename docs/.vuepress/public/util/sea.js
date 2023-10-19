let ctx = null
class Sea {
    constructor(canvas) {
        this.canvas = canvas;
        this.waves = [];
        ctx = canvas.context;
        this.createWave();
    }
    createWave({
        wavePeriod = 3,  //周期，波形宽度
        waveHeight = 30, //振幅，波形高度
        startxAxisPosition = 0, //初始x轴波形位置
        startyAxisPosition = 500, //初始y轴波形位置
        wavexAxisPosition = 0, //相移，波形水平移动
        horizontalSpeed = 0.05,
        verticalSpeed = 0.03
        // y=Asin(2∏/B - C/B) + D
    }) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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