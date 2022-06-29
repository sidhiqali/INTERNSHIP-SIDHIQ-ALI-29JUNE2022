require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
bodyParser = require('body-parser');
const studentRouter = require('./route/student.route')
const classRouter = require('./route/class.route')


const MONGODB_URI=process.env.MONGODB_URI
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log(err);
})

//middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); s
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json())
app.use('/api/student',studentRouter)
app.use('/api/class',classRouter)



const PORT = process.env.PORT

app.listen(PORT, ()=>{
 console.log(`connected at port :${PORT}`);
})