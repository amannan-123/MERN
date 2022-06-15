const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Item = mongoose.model('Item', itemSchema);