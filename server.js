const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

const app = express();

app.use(express.json());

//use routes
app.use("/api/items", require("./routes/api/items"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
