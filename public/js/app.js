console.log('Client Side JS file is loaded')

/*
This is client side JS. It will go to this URL and fetch the response from this URL.
It will get the information from the URL and store it in data.
This console.log messages will be printed in developer tools option if chrome browser.

It is just used to get data and process it and see what is exactly we are getting from it.
 */

// fetch('http://localhost:8080/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//
//         if(data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.forecast)
//             console.log(data.location)
//         }
//
//     })
// })

//Watch video 57 for clarification
/*
Inside index.hbs we have created a html tag called form.
That form has field called input so it is referring to it.
 */
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

//We have specified the id message-1 in index form so we are getting that id.
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



/*
What will happen if someone click submit.
ThisEvent will take place i.e when submit is clicked this function will be executed.
This function takes value that we have entered in input field of form and print it.
this print will be seen in developer options.
 */
weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location = search.value

    /*
    WHat are we will store in this variable it will go to the index.hbs page .
    So paragraph there will have loading stored in it.
     */
    messageOne.textContent = 'Loading....'
    messageTwo.textContent =''

    console.log(location)


    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{

        if(data.error){
            messageOne.textContent = data.error
        } else {
            //Now paragraph will have this location and forecasst stored
            //and they will display in html page.
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
         }

        })
    })

})