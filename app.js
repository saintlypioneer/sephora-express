const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("Hi")
})

const productRouter = require('./routes/product');
app.use('/api/v1/sephora', productRouter);

const userRouter = require('./routes/user');
app.use('/api/v1/user', userRouter);

mongoose.connect(process.env.MONGO_DB_URL, ()=>{
    console.log("connected...");
    app.listen(PORT, ()=>{
        console.log("Listening...")
    })
})