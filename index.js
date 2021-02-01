const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
const port = 3000
require("./init") //importing the file which will initate the database connection
//calling a route to define the methods
const products = require('./routes/index') 

//using the base url as '/' 
app.use('/',products) 

//creating server to listen on port 3000
app.listen(port,()=>{  
    console.log(`server listening on port ${port}`)
})