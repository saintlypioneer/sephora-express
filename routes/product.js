const express = require('express');
const router = express.Router();
require('dotenv').config();
const Products = require('../models/product');

router.get('/products', async(req, res)=>{
    // QUERY => filter & value
    const filter = ((req.query.filter) || "").toLowerCase();
    let data = {};
    if (filter == "brand"){
        const value = (req.query.value);
        const offset = parseInt((req.query.offset)) || 0;
        const count = parseInt((req.query.count)) || 0;
        if (count==0){
            data = await Products.find({
                "brand_name": value
            })
        } else {
            data = await Products.find({
                "brand_name": value
            }).skip(offset).limit(count);
        }
    }
    // else if (filter == "**"){

    // }
    else {
        data = await Products.find({});
    }
    console.log(data);
    res.send(data);
});

router.post("/product", async(req, res)=>{
    const rcvData = req.body.product_data;
    const product_details = await Products.create(rcvData);
    console.log(product_details);
    res.send(product_details);
});

module.exports = router;