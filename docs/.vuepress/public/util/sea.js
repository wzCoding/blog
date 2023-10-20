import { Wave } from "./components/wave";
import { Sun } from "./components/sun";
import { Cloud } from "./components/cloud"
import { Timer } from "./timer";
const timer = new Timer();
let ctx = null
class Sea {
    constructor(canvas) {
        this.canvas = canvas;
        ctx = canvas.context;
        
        this.sun = null;
        this.waves = [];
        this.clouds = [];
    }
    addWave() {
        const args = Array.from(arguments)
        for (let i = 0; i < args.length; i++) {
            const wave = new Wave(args[i]);
            this.waves.push(wave)
        }
    }
    addCloud() {
        const args = Array.from(arguments)
        for (let i = 0; i < args.length; i++) {
            const cloud = new Cloud(args[i]);
            this.clouds.push(cloud)
        }
    }
    addSun() {
        const args = Array.from(arguments);
        this.sun = new Sun(args[0]);
       
    }
    addWhale() {

    }
    start() {
        timer.interval(() => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.sun.createSun();
            this.waves.forEach(wave => {
                wave.createWave();
            });
            this.clouds.forEach(cloud => {
                cloud.createCloud();
            });
            
        }, 30)
    }
}

export {
    Sea
}