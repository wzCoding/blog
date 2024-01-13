class Timer {
    constructor() {
        this.timerId = null;
        this.timerClear = false;
        this.timerStop = false;
    }
    loop(type, callback, delay) {

        //记录开始时间
        let startTime = Date.now();

        //循环执行计算时间间隔
        const _loop = () => {

            let currentTime = Date.now();

            
            if (this.timerClear) {

                //清除定时
                window.cancelAnimationFrame(this.timerId);
                this.timerId = null;

            } else {

                //此条件执行interval
                if (type == "interval") {
                    if (currentTime - startTime >= delay && !this.timerStop) {
                        callback && callback();
                        startTime = Date.now();
                    }
                    this.timerId = window.requestAnimationFrame(_loop);
                }

                //此条件执行timeout
                else if (type == "timeout") {
                    currentTime - startTime >= delay && !this.timerStop ? (callback && callback()) : (this.timerId = window.requestAnimationFrame(_loop))
                }
            }

        }

        //定时! 启动!
        this.timerId = requestAnimationFrame(_loop)
    }

    interval(callback, delay = 1000) {
        const type = "interval";
        this.timerStop = false;
        this.loop(type, callback, delay);
    }

    timeout(callback, delay = 1000) {
        const type = "timeout";
        this.timerStop = false;
        this.loop(type, callback, delay);
    }
    stop() {
        this.clear();
        this.timerStop = true;
    }
    clear() {
        this.timerClear = true;
    }
}

export {
    Timer
}