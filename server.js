import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import itemRoutes from "./routes/api/items.js";
import userRoutes from "./routes/api/users.js";

dotenv.config();

try {
	await mongoose.connect(process.env.DB);
	console.log("MongoDB Connected...");
} catch (error) {
	console.log(error);
}

const app = express();

app.use(cors());
app.use(express.json());

//use routes
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
	res.send("API Running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
