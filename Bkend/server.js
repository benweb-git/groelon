const express = require("express");
require('dotenv').config()
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utilities/db");
const app = express()
// const socket = require('socket.io')
// const http = require('http');
// const server = http.createServer(app)


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

//console.log(process.env.frontend_port)


app.use(cookieParser());  // Must be before routes
app.use(bodyParser.json());

// const io = socket(server,{
//   cors:{
//     origin:'*',
//     credentials: true
//   }
// })



app.use('/api', require('./Routes/AuthRoute'))
app.use('/api', require('./Routes/userAuthRoute'))
app.use('/api/home', require('./Routes/homeRoute'))
app.use('/api/social', require('./Routes/SocialRoute'))
app.use('/api/coin', require('./Routes/coinRoute'))
app.use('/api/cash', require('./Routes/cashRoute'))
app.use('/api/participant', require('./Routes/participantRoute'))


app.get('/',(req,res)=>{
  res.send('gives express 5000')
})

const port = process.env.PORT || 5001; 
dbConnect();
app.listen(port,()=>{
    console.log(`server running on port: ${port}`)
    // console.log(process.env.frontend_port)
})
