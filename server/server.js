const express = require('express');
const axios = require('axios');
require('dotenv').config();

// create app obj
const app = express();

//Dont need to serve any static files

//PORT of server
const PORT = process.env.PORT || 5000;

app.get('/api/weather/:lat/:lng', (req, res) => {
    const lat = req.params.lat;
    const lng = req.params.lng;
    console.log('route hit', lat, lng);
    axios.get(`https://api.darksky.net/forecast/${devEnv.DARKSKY_API}/${lat},${lng}?units=auto`)
    res.json({key: 'hello'});
})

// listen for requests
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});