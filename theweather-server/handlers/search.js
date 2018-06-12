require('dotenv').config();
const axios = require('axios');


exports.search = async function(req, res, next) {
    try {
        let location = req.query.location;
        let lat = req.query.latitude;
        let lon = req.query.longitude;
        let currentWeather = await axios.get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lon}`)
        .then(res => {
            const weatherObject = {
                // current //
                currentTemperature: res.data.currently.temperature,
                currentSummary: res.data.currently.summary,
                currentTime: res.data.currently.time,
                currentIcon: res.data.currently.icon,
                currentPrecipType: res.data.currently.precipType,
                currentPrecipProbability: res.data.currently.precipProbability,
                // hourly //
                hourSummary: res.data.hourly.summary,
                hourIcon: res.data.hourly.icon,
                hourForecast: res.data.hourly.data.map(data => data),
                // week //
                weekSummary: res.data.daily.summary,
                weekIcon: res.data.daily.icon,
                weekForecast: res.data.daily.data.map(data => data)
            }
            return weatherObject;
        });
        return res.status(200).json(currentWeather);
    } catch (error) {
        return next(error);
    }
};