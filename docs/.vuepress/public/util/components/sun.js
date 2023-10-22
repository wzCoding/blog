let ctx = null;
let cvs = null;
class Sun {
    constructor({
        canvas,
        xCoord,
        yCoord,
        radius
    }) {

        cvs = canvas;
        ctx = canvas.context;

        this.xCoord = xCoord / window.devicePixelRatio;
        this.yCoord = yCoord / window.devicePixelRatio;
        this.radius = radius / window.devicePixelRatio;
        
        this.sunColor = cvs.gradient({
            startX: this.xCoord - this.radius,
            startY: this.yCoord - this.radius,
            endX: this.xCoord + this.radius,
            endY: this.yCoord + this.radius,
            gradients: [
                { color: "#fee140", value: 0 },
                { color: "#fa709a", value: 1 },
            ]
        });
        
        this.create();
    }

    create() {
        ctx.beginPath();
        ctx.arc(this.xCoord, this.yCoord, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#ff887c"
        ctx.stroke();
        ctx.fillStyle = this.sunColor;
        ctx.fill();
        ctx.closePath();
    }
}

export {
    Sun
}