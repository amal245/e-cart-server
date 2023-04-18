
// loads .env files contents into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// import connection.js file to connect mongodb
require('./db/connection')
// import router
const router = require('./routes/router')

// crete server app using express
const server = express()


// use cors and express.json() to your server app
// application specffic middleware
server.use(cors())
server.use(express.json())
// use router in server
server.use(router)
// create port to listen your serer app
const PORT = process.env.PORT  || 3000

// api test
server.get('/',(req,res)=>{
    res.status(200).json("E Cart Server Started")
})

//  Run server app in there specific port
server.listen(PORT,()=>{
    console.log(`E cart server started at port: ${PORT}`);
})