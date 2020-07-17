const path = require('path')
const  express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

/*
Port number on which we need to run application. If we deploy the app and usee heroku then it will
have it's own port number. And if we run locally then we have provided port to be 8080.
 */
const port = process.env.PORT || 8080

console.log(__dirname)
console.log(__filename)

const publicDirectorPath = path.join(__dirname,'../public')


/*
By Default for dynamic templates hbs will look into views folder. But suppose we put all the things in
some different folder say templates. Then we need to tell express to search in templates instead of view.
This is how we will do this.
*/
const  viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath)

/*
Partials is used for Header and Footer i.e they remain same throughout the website.
So inside templates/partials we have created two hbs file one is header and one is footer.
So hbs.registerPartials will register header and footer for us.
 */
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

/*
We have npm hbs which will allow us to use handlebar template engine. Here we are saying to set that
template engine. Note: 'view engine' should be passed as it is.
 */
app.set('view engine','hbs')


app.use(express.static(publicDirectorPath))

/*
If we will go to localhost:8080 then it will be automatically redirected to the index page.
we have given app.use and passed the path of /node-course/web-server/public directory.
So as soon as someone will go to homepage index.html will be called from public folder.
Note: I have changed index.html to indexx.html intentionally as i want to call index.hbs from view folder.
 */
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

/*
Now if Someone types localhost:8080/helpp.html. Then it will look in public directory and will see the page
called help and that page will be called.
Note:  I have changed about.html to aboutt.html intentionally as i want to call about.hbs from view folder
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


// /*
//  Similarly for about page.
//  */
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })


/*Automatically it will look in view folder and there we have index file. so index file will be called
 as soon as we got request from homepage.(We have changed views folder with templates and passing viewsPath
 in app.set) The second argument is the dynamic data that we need to pass to
 the index.hbs file.
*/
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Prakshal'
    })//Automatically it will look in view folder and there we have index file. so index file will be called as soon as we got request from homepage.
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Prakshal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Prakshal'
    })
})


app.get('/products',(req,res)=>{

    if(!req.query.search) {
      return  res.send({
          error: 'You must send data'
      })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address) {
        return res.send({
            error:'You Must Provide the address'
        })
    }
                                                    //Check Playground v56
    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{

        if(error) {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{

            if(error) {
                return res.send({error})
            }

            res.send ({
                forecast: forecastData,
                location,
                address:req.query.address
            })

        })

    })
})
/*
Tip:
Difference between res.send and res.render.
res.send will directly call browser and will display the content inside the browswer.
res.render will call some html pages from templates directory and data of that html page will be printed.
 */

/*
If the request from browser does not match any of the above request then it will call an error page.
here we have given help/* so if someone gives help then help page will be displayed. But if
someone gives help/<anything> this error page will be called.
 */

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',//We need to pass name and title as they will be used by header and footer.
        name:'Andrew',
        errorMessage:'Help Article Not found'
    })
})

/*
One more error page it will be called if nothing matches above. For any wrong url it will be called:
localhost:8080/hello. localhost:8080/about/hello. etc etc...For all these this will be called.
 */
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew',
        errorMessage:'Page Not found'
    })
})


app.listen(port,()=>{
    console.log('Server is Up on port '+ port)
})