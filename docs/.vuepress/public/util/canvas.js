import { debounce } from './utils'

let bgContainer = null;
/**
 * 
 * @param {string} container - 放置canvas的容器的class或者id
 * @param {object} styles - 样式配置对象，设置canvas样式（宽、高、背景色等）
 * @returns
 */
class Canvas {
    constructor(container, width, height) {

        bgContainer = document.getElementById(container) || document.getElementsByClassName(container)[0];
        bgContainer.style.overflow = "hidden";
        bgContainer.style.backgroundImage = "unset"
        bgContainer.style.backgroundColor = "#fff"

        this.width = width;
        this.height = height;
        this.container = container;
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext("2d");

        this.resizeCanvas();
    }
    createCanvas() {
        const canvas = document.createElement("canvas");
        canvas.className = `${this.container}-canvas`;
        canvas.width = this.width;
        canvas.height = this.height;

        this.appendCanvas(canvas);
        
        return canvas;
    }
    appendCanvas(canvas) {
        const classList = [];
        Array.from(bgContainer.children).forEach(element => {
            classList.push(element.className)
        });
        if (!classList.includes(canvas.className)) {
            bgContainer.append(canvas);
        }
    }
    removeCanvas(canvas) {
        const removeItem = Array.from(bgContainer.children).filter(element => element.className == canvas.className);
        bgContainer.remove(removeItem);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    resizeCanvas() {
        const setSize = (event) => {
            const { innerWidth, innerHeight } = event.target;
            this.canvas.width = this.width = innerWidth;
            this.canvas.height = this.height = innerHeight;
        }
        window.addEventListener('resize', debounce(setSize, 300));
    }
}

export {
    Canvas
}