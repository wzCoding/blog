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
            collapsible: true,
        }
        list.push(sideItem)
    })
    return list

}

export {
    getSide
}