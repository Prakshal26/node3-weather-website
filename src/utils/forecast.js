const request= require('request')

const forecast = (lattitude, longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=36b2a14efc9fc1ddd6501b185fbeeabc&query='+ lattitude + ',' + longitude

    request({url:url, json:true},(error,response) => {

        if(error) {
            callback('Unable to connect to weather service',undefined)
        } else if(response.body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,'Temperature is ' + response.body.current.temperature + ' and it feels like ' + response.body.current.feelslike)
        }

    })
}

module.exports = forecast