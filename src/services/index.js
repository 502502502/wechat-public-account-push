import { config } from '../../config/index.js'
import { cityInfo } from '../../config/city-info.js'
import axios from 'axios'
import dayjs from 'dayjs'

/**
 * 获取 accessToken
 * @returns accessToken
 */
 export const getAccessToken = async () => {
    // appId
    const appId = config.appId
    // appSecret
    const appSecret = config.appSecret
    // accessToken
    let accessToken = null
    
    const postUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

    try {
        const res = await axios.get(postUrl).catch(err => err)
        if (res.status === 200 && res.data && res.data.access_token) {
            accessToken = res.data.access_token
        } else {
            console.error('请求失败', res.data.errmsg)
        }
    } catch(e) {
        console.error('try抛出错误', e)
    }

    return accessToken
}

/**
 * 获取天气情况
 * @param {*} province 省份
 * @param {*} city 城市
 */
 export const getWeather = async (province, city) => {
    if (!cityInfo[province] || !cityInfo[province][city] || !cityInfo[province][city]["AREAID"]) {
        console.error('配置文件中找不到相应的省份或城市')
        return null
    }
    const address = cityInfo[province][city]["AREAID"]

    const url = `http://d1.weather.com.cn/dingzhi/${address}.html?_=${new Date()}` 

    const res = await axios.get(url, {
        headers: {
            "Referer": `http://www.weather.com.cn/weather1d/${address}.shtml`,
            'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`
        }
    }).catch(err => err)

    try {
        if (res.status === 200 && res.data) {
            const temp = res.data.split(";")[0].split("=")
            const weatherStr = temp[temp.length - 1]
            const weather = JSON.parse(weatherStr)
            if (weather.weatherinfo) {
                return weather.weatherinfo
            } else {
                throw new Error ('找不到weatherinfo属性, 获取失败')
            }
        } else {
            throw new Error(res)
        }
    } catch(e) {
        if (e instanceof SyntaxError ) {
            console.error('序列化错误', e)
        } else {
            console.error(e)
        }
        return null
    }
}
 
 /**
 * 获取天气情况
 * @param {*} provinceboy 省份
 * @param {*} cityboy 城市
 */
 export const getWeatherboy = async (provinceboy, cityboy) => {
    if (!cityInfo[provinceboy] || !cityInfo[provinceboy][cityboy] || !cityInfo[provinceboy][cityboy]["AREAID"]) {
        console.error('配置文件中找不到相应的省份或城市')
        return null
    }
    const address = cityInfo[provinceboy][cityboy]["AREAID"]

    const url = `http://d1.weather.com.cn/dingzhi/${address}.html?_=${new Date()}` 

    const res = await axios.get(url, {
        headers: {
            "Referer": `http://www.weather.com.cn/weather1d/${address}.shtml`,
            'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`
        }
    }).catch(err => err)

    try {
        if (res.status === 200 && res.data) {
            const temp = res.data.split(";")[0].split("=")
            const weatherStr = temp[temp.length - 1]
            const weather = JSON.parse(weatherStr)
            if (weather.weatherinfo) {
                return weather.weatherinfo
            } else {
                throw new Error ('找不到weatherinfo属性, 获取失败')
            }
        } else {
            throw new Error(res)
        }
    } catch(e) {
        if (e instanceof SyntaxError ) {
            console.error('序列化错误', e)
        } else {
            console.error(e)
        }
        return null
    }
}

/**
 * 金山词霸每日一句
 * @returns 
 */
 export const getCIBA = async () => {
    const url = 'http://open.iciba.com/dsapi/'
    const res = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        }
    }).catch(err => err)

    if (res.status === 200 && res) {
        return res.data
    }
    console.error('发生错误', res)
    return null
}

/**
 * 获取随机颜色
 * @returns 
 */
 export const getColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
}

/**
 * 获取生日信息
 * @returns 
 */
 export const getBirthdayMessage = () => {
    // 计算生日倒数
    const birthdaygirl = config.birthdaygirl
    const birthdayboy = config.birthdayboy
    let resMessage = ''
    let birthdayMessagegirl = null
    let birthdayMessageboy = null
    // 获取girl距离下次生日的时间
    const nextBir = (dayjs(dayjs().format('YYYY') + '-' + birthdaygirl.date).diff(dayjs(), 'day') + 365)%365
        
    if (nextBir === 0) {
        birthdayMessagegirl = `今天是 ${birthdaygirl.name} 生日哦，祝${birthdaygirl.name}生日快乐！`
    } else if (nextBir > 0 ) {
        birthdayMessagegirl = `距离 ${birthdaygirl.name} 的生日还有${nextBir}天`
    }
     // 获取boy距离下次生日的时间
     const nextBirboy = (dayjs(dayjs().format('YYYY') + '-' + birthdayboy.date).diff(dayjs(), 'day') + 365)%365
     if(nextBirboy < 0){
         nextBirboy += 365
     }   
     
     if (nextBirboy === 0) {
         birthdayMessageboy = `今天是 ${birthdayboy.name} 生日哦，祝${birthdayboy.name}生日快乐！`
     } else if (nextBir > 0 ) {
         birthdayMessageboy = `距离 ${birthdayboy.name} 的生日还有${nextBirboy}天`
     }
    // 存储数据
    if (birthdayMessagegirl) {
        resMessage += `${birthdayMessagegirl} \n`
    }
    if (birthdayMessageboy) {
        resMessage += `${birthdayMessageboy} \n`
    }

    return resMessage
}

