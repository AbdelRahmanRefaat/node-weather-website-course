const path = require('path')

const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const log = console.log




// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abdulrahman'
    })
})

app.get('/about' , (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Abdulrahman'
    })
})

app.get('/weather', (req,res)=>{
    const queries = req.query
    if(!queries.address){
        return res.send({
            error: 'An address must be provided!'
        })
    }

    geocode(queries.address, (error, {longitude, latitude, location} = {}) => {

    
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: queries.address
            })
          })
    
    })
  
})

app.get('/help' , (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abdulrahman'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abdulrahman',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abdulrahman',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000, () => {
    log('Server is up on port 3000.')
})

