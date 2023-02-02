const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
	email: String,
	pass: String,
	phone: String,
	birth_month: String,
	birth_day: String,
	zip: String,
	is_verified: Boolean
}, {timestamps: true})

module.exports = mongoose.model("Users", userSchema);