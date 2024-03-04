const express=require('express');
const cors = require('cors');
const connectDb = require('./Config/db');
const router = require('./Router/authRouter');
const cookieParser= require('cookie-parser');
const app=express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/router/',router);
app.use('/',(req,res)=>{
    res.send('hello world');
})
connectDb();
module.exports=app;