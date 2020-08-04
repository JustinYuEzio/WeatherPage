const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
var request = require('request');
var autocomplete_url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=";
const key = "&types=(cities)&language=en&key=AIzaSyDYN-_jygXWW9c9VzjuVH7JsBo0cuq5SNY";
var geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address="
var geocode_key = "&key=AIzaSyBX2yu-OegebXiNeabsw5ohXtpOi9_GhUM";
var weather_url = "https://api.darksky.net/forecast/"
var weathe_key = "2fd36f946f8ea8cb2a096f4f99714fb3"
var custom_key = "AIzaSyBX2yu-OegebXiNeabsw5ohXtpOi9_GhUM";
var custom_url = "https://www.googleapis.com/customsearch/v1?q="//[STATE]%20State%20Seal&cx==[YOUR_SEARCH_ENGINE_ID]&imgSize=huge&imgType=news&num=1&searchType=image&key=" + custom_key;
var cx = "004574372782316189998:y3pkhtxd46f";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//https://www.googleapis.com/customsearch/v1?q=CA%20State%20Seal&cx=004574372782316189998:y3pkhtxd46f&imgSize=huge&imgType=news&num=1&searchType=image&key=AIzaSyBX2yu-OegebXiNeabsw5ohXtpOi9_GhUM
app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.set('port', (process.env.PORT || 8081));
app.use(express.static(path.join(__dirname, 'dist/weatherSearch')));



app.get('/auto_complete', (req, res) => {
    var params = req.query;
    var city = params.city;
    city = encodeURIComponent(city);
    //console.log(city);
    var url = autocomplete_url + city + key;
    request({ url: url }, (error, response) => {
        data = JSON.parse(response.body);
        //data = data.predictions[0].structured_formatting.main_text;
        //console.log(data);
        res.send(data)
        //console.log(data);
    })
})

app.get('/location', (req, res) => {
    var params = req.query;
    //params = results[0].formatted_address;
    console.log(params);
    //params = "[3025%20Royal%20ST,%20Los%20Angeles,%20CA&%20]";
    var url = geocode_url + encodeURIComponent(params.address) + geocode_key;
    request({ url: url }, (error, response) => {
        data = JSON.parse(response.body);
        console.log(data);
        res.send(data);
    }, { reportProgress: true })
})

app.get('/weather', (req, res) => {
    var params = req.query;
    //console.log(params);
    var lat = params.lat;
    var lng = params.lng;
    var url = "https://api.forecast.io/forecast/2fd36f946f8ea8cb2a096f4f99714fb3/" + encodeURIComponent(lat) + "," + encodeURIComponent(lng);
    request({ url: url }, (error, response) => {
        data = JSON.parse(response.body);
        //console.log(data);
        res.send(data);
    }, { reportProgress: true })
})

app.get('/logo', (req, res) => {
    var params = req.query;
    var state = params.state;

    var url = custom_url + encodeURIComponent(state) + "%20State%20Seal&cx=" + cx + "&imgSize=medium&num=1&searchType=image&key=" + custom_key;
    request({ url: url }, (error, response) => {
        data = JSON.parse(response.body);
        //console.log(data);
        res.send(data);
    }, { reportProgress: true })
})
app.get('/dailydata', (req, res) => {
    var params = req.query;
    var lng = params.lng;
    var lat = params.lat;
    var time = params.time;
    var url = "https://api.forecast.io/forecast/2fd36f946f8ea8cb2a096f4f99714fb3/" + encodeURIComponent(lat) + "," + encodeURIComponent(lng) + "," + encodeURIComponent(time);
    request({ url: url }, (error, response) => {
        data = JSON.parse(response.body);
        //console.log(data);
        res.send(data);
    }, { reportProgress: true })
})
app.get('/image', (req, res) => {
    var params = req.query;
    var address = params.address
    var url = "https://www.googleapis.com/customsearch/v1?q=" + encodeURIComponent(address) + "&cx=004574372782316189998:y3pkhtxd46f&imgSize=huge&imgType=news&searchType=image&key=AIzaSyBX2yu-OegebXiNeabsw5ohXtpOi9_GhUM";
    request({ url: url }, (error, response) => {
        data = JSON.parse(response.body);
        res.send(data);
    }, { reportProgress: true })
})

app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port'));
})


