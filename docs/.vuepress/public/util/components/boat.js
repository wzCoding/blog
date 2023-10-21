let ctx = null;
class Boat {
    constructor({ canvas, xCoord, yCoord, width, height }) {
        this.canvas = canvas;
        ctx = canvas.context;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.width = width;
        this.height = height;
    }
    createBoat() {
        ctx.beginPath();
        ctx.moveTo(this.xCoord - 30, this.yCoord);
        ctx.lineTo(this.xCoord + this.width + 30, this.yCoord - 30);
        ctx.lineTo(this.xCoord + this.width, this.yCoord + this.height);
        ctx.lineTo(this.xCoord, this.yCoord + this.height);
        ctx.lineTo(this.xCoord - 30, this.yCoord)
        ctx.closePath();
        ctx.fillStyle = "red"
        ctx.fill();

        ctx.moveTo(this.xCoord + this.width / 2, this.yCoord);
        ctx.lineTo(this.xCoord + this.width / 2, this.yCoord - 30);
        ctx.lineTo(this.xCoord + this.width / 2 - 30, this.yCoord - 30)
        ctx.lineTo(this.xCoord + this.width / 2 - 30, this.yCoord - 180);
        ctx.lineTo(this.xCoord + this.width / 2 + 45, this.yCoord - 30);
        ctx.lineTo(this.xCoord + this.width / 2 + 15, this.yCoord - 30);
        ctx.lineTo(this.xCoord + this.width / 2 + 15, this.yCoord);
        
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 10;

        ctx.fillStyle = "brown"
        ctx.fill();
    }
}

export {
    Boat
}