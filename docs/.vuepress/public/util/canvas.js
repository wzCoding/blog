import { debounce } from './utils'

let container = null;
/**
 * @param {string} canvas.parent - 放置canvas的容器（父元素）的id或class
 * @param {string} canvas.canvasId - 将要创建的canvas的id
 * @param {number} canvas.width - 将要创建的canvas的宽度
 * @param {number} canvas.height - 将要创建的canvas的高度
 * @returns {Object} 包含canvas信息的对象
 */
class Canvas {
    constructor({
        container,
        id,
        width,
        height,
        styles
    }) {
        container.style.overflowX = "hidden";
        // container.style.backgroundImage = "unset"
        this.id = id;
        this.width = width;
        this.height = height;
        this.container = container;
        this.styles = styles;

        this.canvas = document.getElementById(id);
        if (!this.canvas) {
            this.canvas = this.create();
            this.append();
        }else{
            this.setStyles(this.canvas);
        }
        this.context = this.canvas.getContext("2d");
        this.resize();
    }
    setStyles(canvas) {
        canvas.width = this.width;
        canvas.height = this.height;
        if (this.styles) {
            for (let key in this.styles) {
                canvas.style[key] = this.styles[key]
            }
        }
    }
    create() {
        const canvas = document.createElement("canvas");
        canvas.id = this.id;
        this.setStyles(canvas);
        return canvas;
    }
    append() {
        if (!this.container.querySelector(`#${this.id}`)) {
            this.container.append(this.canvas);
        }
    }
    remove() {
        container.remove(this.canvas);
    }
    hide(isHide) {
        this.canvas.style.display = isHide ? "none" : "block";
    }
    resize() {
        const setSize = () => {
            this.canvas.width = this.width = document.documentElement.clientWidth;
            this.canvas.height = this.height = document.documentElement.clientHeight;
        }
        window.addEventListener('resize', debounce(setSize, 100));
    }
    gradient({ startX, startY, endX, endY, gradients }) {
        const gradient = this.context.createLinearGradient(startX, startY, endX, endY);
        gradients.forEach(item => {
            gradient.addColorStop(item.value, item.color);
        });
        return gradient;
    }
}

export {
    Canvas
}