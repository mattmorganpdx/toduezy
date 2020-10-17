const router = require('express').Router();
const fetch = require("node-fetch");

const url = 'https://api.weather.gov/points/39.7456,-97.0892';

const get_weather = async url => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        return json

    } catch (err) {
        console.log(err);
    }
};

router.get('/', (req, res) => {
    return get_weather(url).then(weather => res.status(200).json(
        {
            x: weather.geometry.coordinates[0],
            y: weather.geometry.coordinates[1]
        }
    ))
});

module.exports = router;