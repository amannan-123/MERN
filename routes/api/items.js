const express = require('express');
const router = express.Router();

const Item = require('../../models/item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then(items => res.json(items))
		.catch(err => res.status(404).json({ notfound: 'No items found' }));
});

// @route   POST api/items
// @desc    Post an item
// @access  Public
router.post('/', (req, res) => {
	const newItem = new Item({
		name: req.body.name,
		price: req.body.price
	});
	newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ notfound: 'No item found' }));
});

module.exports = router;