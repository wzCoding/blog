import { debounce } from './utils'

let bgContainer = null;
/**
 * @param {string} canvas.parent - 放置canvas的容器（父元素）的id或class
 * @param {string} canvas.canvasId - 将要创建的canvas的id
 * @param {number} canvas.width - 将要创建的canvas的宽度
 * @param {number} canvas.height - 将要创建的canvas的高度
 * @returns {Object} 包含canvas信息的对象
 */
class Canvas {
    constructor({
        parent,
        canvasId,
        width,
        height
    }) {

        bgContainer = document.getElementById(parent) || document.getElementsByClassName(parent)[0];
        bgContainer.style.overflow = "hidden";
        bgContainer.style.backgroundImage = "unset"
        bgContainer.style.backgroundColor = "#fff"

        this.width = width;
        this.height = height;
        this.parent = parent;
        this.id = canvasId;
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext("2d");
        this.resizeCanvas();
    }
    createCanvas() {
        const canvas = document.createElement("canvas");
        canvas.className = `${this.parent}-canvas`;
        canvas.id = this.id;
        canvas.width = this.width;
        canvas.height = this.height;

        this.appendCanvas(canvas);

        return canvas;
    }
    appendCanvas(canvas) {
        const idList = [];
        Array.from(bgContainer.children).forEach(element => {
            idList.push(element.id)
        });
        if (!idList.includes(canvas.id)) {
            bgContainer.append(canvas);
        }
    }
    removeCanvas(canvas) {
        const removeItem = Array.from(bgContainer.children).filter(element => element.id == canvas.id);
        bgContainer.remove(removeItem);
    }
    resizeCanvas() {
        const setSize = (event) => {
            const { innerWidth, innerHeight } = event.target;
            this.canvas.width = this.width = innerWidth;
            this.canvas.height = this.height = innerHeight;
        }
        window.addEventListener('resize', debounce(setSize, 100));
    }
}

export {
    Canvas
}