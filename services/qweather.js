const axios = require('axios');
const { qweather } = require('../config/api');

class QWeatherService {
  static async request(url) {
    try {
      const response = await axios.get(url, {
        timeout: qweather.timeout,
        validateStatus: status => status === 200
      });
      
      if (response.data.code !== '200') {
        throw new Error(`API Error: ${response.data.code}`);
      }
      
      return response.data;
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        throw new Error('请求超时');
      }
      throw err;
    }
  }

  // 获取实时天气
  static async getNowWeather(location) {
    if (!location) {
      throw new Error('location参数不能为空');
    }
    const url = `${qweather.baseUrl}/weather/now?location=${encodeURIComponent(location)}&key=${qweather.key}`;
    return this.request(url);
  }

  // 获取3天预报
  static async get3dWeather(location) {
    if (!location) {
      throw new Error('location参数不能为空');
    }
    const url = `${qweather.baseUrl}/weather/3d?location=${encodeURIComponent(location)}&key=${qweather.key}`;
    return this.request(url);
  }

  // 获取7天预报
  static async get7dWeather(location) {
    if (!location) {
      throw new Error('location参数不能为空');
    }
    const url = `${qweather.baseUrl}/weather/7d?location=${encodeURIComponent(location)}&key=${qweather.key}`;
    return this.request(url);
  }

  // 城市搜索
  static async searchCity(query) {
    if (!query) {
      throw new Error('查询参数不能为空');
    }
    const url = `${qweather.geoBaseUrl}/city/lookup?location=${encodeURIComponent(query)}&key=${qweather.key}`;
    return this.request(url);
  }

  // 获取空气质量
  static async getAir(location) {
    if (!location) {
      throw new Error('location参数不能为空');
    }
    const url = `${qweather.baseUrl}/air/now?location=${encodeURIComponent(location)}&key=${qweather.key}`;
    return this.request(url);
  }
}

module.exports = QWeatherService;
