require('dotenv').config();
const axios = require('axios');

exports.current = async function(req, res, next) {
    try {
        let location = req.query.location;
        let lat = req.query.latitude;
        let lon = req.query.longitude;
        let currentWeather = await axios.get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lon}`)
        .then(res => {
            const weatherObject = {
                temperature: res.data.currently.temperature,
                summary: res.data.currently.summary,
                time: res.data.currently.time,
                icon: res.data.currently.icon,
                precipType: res.data.currently.precipType,
                precipProbability: res.data.currently.precipProbability
            }
            return weatherObject;
        });
        return res.status(200).json(currentWeather);
    } catch (error) {
        return next(error);
    }
};

exports.location = async function(req, res, next) {
    try {
        
    } catch (error) {
        return next(error);
    }
}

exports.hourly = async function(req, res, next) {
    try {
        // let location = await (req.body.location);
        let currentWeather = await axios.get(`https://api.darksky.net/forecast/${apiKey}/33.5207,-86.8025`)
        .then(res => {
            const hourly = res.data.hourly.data.map(data => data);
            return hourly;
        });
        return res.status(200).json(currentWeather);
    } catch (error) {
        return next(error);
    }
};

exports.daily = async function(req, res, next) {
    try {
        let dailyForecast = await axios.get(`https://api.darksky.net/forecast/${apiKey}/33.5207,-86.8025`)
            .then(res => {
                const daily = {
                    summary: res.data.daily.summary,
                    icon: res.data.daily.icon
                };
                const data = res.data.daily.data.map(data => data);
                return weather = {
                    summary: daily.summary,
                    icon: daily.icon,
                    data: data
                }
            });
        return res.status(200).json(dailyForecast);
    } catch (error) {
        return next(error);
    }
}