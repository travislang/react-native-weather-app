const express = require('express');
const axios = require('axios');
require('dotenv').config();

// create app obj
const app = express();

//Dont need to serve any static files

//PORT of server
const PORT = process.env.PORT || 5000;

app.get('/api/weather-image', (req, res) => {
    const queryParam = req.query.summary;
    axios.get(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API}&query=${queryParam}-weather&orientation=portrait`)
        .then( response => {
            res.send(response.data)
        })
        .catch( err => {
            console.log('error getting image from unsplash', err);
            
        })
})

//gets current location weather based on lat/lng set from client
app.get('/api/weather/:lat/:lng', (req, res) => {
    const lat = req.params.lat;
    const lng = req.params.lng;
    console.log('route hit', lat, lng);
    axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${lat},${lng}?units=auto&exclude=minutely,hourly,daily,alerts,flags`)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            console.log('error in darksky api call', err);
        })
})

// listen for requests
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});