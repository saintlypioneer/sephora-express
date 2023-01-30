const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand_name: String,
	list_price: Number,
	sale_price: Number,
	display_name: String,
	image_alt_text: String,
	hero_img: String,
	more_colors: Number,
	product_id: String,
	rating: Number,
	reviews: Number,
	target_url: String,
	same_day_eligible: Boolean,
	is_new: Boolean,
	is_best: Boolean,
	is_organic: Boolean,
	is_natural: Boolean,
	sku_id: String
}, {timestamps: true});

module.exports = mongoose.model("Products", productSchema);