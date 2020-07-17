const request = require('request')

const geocode = (address,callback)=> {

    /*
    Adding location manually. We can put address variable directly inside the link but if some give spcial character
    then our program will crash. To avoid this we encode those special character use encodeURIComponent.
     */
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1IjoicHJha3NoYWwyNiIsImEiOiJja2NubHQ4YjgwY2JvMnBycXNmNXFuOTM0In0.HpVSNw82Kl1b1LtOJxXkXA'


    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJha3NoYWwyNiIsImEiOiJja2NubHQ4YjgwY2JvMnBycXNmNXFuOTM0In0.HpVSNw82Kl1b1LtOJxXkXA'

    request({url:url,json:true},(error,response)=>{
        if (error) {
            //It will return to the place from where we are calling this function.
            /*
            That needs two things error and data. If request object returns error then we will send error
            and in data we will send undefined.
             */
            callback('Unable to Connect to location service',undefined)
        } else if (response.body.features.length ==0) {
            callback('Unable to find location. Try some other location',undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name

            })
        }
    })
}

module.exports =geocode