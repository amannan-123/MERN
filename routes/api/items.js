import express from "express";
import requireAuth from "../../middlewares/requireAuth.js";
import Item from "../../models/item.js";

const router = express.Router();

router.use(requireAuth);

// Get all items
router.get("/", async (req, res) => {
	try {
		const { search } = req.query;
		const nameRegex = new RegExp(search, "i");

		const filter = {
			name: nameRegex,
			...(req.user.role === "user" && { userId: req.user.id }),
		};

		const items = await Item.find(filter).sort({ createdAt: -1 });
		res.json(items);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get one item
router.get("/:id", async (req, res) => {
	try {
		const item = await Item.findOne({
			_id: req.params.id,
			...(req.user.role === "user" && { userId: req.user.id }),
		});

		if (!item) {
			return res.status(404).json({
				message: `Item with id '${req.params.id}' doesn't exist or you are not authorized to access it.`,
			});
		}

		res.json(item);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Update an item
router.patch("/:id", async (req, res) => {
	try {
		const { name, price } = req.body;

		if (!name || price < 1) {
			return res
				.status(400)
				.json({ message: "Please enter all required fields." });
		}

		const item = await Item.findOne({
			_id: req.params.id,
		});

		if (!item) {
			return res.status(404).json({
				message: `Item with id ${req.params.id} doesn't exist.`,
			});
		} else {
			if (item.userId == req.user.id || req.user.role == "admin") {
				item.name = name;
				item.price = price;
				const savedItem = await item.save();
				res.json(savedItem);
			} else {
				return res.status(401).json({
					message: "You don't have permission to update this item.",
				});
			}
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Add a new item
router.post("/", async (req, res) => {
	try {
		const { name, price } = req.body;
		const userId = req.user.id;

		if (!name || price < 1) {
			return res
				.status(400)
				.json({ message: "Please enter all required fields." });
		}

		const newItem = new Item({ name, price, userId });
		const savedItem = await newItem.save();

		res.json(savedItem);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Delete an item
router.delete("/:id", async (req, res) => {
	try {
		const item = await Item.findOne({
			_id: req.params.id,
		});

		if (!item) {
			return res.status(404).json({
				message: `Item with id ${req.params.id} doesn't exist.`,
			});
		} else {
			if (item.userId !== req.user.id && req.user.role !== "admin") {
				return res.status(401).json({
					message: "You don't have permission to delete this item.",
				});
			} else {
				await item.deleteOne();
			}
		}

		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;
