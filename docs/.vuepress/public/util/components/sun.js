let ctx = null;

class Sun {
    constructor({
        canvas,
        xCoord,
        yCoord,
        radius
    }) {
        this.canvas = canvas;
        ctx = canvas.context;

        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.radius = radius;
        
        this.sunColor = this.canvas.setGradient({
            startX: this.xCoord - this.radius,
            startY: this.yCoord - this.radius,
            endX: this.xCoord + this.radius,
            endY: this.yCoord + this.radius,
            gradients: [
                { color: "#fee140", value: 0 },
                { color: "#fa709a", value: 1 },
            ]
        })
        
    }

    createSun() {
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