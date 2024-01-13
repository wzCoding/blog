import { Wave } from "./material/wave";
import { Sun } from "./material/sun";
import { Cloud } from "./material/cloud"
import { Timer } from "../public/util/timer";
const timer = new Timer();

let cvs = null;
let ctx = null;
const materials = [];

function handleMaterial(params, type) {
    const list = [];
    materials.push(type);

    if (params.length) {
        for (let i = 0; i < params.length; i++) {
            params[i].canvas = cvs;
            const instance = createMaterial(params[i], type);
            list.push(instance);
        }
    } else {
        params.canvas = cvs;
        const instance = createMaterial(params, type);
        list.push(instance);
    }

    return list;
}

function createMaterial(param, type) {
    let material = null;
    switch (type) {
        case "waves":
            material = new Wave(param);
            break;
        case "clouds":
            material = new Cloud(param);
            break;
        case "sun":
            material = new Sun(param);
            break;
        default: return material;
    }
    return material;
}
class Sea {
    constructor(canvas) {
        cvs = canvas;
        ctx = cvs.context;

        this.sun = null;
        this.waves = null;
        this.clouds = null;
    }

    addWave(waves) {
        this.waves = handleMaterial(waves, "waves");
    }

    addCloud(clouds) {
        this.clouds = handleMaterial(clouds, "clouds");
    }
    addSun(sun) {
        this.sun = handleMaterial(sun, "sun");
    }
    start(speed) {
        cvs.hide(false);
        if (materials.length) {
            timer.interval(() => {
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                materials.forEach(material => {
                    this[material].forEach(m => {
                        m.create();
                    })
                })
            }, speed);
        }
    }
    stop() {
        timer.clear();
        cvs.hide(true);
        ctx.clearRect(0,0,cvs.width,cvs.height);
    }
}

export {
    Sea
}