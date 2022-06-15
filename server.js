const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
require("dotenv").config();

mongoose
	.connect(process.env.DB)
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());

//use routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
