// const  express = require('express')
//
// const app = express()
//
// //__dirname print the pwd. and __filename gives the current will we are working on with it's path i.e
// //__dirname+ file we are working with.
// console.log(__dirname)
// console.log(__filename)
//
// /*
// get is a function which has two parameters. First specify the url for which it will be called. And
// second is the action function i.e what to do when get is called. This action function will have
// 2 parameters req and res. Req will have the data coming from the browser and res is what we will send back.
//  */
// //get req from homepage
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })
// /*
/*
If someone types localhost:8080/help. then this mapping will be called and the data send will be
this json looking content. name andrew etc etc.
 */
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Andrew',
//         age: 20
//     }, {
//         name: 'Prakshal',
//         age: 24
//     }])
// })
//
//
//
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })
//
// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast: 'It is Snowying',
//         location:'Dehradun'
//     })
// })
//
//
// //This server will listen on port 8080
// app.listen(8080,()=>{
//     console.log('Server is Up on port 8080')
// })