const express = require("express");
const router = express.Router();
require("dotenv").config();
const Products = require("../models/product");

router.get("/products", async (req, res) => {
  // QUERY => filter & value
  const filter = (req.query.filter || "").toLowerCase();
  let data = {};
  if (filter == "brand") {
    const value = req.query.value;
    const offset = parseInt(req.query.offset) || 0;
    const count = parseInt(req.query.count) || 0;
    if (count == 0) {
      data = await Products.find({
        brand_name: value,
      });
    } else {
      data = await Products.find({
        brand_name: value,
      })
        .skip(offset)
        .limit(count);
    }
  }
  // else if (filter == "**"){

  // }
  else {
    data = await Products.find({}).skip(0).limit(30);
  }
  console.log(data);
  res.send(data);
});

router.post("/filtered_products", async (req, res) => {
  const rcvData = req.body.filters;
  const offset = parseInt(req.body.offset) || 0;
  const count = parseInt(req.body.count) || 0;
  let filter = [];
  rcvData.forEach((item) => {
    if (item.type == "Pickup & Delivery") {
      filter.push({
        same_day_eligible: item.value,
      });
    } else if (item.type == "Rating") {
      filter.push({
        $and: [
          { rating: { $gte: item.value[0] } },
          { rating: { $lte: item.value[1] } },
        ],
      });
    } else if (item.type == "Brand") {
      const values = item.value;
      let brandFilters = [];
      values.forEach((e) => {
        brandFilters.push({ brand_name: e });
      });
      filter.push({ $or: brandFilters });
    } else if (item.type == "Sale") {
      filter.push({
        is_sale: true,
      });
    } else if (item.type == "New") {
      filter.push({
        is_new: true,
      });
    } else if (item.type == "Price Range") {
      filter.push({
        $and: [
          { list_price: { $gte: item.value[0] } },
          { list_price: { $lte: item.value[1] } },
        ],
      });
    } else if (item.type == "Product Type") {
      filter.push({
        product_type: item.value,
      });
    } else {
      // IGNORE
      console.log("INVALID TYPE: ", item.type);
    }
  });
  const product_details = await Products.find({ $and: filter })
    .skip(offset)
    .limit(count);
  res.send(product_details);
});

router.post("/product", async (req, res) => {
  const rcvData = req.body.product_data;
  if (!rcvData.brand_name) {
    res.status(400).send({ error: "Enter a valid product" });
  }
  const product_details = await Products.create(rcvData);
  console.log(product_details);
  res.send(product_details);
});

module.exports = router;
