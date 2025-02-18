const morgan=require("morgan");
const express = require("express");
require('dotenv').config();

const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

const app=new express(); 

app.use(morgan('dev')); 
app.use(cors()); 
app.use(bodyParser.json());
 

require('./db/connection');

// Routes
app.use("/auth", authRoutes);




app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})