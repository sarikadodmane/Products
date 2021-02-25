"use strict"

const express = require('express')
const app = express()
const port = 8000
require('./utils/dbconnection')
const user = require('./routes/index')
const auth = require('./utils/jwt')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use('/signup',user)
app.use('/signin',user)
auth.validate(app)
app.use('/getuser',user)
app.use('/userupdate',user)
app.use('/deleteuser',user)


app.listen(port,()=>{
    console.log('server running on port '+8000)
})