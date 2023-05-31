import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const generateToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register a new user
router.post("/register", async (req, res) => {
	try {
		const { email, password, role, adminKey } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Please enter all required fields." });
		}

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res
				.status(400)
				.json({ message: "User with this email already exists." });
		}

		if (role === "admin" && adminKey !== process.env.ADMIN_KEY) {
			return res.status(400).json({ message: "Invalid admin key." });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			password: hashedPassword,
			role,
		});

		const user = await newUser.save();

		res.json({
			token: generateToken(user._id, user.role),
			email: user.email,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Login a user
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Please enter all required fields." });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(400)
				.json({ message: "No user with given email." });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials." });
		}

		res.json({
			token: generateToken(user._id, user.role),
			email: user.email,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
