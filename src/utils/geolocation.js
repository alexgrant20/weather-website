const request = require("request")

const geoLocation = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiYWxleGdyYW50MjAiLCJhIjoiY2toY3FjZ3NzMDVjaDJwcXJpd2Rzbm9kcyJ9.pIoF9qGQS45isb5lcM49lA`
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Unable to contact the mapping service',undefined)
        } else if(body.message){
            callback('Field cannot be empty',undefined)
        } else if(body.features.length === 0){
            callback('Unable to find the location, Try another search',undefined)
        } else{
            const feauBody = body.features[0];
            callback(undefined,{ 
                longitude:feauBody.center[0],
                latitude: feauBody.center[1],
                location: feauBody.place_name
            })
        }
    })
}

module.exports = geoLocation

