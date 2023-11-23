import { debounce } from '../public/util/utils'

let container = null;
/**
 * @param {string} canvas.parent - 放置canvas的容器（父元素）的id或class
 * @param {string} canvas.canvasId - 将要创建的canvas的id
 * @param {number} canvas.width - 将要创建的canvas的宽度
 * @param {number} canvas.height - 将要创建的canvas的高度
 * @returns {Object} 包含canvas信息的对象
 */
class myCanvas {
    constructor({
        id,
        parent,
        styles,
        width,
        height
    }) {
        container = parent;
        container.style.overflowX = "hidden";
        this.id = id;
        this.width = width ? width : parent.clientWidth;
        this.height = height ? height : parent.clientHeight;

        this.canvas = document.getElementById(id);
        if (!this.canvas) {
            this.canvas = this.create();
            this.append();
        }
        this.context = this.canvas.getContext('2d');
        this.init();
        this.resize();

        if (styles) {
            for (let key in styles) {
                this.canvas.style[key] = styles[key]
            }
        }
    }
    init() {
        const ratio = window.devicePixelRatio || 1;
        this.canvas.width = this.width * ratio;
        this.canvas.height = this.height * ratio;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.context.scale(ratio, ratio);

    }
    create() {
        const canvas = document.createElement("canvas");
        canvas.id = this.id;
        return canvas;
    }
    append() {
        if (!container.querySelector(`#${this.id}`)) {
            container.append(this.canvas);
        }
    }
    remove() {
        container.remove(this.canvas);
    }
    hide(isHide) {
        this.canvas.style.display = isHide ? "none" : "block";
    }
    resize() {
        window.addEventListener('resize', debounce(() => {
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
            this.init();
        }, 100));
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
    myCanvas
}