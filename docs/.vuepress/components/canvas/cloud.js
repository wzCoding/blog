let ctx = null;
let cvs = null;
class Cloud {
    constructor({ canvas, xCoord, yCoord, radius, speed, xCoordRatio }) {
        cvs = canvas;
        ctx = cvs.context;

        this.xCoord = xCoordRatio ? Math.round(cvs.width * xCoordRatio) : xCoord / window.devicePixelRatio;
        this.yCoord = yCoord / window.devicePixelRatio;
        this.radius = radius / window.devicePixelRatio;
        this.speed = speed;

        this.create();
    }
    create() {
        this.xCoord += this.speed;
        if (this.speed > 0) {
            if (this.xCoord - this.radius > cvs.width) {
                this.xCoord = 0;
            }
        } else {
            if (this.xCoord + this.radius * 3 < 0) {
                this.xCoord = cvs.width;
            }
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