/**
 * 获取考研信息
 * @returns 
 */
 export const getKaoyanMessage = () => {
    // 计算倒数
    const kaoyanDate = config.kaoyanDate
    let resMessage = ''
    let kaoyandayMessage = null
    // 获取距离考研的时间
    const nextBir = dayjs(dayjs().format('YYYY') + '-' + kaoyanDate.date).diff(dayjs(), 'day')
        
    if (nextBir === 0) {
        kaoyandayMessage = `今天要 ${kaoyanDate.name} 考研哦，祝${kaoyanDate.name}旗开得胜！`
    } else if (nextBir > 0 ) {
        kaoyandayMessage = `距离 ${kaoyanDate.name} 考研还有${nextBir}天，加油加油！`
    }
    // 存储数据
    if (kaoyandayMessage) {
        resMessage += `${kaoyandayMessage} \n`
    }

    return resMessage
}
 /**
 * 获取四级信息
 * @returns 
 */
 export const getSijiMessage = () => {
    // 计算倒数
    const sijiDate = config.sijiDate
    let resMessage = ''
    let sijidayMessage = null
    // 获取距离四级的时间
    const nextBir = dayjs(dayjs().format('YYYY') + '-' + sijiDate.date).diff(dayjs(), 'day')
  
        
    if (nextBir === 0) {
        sijidayMessage = `今天 ${sijiDate.name} 要考四级咯，祝${sijiDate.name}旗开得胜！`
    } else if (nextBir > 0 ) {
        sijidayMessage = `距离 ${sijiDate.name} 考四级还有${nextBir}天，加油加油！`
    }
    // 存储数据
    if (sijidayMessage) {
        resMessage += `${sijidayMessage} \n`
    }

    return resMessage
}
 /**
 * 获取见面信息
 * @returns 
 */
 export const getSeeMessage = () => {
    // 计算倒数
    const seeDate = config.seeDate
    let resMessage = ''
    let seedayMessage = null
    // 获取距离见面的时间
    const nextBir = dayjs(dayjs().format('YYYY') + '-' + seeDate.date).diff(dayjs(), 'day')
        
    if (nextBir === 0) {
        seedayMessage = `今天 ${seeDate.name} 终于要见面啦！`
    } else if (nextBir > 0 ) {
        seedayMessage = `距离 ${seeDate.name} 见面还有${nextBir}天啦，很快咯很快咯`
    }
    // 存储数据
    if (seedayMessage) {
        resMessage += `${seedayMessage} \n`
    }

    return resMessage
}
 /**
 * 获取恋爱纪念日信息
 * @returns 
 */
 export const getLove1Message = () => {
    // 计算倒数
    const loveDate = config.love1Date
    let resMessage = ''
    let lovedayMessage = null
    // 获取恋爱纪念日的时间
    const nextBir = dayjs(dayjs().format('YYYY') + '-' + loveDate.date).diff(dayjs(), 'day')
  
    if (nextBir === 0) {
        lovedayMessage = `今天是 ${loveDate.name} 的恋爱周年纪念日哦，祝${loveDate.name}永远都好好的！`
    } else if (nextBir > 0 ) {
        lovedayMessage = `距离 ${loveDate.name} 的恋爱周年纪念日还有${nextBir}天`
    }
    // 存储数据
    if (lovedayMessage) {
        resMessage += `${lovedayMessage} \n`
    }

    return resMessage
}

/**
 * 发送消息模板
 * @param {*} accessToken 
 * @param {*} user 
 * @param {*} params 
 */
 export const sendMessage = async (accessToken, user, params) => {
    const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`

    const wxTemplateData = {}
    params.map(item => {
        wxTemplateData[item.name] = {
            value: item.value,
            color: item.color
        }
    })
    
    // 组装数据
    const data = {
        "touser": user,
        "template_id": config.templateId,
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": wxTemplateData
    }

    console.log('将要发送以下内容：', data)

    // 发送消息
    const res = await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        }
    }).catch(err => err)


    if (res.data && res.data.errcode === 0) {
        console.log('推送消息成功')
        return true
    }
    console.error('推送失败！', res.data)
    return false
}
