const QWeatherService = require('../services/qweather');
const { success, error } = require('../utils/response');
const { transformWeatherData } = require('../utils/transform');

class WeatherController {
  // 获取当前天气
  static async getCurrentWeather(req, res) {
    try {
      const { location } = req.query;
      
      if (!location) {
        return error(res, '缺少location参数', 400);
      }

      // 并行获取实时天气、7天预报和空气质量
      try {
        const [nowData, forecastData, airData] = await Promise.all([
          QWeatherService.getNowWeather(location),
          QWeatherService.get7dWeather(location),
          QWeatherService.getAir(location)
        ]);

        // 数据转换
        const result = transformWeatherData(nowData, forecastData, airData);
        
        success(res, result);
      } catch (apiError) {
        console.error('API调用错误:', apiError);
        if (apiError.message.includes('请求超时')) {
          return error(res, '天气服务响应超时，请稍后重试', 504);
        }
        if (apiError.message.includes('API Error')) {
          return error(res, '天气服务暂时不可用，请稍后重试', 503);
        }
        throw apiError;
      }
    } catch (err) {
      console.error('服务器错误:', err);
      error(res, '获取天气数据失败', 500);
    }
  }
}

module.exports = WeatherController;
