const geoLocation = require('./utils/geolocation.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

// Path for express
const pathToPublic = path.join(__dirname,'../public')
const pathToViews = path.join(__dirname,'../template/views')
const pathToPartials = path.join(__dirname,'../template/partials')

// Setup static directory like css,js and much more
app.use(express.static(pathToPublic))

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',pathToViews)
hbs.registerPartials(pathToPartials)


// To use handlebars you need app.get to listen
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"GrantCompany"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Desk",
        helpText: "Contact us",
        name: "GrantCompany",
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: "About Us",
        name: "GrantCompany",
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geoLocation(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({
                error:error
            })  
        }
        forecast(latitude,longitude,(error,{weather,bodyTemp,realFeel}) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location: location,
                forecastReport: `${weather}. The temperature is  ${bodyTemp} celcius and it's feel's like ${realFeel} outside`,
            })
        })
       
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('Error_Help',{
        title: "404",
        errorMessage: "Help article not found",
        name: "GrantCompany",
    })   
})

app.get('*',(req,res)=>{
    res.render('Error_Page',{
        title: "404",
        errorMessage: "Page Not Found",
        name: "GrantCompany",
    })   
})

// app.com
// app.com/about

app.listen(port,() =>{
    console.log(`Serves is live on port ${port}`)
})

//RUNNING A server is a ASYNCHRONUS PROCESS