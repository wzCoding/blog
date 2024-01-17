import { Wave } from "./material/wave";
import { Sun } from "./material/sun";
import { Cloud } from "./material/cloud"
import { Timer } from "../public/util/timer";

let timer = null;
let interval = null;
let cvs = null;
let ctx = null;

function handleMaterial(params, type) {
    const list = [];

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
class Waves {
    constructor(canvas) {
        cvs = canvas;
        ctx = cvs.context;

        this.init()
    }
    init() {
        timer = new Timer()
        this.materials = {}
    }
    addMaterial(material, type) {
        if (!material) return
        type = type || Symbol("material")
        if (!this.materials[type]) {
            this.materials[type] = handleMaterial(material, type);
        }
    }
    addWave(waves) {
        this.addMaterial(waves, "waves");
    }

    addCloud(clouds) {
        this.addMaterial(clouds, "clouds");
    }
    addSun(sun) {
        this.addMaterial(sun, "sun");
    }
    start(speed) {
        cvs.show()
        interval = timer.interval(() => {
            cvs.clear()
            Object.values(this.materials).forEach(material => {
                material.forEach(m => m.create())
            })
        }, speed);
    }
    stop() {
        timer.clear(interval)
        cvs.clear()
        cvs.hide()
    }
    destory() {
        cvs = null;
        ctx = null;
        interval = null;
        timer = null;
        this.materials = null;
    }
}

export {
    Waves
}