/**
 * 
 * @param {function} callback - 需要降低触发频率的函数
 * @param {number} delay - 超时时间设置，单位ms
 * @returns
 */
function debounce(callback, delay) {
    //记录定时器id
    let timer = null;

    return function () {
        //保存this指向与参数
        const that = this;
        const args = arguments;

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            callback && callback.apply(that, args);
        }, delay)
    }
}

/**
 * 
 * @param {function} callback - 需要降低触发频率的函数
 * @param {number} delay - 超时时间设置，单位ms
 * @returns
 */
function throttle(callback, delay) {
    //记录定时器id
    let timer = null;
    //记录开始时间
    let start = Date.now();

    return function () {
        const that = this;
        const args = arguments;

        const current = Date.now();
        const duration = delay - (current - start);

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (duration <= 0) {
            callback && callback.apply(that, args);
            start = Date.now();
        } else {
            timer = setTimeout(() => {
                callback && callback.apply(that, args);
            }, duration);
        }
    }
}

export {
    debounce,
    throttle
}