const express = require("express");
const router = express.Router();
const requireAuth = require("../../middlewares/requireAuth");

const Item = require("../../models/item");

router.use(requireAuth);

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get("/", (req, res) => {
	const { search } = req.query;
	const name = new RegExp(search, "i");

	var filter = { name };
	if (req.user.role === "user") filter.userId = req.user.id;

	Item.find(filter)
		.sort({ createdAt: -1 })
		.then((items) => res.json(items))
		.catch((err) => res.status(404).json({ message: err.message }));
});

// @route   POST api/items
// @desc    Add a new item
// @access  Public
router.post("/", (req, res) => {
	const { name, price } = req.body;
	const id = req.user.id;

	if (!name || price < 1) {
		return res
			.status(400)
			.json({ message: "Please enter all required fields." });
	}

	const newItem = new Item({
		name,
		price,
		userId: id,
	});

	newItem
		.save()
		.then((item) => res.json(item))
		.catch((err) => res.status(400).json({ message: err.message }));
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
router.delete("/:id", (req, res) => {
	Item.findById(req.params.id)
		.then((item) => {
			if (req.user.role === "admin" || item.userId === req.user.id) {
				item.remove().then(() => res.json({ success: true }));
			} else {
				res.status(401).json({
					message: "You are not authorized to delete this item.",
				});
			}
		})
		.catch((err) =>
			res.status(404).json({
				message: `Item with id ${req.params.id} doesn't exist.`,
			})
		);
});

module.exports = router;
