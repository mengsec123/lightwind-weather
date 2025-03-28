const express = require('express');
const router = express.Router();
const WeatherController = require('./controllers/weather');
const CityController = require('./controllers/city');

// 天气相关路由
router.get('/weather', WeatherController.getCurrentWeather);

// 城市相关路由
router.get('/cities', CityController.search);

// 本地测试数据路由
router.get('/mock-weather', (req, res) => {
  const mockData = {
    code: 200,
    data: {
      location: {
        name: req.query.location || "北京",
        adm1: "北京市",
        adm2: "北京市"
      },
      now: {
        temp: 23,
        feelsLike: 24,
        icon: "100",
        text: "晴",
        windDir: "东北风",
        windSpeed: 15,
        humidity: 40
      },
      daily: [
        {
          fxDate: new Date().toISOString().slice(0, 10),
          tempMax: 25,
          tempMin: 15,
          iconDay: "100",
          iconNight: "150",
          textDay: "晴",
          textNight: "晴"
        },
        {
          fxDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
          tempMax: 26,
          tempMin: 16,
          iconDay: "101",
          iconNight: "151",
          textDay: "多云",
          textNight: "多云"
        },
        {
          fxDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
          tempMax: 24,
          tempMin: 14,
          iconDay: "305",
          iconNight: "306",
          textDay: "小雨",
          textNight: "中雨"
        }
      ]
    }
  };
  
  res.json(mockData);
});

// 本地测试城市搜索路由
router.get('/mock-cities', (req, res) => {
  const cities = [
    { name: "北京", id: "101010100", adm1: "北京市", adm2: "北京市" },
    { name: "上海", id: "101020100", adm1: "上海市", adm2: "上海市" },
    { name: "广州", id: "101280101", adm1: "广东省", adm2: "广州市" },
    { name: "深圳", id: "101280601", adm1: "广东省", adm2: "深圳市" },
    { name: "杭州", id: "101210101", adm1: "浙江省", adm2: "杭州市" }
  ];
  
  const query = req.query.q || "";
  const filteredCities = cities.filter(city => 
    city.name.includes(query) || city.adm1.includes(query) || city.adm2.includes(query)
  );
  
  res.json({ code: 200, data: filteredCities });
});

module.exports = router;
