const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../../models/user");

const generateToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @route   GET api/users
// @desc    Get user using email and password
// @access  Public
router.get("/", (req, res) => {
	const { email, password } = req.query;

	if (!email || !password) {
		console.log(req.params);
		return res
			.status(400)
			.json({ message: "Please enter all required fields." });
	}

	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				return res
					.status(400)
					.json({ message: "Invalid credentials." });
			}

			bcrypt.compare(password, user.password).then((isMatch) => {
				if (!isMatch) {
					return res
						.status(400)
						.json({ message: "Invalid credentials." });
				}

				res.json({
					token: generateToken(user._id, user.role),
					email: user.email,
				});
			});
		})
		.catch((err) => res.status(404).json({ message: err.message }));
});

// @route   POST api/users
// @desc    Add a new user
// @access  Public
router.post("/", async (req, res) => {
	const { email, password, role, adminKey } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Please enter all required fields." });
	}

	const userExists = await User.findOne({ email: email });

	if (userExists) {
		return res
			.status(400)
			.json({ message: "User with this email already exists." });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = new User({
		email,
		password: hashedPassword,
		role,
	});

	if (role === "admin" && adminKey !== process.env.ADMIN_KEY) {
		return res.status(400).json({ message: "Invalid admin key." });
	}

	newUser
		.save()
		.then((user) => {
			res.json({
				token: generateToken(user._id, user.role),
				email: user.email,
			});
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
});

module.exports = router;
