const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2749cf0910a424caa35d01b56c272bf1&query=${latitude},${longitude}`
    request({url, json:true}, (error,{body})=> {
        if(error){
            callback("Unable to contact the weather service",undefined)
        } else if(body.error){
            callback("Unable to find the location, Please find another location",undefined)
        } else {
            const curBod = body.current // To find inside the body scope
            callback(undefined,{
                weather: curBod.weather_descriptions[0],
                bodyTemp: curBod.temperature,
                realFeel: curBod.feelslike,
                humidity: curBod.humidity,
                visibilty: curBod.visibility,
                forecastReport: `${curBod.weather_descriptions[0]}. It is currently ${curBod.temperature} degrees out. It's feel's like ${curBod.feelslike} degrees out. 
                                visibilty is ${curBod.visibility}. Humidity is ${curBod.humidity}%.`,
            })
        }
    })
}

module.exports = forecast