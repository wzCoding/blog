function createCanvas(container, styles) {
    const bgContainer = document.getElementById(container) || document.getElementsByClassName(container)[0];
    const canvas = document.createElement("canvas");
    const { width, height } = styles;
    canvas.width = width;
    canvas.height = height;
    canvas.className = `${container}-canvas`;

    for (let key in styles) {
        canvas.style[key] = styles[key];
    }

    bgContainer.style.overflow = "hidden";
    bgContainer.append(canvas);

    return canvas;
}

export {
    createCanvas
}