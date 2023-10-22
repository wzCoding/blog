let ctx = null;

class Cloud {
    constructor({ canvas, xCoord, yCoord, radius, speed }) {
        this.canvas = canvas;
        ctx = canvas.context;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.radius = radius;
        this.speed = speed;
    }
    create() {
        this.xCoord += this.speed;
        if (this.xCoord - this.radius+ this.speed > this.canvas.width || this.xCoord + this.speed < 0) {
            // this.speed = -this.speed;
            this.xCoord = 0;
        }

        ctx.beginPath()
        ctx.moveTo(this.xCoord, this.yCoord)
        ctx.arc(this.xCoord, this.yCoord, this.radius, 0, Math.PI * 2);
        ctx.arc(this.xCoord + this.radius, this.yCoord, this.radius, 0, Math.PI * 2);
        ctx.arc(this.xCoord + this.radius * 2, this.yCoord, this.radius, 0, Math.PI * 2);
        ctx.moveTo(this.xCoord, this.yCoord - this.radius);
        ctx.arc(this.xCoord, this.yCoord - this.radius, this.radius / 2, 0, Math.PI * 2);
        ctx.arc(this.xCoord + this.radius, this.yCoord - this.radius, this.radius, 0, Math.PI * 2);

        // ctx.lineWidth = 3
        // ctx.strokeStyle = "#1890ff"
        // ctx.stroke();

        ctx.shadowColor = "rgba(0,0,0,0.5)"
        ctx.shadowBlur = 10
        ctx.fillStyle = "#fff"

        ctx.fill();
    }
}

export {
    Cloud
}