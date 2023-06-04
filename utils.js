import { createApp } from 'vue'
//获取页面侧边栏对象
const getSide = (sideObj, nameKey, indexUrl, hasChildren) => {
    const list = []
    const type = Object.prototype.toString.call(sideObj)
    let sidelist
    switch (type) {
        case '[object Object]':
            sidelist = Object.keys(sideObj)
            break;
        case '[object Array]':
            sidelist = sideObj
            break;
        default: sidelist = []
    }
    sidelist.forEach(item => {
        const sideItem = {
            text: nameKey ? item[nameKey] : item,
            link: indexUrl ? `${indexUrl}${item.toLocaleLowerCase()}.html` : `#${item[nameKey]}`,
            children: hasChildren ? getSide(sideObj[item], 'code') : [],
            collapsible: hasChildren,
        }
        list.push(sideItem)
    })
    return list

}
//通过js调用组件
const useComponent = (component, options) => {
    const _component = createApp(component, options ? options : {})
    const _container = document.createElement('div')
    _component.mount(_container)
    document.body.appendChild(_container)
}
//防抖
const debounce = (func, delay) => {
    let timer
    return function () {

        const that = this
        const args = arguments

        clearTimeout(timer)
        timer = setTimeout(() => {
            func.call(that, args)
        }, delay)
    }
}
//节流
const throttle = (func, delay) => {
    let timer
    return function () {

        const that = this
        const args = arguments

        if (timer) return
        timer = setTimeout(() => {
            func.call(that, args)
            timer = null
        }, delay)
    }
}

export {
    getSide,
    useComponent,
    debounce,
    throttle,
}