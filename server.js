const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

const app = express();

app.use(cors());

app.use(express.json());

//use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));

app.get("/", (req, res) => {
	res.send("API Running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
