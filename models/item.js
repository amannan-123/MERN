const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

itemSchema.index({ name: "text" });

module.exports = Item = mongoose.model("Item", itemSchema);
