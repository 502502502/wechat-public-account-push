export const config = {
    // 公众号配置
    // 公众号appId
    appId: "wxd14dec16cd7742de",
    // 公众号appSecret
    appSecret: "526541adbbd6f0de2946b60ad128a1be",
    // 模板消息id
    templateId: "hyNf47UbtN_8jh7hDcQgdhO7YwzJTVHiIMgVlHDhG1U",
    // 接收公众号消息的微信号，如果有多个，需要在[]里用英文逗号间隔，例如["wx1", "wx2"]
    user: ["ojxaO6WKQFmoNqFaekZ1yQWIFmEo"],
     
    // 信息配置
    // 所在省份
    province: "广西",
    // 所在城市
    city: "钦州",
    // 生日，修改名字为对应需要显示的名字，如果生日为农历， type为 r
    birthdays: [
      {"name": "小姑娘", "year": "2000", "date": "9-25", "type": 'r'},
      {"name": "小伙", "year": "2001", "date": "5-6", "type": 'new'},
    ],
    // 在一起的日子，格式同上
    loveDate: "2021-12-16",
    // 结婚纪念日
    marryDate: "2020-01-04"
    }

// {{date.DATA}}  
// 城市：{{city.DATA}}  
// 天气：{{weather.DATA}}  
// 最低气温: {{min_temperature.DATA}}  
// 最高气温: {{max_temperature.DATA}}  
// 今天是我们恋爱的第{{love_day.DATA}}天
// 今天是我们结婚的第{{marry_day.DATA}}天
// {{birthday_message.DATA}}

// {{note_en.DATA}}  
// {{note_ch.DATA}}
