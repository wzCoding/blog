import { Wave } from "./components/wave";
import { Timer } from "./timer";
const timer = new Timer();
let ctx = null
class Sea {
    constructor(canvas) {
        this.canvas = canvas;
        this.waves = [];
        ctx = canvas.context;
    }
    addWave() {
        const args = Array.from(arguments)
        console.log(args)
        for(let i=0;i<args.length;i++){
            const wave = new Wave(args[i]);
            this.waves.push(wave)
        }
        timer.interval(()=>{
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.waves.forEach(wave=>{
                wave.createWave();
            })
        },60)
        
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