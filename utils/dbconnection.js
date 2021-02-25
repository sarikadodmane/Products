const mongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/mydb"

mongoClient.connect(url,(err,db)=>{
 if(err){
     console.log('Failed in connecting datbase',err)
     process.exit(1)
 }
 console.log('Connected to Database')
 db.close()
})