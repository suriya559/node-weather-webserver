const request = require('postman-request');


const foreCast = (lat,long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9fbc0e369db1098cd6422dcfda30b49d&query=${lat},${long}`;
    request({url: url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('unable to connect', undefined);
        } else if(body.error){
            callback('unable to fetch data', undefined);
        } else {
            const {temperature, feelslike } = body.current;
            callback(undefined, `It is currently ${temperature} degree out. It feels like ${feelslike} degree out`);
        }
    })
}

module.exports = foreCast;