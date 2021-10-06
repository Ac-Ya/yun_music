
const formatTime = (date, isHMS = true) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return isHMS ? `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}` : `${[year, month, day].map(formatNumber).join('-')}`
}


const formatDate = (date, fmt) => {
    // 1.获取年份
    // y+ 1个或者多个y  yyyy:2021
    // y* 0个或者多个y
    // y? 0个或者1个y
    if (/(y+)/.test(fmt)) {
        // RegExp.$1 指的是与正则表达式匹配的第一个子匹配
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    // 2.获取月日等
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt
}

// num接收的数字,point保留数字的第几位
const tranNumber = (num, point = 2) => {
    // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
    let numStr = num.toString().split('.')[0]
    if (numStr.length < 5) { // 判断数字有多长,如果小于5,表示1万以内的数字,让其直接显示
        return numStr;
    } else if (numStr.length >= 5 && numStr.length <= 8) { // 如果数字大于5位,小于8位,让其数字后面加单位万
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        // 由千位,百位组成的一个数字
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
    } else if (numStr.length > 8) { // 如果数字大于8位,让其数字后面加单位亿
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
    }
}


const timestampFormat = num => {
    let time = new Date(num)
    let day = time.getDate()
    let month = time.getMonth() + 1
    return `${month}月${formatNumber(day)}日`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

//格式化音乐时间
const formatMusicTime = (time) => {
    let totalSecond = Math.ceil(time / 1000)

    let minute = parseInt(totalSecond / 60)

    let second = totalSecond - minute * 60

    return `${formatNumber(minute)}:${formatNumber(second)}`

}
//获取某个范围内的随机数
const randomNum = (minNum, maxNum) => {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}


const handleMusicTime = (time) => {
    // 如果超过了100000 基本都是毫秒为单位的了 先转成秒的
    time = parseInt(time)
    if (time > 10000) {
        time = Math.floor(time / 1000);
    } else {
        time = Math.floor(time)
    }
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}
const handleNum = (num) => {
    if (num > 10000) {
        num = (num / 10000).toFixed(2)
        return num + '万';
    } else {
        return num;
    }
}


const debounce = function (fun, time) {
    let timer = null
    return function () {
        let args = arguments
        let firstRun = !timer
        //判断是否第一次点击
        if (firstRun) {
            fun.apply(this, args)
        }
        if (timer) {
            clearInterval(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, time)
    }
}
const throttle = function (fun, wait) {
    //
    let currentTime = Date.now()
    return function () {
        let args = arguments
        let nowTime = Date.now()
        //如果两次时间间隔超过了指定时间，则执行函数。
        if (nowTime - currentTime >= wait) {
            //重新设置currentTime 
            currentTime = Date.now()
            fun.apply(this, args)
        }
    }
}



module.exports = {
    tranNumber,
    timestampFormat,
    formatMusicTime,
    formatTime,
    formatDate,
    handleMusicTime,
    randomNum,
    handleNum,
    debounce,
    throttle,
    formatNumber
}