// 和风天气API配置
module.exports = {
  qweather: {
    key: process.env.QWEATHER_KEY || 'your-qweather-api-key-here'', // 替换你自己的key
    baseUrl: 'https://devapi.qweather.com/v7',
    geoBaseUrl: 'https://geoapi.qweather.com/v2',
    timeout: 10000 // 请求超时时间（毫秒）
  },
  // 可以添加其他API配置
  port: process.env.PORT || 3000, // 服务端口
  isProduction: process.env.NODE_ENV === 'production',
  baseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? '' : 'your-doname''//域名
};
