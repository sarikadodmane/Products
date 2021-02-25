const mongoose = require('mongoose')
const schema = mongoose.Schema

let user = new schema({
 name : {
     type : String,
     required:true
 },
 email:{
     type : String,
     required : true
 },
 password:{
     type : String,
     required : true
 }},{
     timestamps : true,
     collection :'users'
})

module.exports = mongoose.model('user',user)