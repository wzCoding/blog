import { Wave } from "./components/wave";

let ctx = null
class Sea {
    constructor(canvas) {
        this.canvas = canvas;
        this.waves = [];
        ctx = canvas.context;
    }
    addWave({
        canvas,
        wavePeriod,
        waveHeight,
        wavexAxisCoord,
        waveyAxisCoord,
        wavexAxisMove,
        horizontalSpeed,
        verticalSpeed,
        waveColor
    }) {
        const wave = new Wave({
            canvas,
            wavePeriod,
            waveHeight,
            wavexAxisCoord,
            waveyAxisCoord,
            wavexAxisMove,
            horizontalSpeed,
            verticalSpeed,
            waveColor
        })
        wave.start();
    }
    addCloud() {

    }
    addSun() {

    }
    addWhale() {

    }
}

export {
    Sea
}