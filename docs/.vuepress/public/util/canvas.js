function createCanvas(container, styles) {
    const bgContainer = document.getElementById(container) || document.getElementsByClassName(container)[0];
    const canvas = document.createElement("canvas");
    const { width, height } = styles;
    canvas.width = width;
    canvas.height = height;

    for (let key in styles) {
        canvas.style[key] = styles[key];
    }

    bgContainer.style.overflow = "hidden";
    bgContainer.append(canvas);

    return canvas;
}
function setSize(canvas,width,height){
     
}

class MyCanvas {
    constructor(container, styles) {
        this.canvas = createCanvas(container, styles);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.onResize();
    }
    getContext(d) {
        return this.canvas.getContext(d)
    }

    onResize() {
        window.addEventListener("resize", (event) => {
            console.log(window.innerWidth,window.innerHeight)
            setSize(this.canvas,width,height)
        })
    }
}

export {
    MyCanvas
}