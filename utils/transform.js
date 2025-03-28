// 天气数据转换（适配前端）
function transformWeatherData(nowData, forecastData, airData) {
  if (!nowData || !nowData.now || !forecastData || !forecastData.daily || !airData || !airData.now) {
    throw new Error('无效的天气数据');
  }

  const now = nowData.now;
  const daily = forecastData.daily;
  const airNow = airData.now;
  const location = nowData.location && nowData.location[0] || {};

  return {
    location: {
      name: location.name || '未知',
      adm2: location.adm2 || '',
      adm1: location.adm1 || ''
    },
    now: {
      temp: now.temp || 'N/A',
      feelsLike: now.feelsLike || 'N/A',
      humidity: now.humidity || 'N/A',
      windSpeed: now.windSpeed || 'N/A',
      windDir: now.windDir || 'N/A',
      text: now.text || '未知',
      icon: now.icon || '999',
      obsTime: now.obsTime || new Date().toISOString(),
      air: {
        aqi: airNow.aqi || 'N/A',
        category: airNow.category || '未知',
        pm10: airNow.pm10 || 'N/A',
        pm2p5: airNow.pm2p5 || 'N/A'
      }
    },
    daily: (daily || []).map(day => ({
      fxDate: day.fxDate || 'N/A',
      sunrise: day.sunrise || 'N/A',
      sunset: day.sunset || 'N/A',
      tempMax: day.tempMax || 'N/A',
      tempMin: day.tempMin || 'N/A',
      textDay: day.textDay || '未知',
      textNight: day.textNight || '未知',
      iconDay: day.iconDay || '999',
      iconNight: day.iconNight || '999',
      windSpeedDay: day.windSpeedDay || 'N/A',
      windDirDay: day.windDirDay || 'N/A'
    }))
  };
}

module.exports = {
  transformWeatherData
};
