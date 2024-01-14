class Timer {
    constructor() {

        this.timerId = null;
        this.timerClear = false;

    }
    loop(type, callback, delay) {

        //记录开始时间
        let startTime = Date.now();

        //循环执行计算时间间隔
        const loopStart = () => {

            let currentTime = Date.now();


            if (this.timerClear) {

                //清除定时
                window.cancelAnimationFrame(this.timerId);
                //this.timerId = null;

            } else {

                //此条件执行interval
                if (type == "interval") {
                    if (currentTime - startTime >= delay) {
                        callback && callback();
                        startTime = Date.now();
                    }
                    this.timerId = window.requestAnimationFrame(loopStart);
                }

                //此条件执行timeout
                else if (type == "timeout") {
                    currentTime - startTime >= delay  ? (callback && callback()) : (this.timerId = window.requestAnimationFrame(loopStart))
                }
            }

        }

        //定时! 启动!
        this.timerId = requestAnimationFrame(loopStart)
    }

    interval(callback, delay = 1000) {
        this.timerClear = false
        this.loop("interval", callback, delay);
    }

    timeout(callback, delay = 1000) {
        this.timerClear = false
        this.loop("timeout", callback, delay);
    }

    clear() {
        this.timerClear = true;
    }
}

const TimerFunc = ["interval", "timeout", "stop", "clear"];

for (const func of TimerFunc) {
    Object.defineProperty(Timer.prototype, func, {
        writable: false,
        configurable: false,
    })
}

export {
    Timer
}