const QWeatherService = require('../services/qweather');
const { success, error } = require('../utils/response');

class CityController {
  // 城市搜索
  static async search(req, res) {
    try {
      const { q } = req.query;
      if (!q || q.length < 2) {
        return error(res, '搜索词至少需要2个字符', 400);
      }

      const data = await QWeatherService.searchCity(q);
      success(res, data.location || []);
    } catch (err) {
      error(res, '城市搜索失败', 500);
    }
  }
}

module.exports = CityController;
