/**
 * 
 * @param {string} container - 放置canvas的容器的class或者id
 * @param {object} styles - 样式配置对象，设置canvas样式（宽、高、背景色等）
 * @returns
 */

class Canvas {
    constructor(container, styles) {
         const { width, height } = styles;
         this.width = width;
         this.height = height;
         this.canvas = this.createCanvas(container);
         return this.canvas;
    }
    createCanvas(container) {
        const bgContainer = document.getElementById(container) || document.getElementsByClassName(container)[0];
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.className = `${container}-canvas`;

        // for (let key in styles) {
        //     canvas.style[key] = styles[key];
        // }

        bgContainer.style.overflow = "hidden";
        if(!Array.from(bgContainer.children).includes(canvas)){
            bgContainer.append(canvas);
        }

        return canvas;
    }
    clearCanvas() {

    }
    resizeCanvas() {

    }
}

export {
    Canvas
}