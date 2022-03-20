function debounce(fn, delay) {
    let timer = null;
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay);
    }
}

function throttle(fn, delay) {
    let timer = null;
    return function() {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}

function deepclone(obj) {
    if (typeof obj != 'object') return obj;
    let newObj = obj instanceof Array ? [] : {};
    for (let key of Object.keys(obj)) {
        newObj[key] = typeof obj[key] == 'object' ? deepclone(obj[key]) : obj[key]
    }
    return newObj;
}

function shallowCopy(obj) {
    if (typeof obj != 'object') return obj;
    let newObj = obj instanceof Array ? [] : {};
    for (let key of Object.keys(obj)) {
        newObj[key] = obj[key]
    }
    return newObj;
}