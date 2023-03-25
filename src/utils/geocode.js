const request = require('postman-request');

const geoCode = (address, callback) => {
    const add = encodeURIComponent(address);
     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${add}.json?access_token=pk.eyJ1Ijoic3VyaXlhOTciLCJhIjoiY2xmYzBiMXo5MHgzbDN4bXV6eHN3dnhpaiJ9.zO8YHUlG-x5JrHOR9fJcAg&limit=1`;
   
     request({url, json: true}, (error, {body} = {}) => {
       if(error) {
           callback('unable to connect', undefined); 
       } else if(body.features.length === 0) {
          callback('unable to fetch data', undefined);
       } else {
           const data = {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0]
           };
           callback(undefined,data);
       }
     })
   }

module.exports = geoCode