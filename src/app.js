const path = require('path');
const hbs = require('hbs')
const express = require('express');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/temperature');

const app = express();

//define Paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const paritalPath = path.join(__dirname, '../templates/paritals');

const port = process.env.PORT || 3000;


//setup handlerbar engine and view locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(paritalPath);

//setup static directory to serve
app.use(express.static(publicDirectory));



app.get('', (req, res) => {
   res.render('index', {
    title: 'Weather',
    name:'Suriya'
   })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        name:'Suriya'
       })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather',
        name:'Suriya'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({ error: 'address required'});
    }

     geoCode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error) {
            return res.send({error})
        }
        foreCast(latitude, longitude, (forCastError, forcastData) => {
          if(forCastError) {
            return res.send({error: forCastError})
          }
          return res.send({
            forcast: forcastData,
            address: req.query.address
          });
        })
     })

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Documeant no found',
        name: 'Suriya'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'My 404 Page',
        name: 'Suriya'
    })
})


app.listen(port, () => {
    console.log(`server is starting ${port}`);
})