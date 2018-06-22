require('dotenv').config();
const axios = require('axios');
const moment = require('moment');


exports.search = async function(req, res, next) {
    try {
        let lat = req.query.latitude;
        let lon = req.query.longitude;
        let currentWeather = await axios.get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lon}`)
        .then(res => {
            const weatherObject = {
                // current //
                currentTemperature: res.data.currently.temperature,
                currentSummary: res.data.currently.summary,
                currentTime: moment(res.data.minutely.data.time).format('dddd MMM Do'),
                currentIcon: res.data.currently.icon.replace(/-/g, '_').toUpperCase(),
                currentPrecipType: res.data.currently.precipType
            }
            return weatherObject;
        });
        return res.status(200).json(currentWeather);
    } catch (error) {
        return next(error);
    }
};