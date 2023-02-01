const express = require('express');
const router = express.Router();
require('dotenv').config();
const Users = require('../models/user')

router.get('/', (req, res)=>{
    res.send("user")
});

router.post('/signup', async(req, res)=>{
    const rcvData = req.body.user;
    const data = await Users.create(rcvData);
    res.send(data);
});

router.post('/login', async(req, res)=>{
    const rcvData = req.body.user;
    const data = await Users.find({
        email: rcvData.email,
	    pass: rcvData.pass,
    });
    if (data.length >= 1){
        res.send({"status": "ok", "data": data[0]})
    }
    else{
        res.status(401).send({"status": "error"});
    }
})

module.exports = router