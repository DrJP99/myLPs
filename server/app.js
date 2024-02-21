const express = require("express");
const app = express();
const config = require("./utils/config");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const recordsRouter = require("./src/controllers/records");
const artistsRouter = require("./src/controllers/artists");

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

app.use(express.json());

app.use("/api/records", recordsRouter);
app.use("/api/artists", artistsRouter);

app.get("/api", (req, res) => {
	res.json({ message: "Hello world!!" });
});

app.get("/api/secret", (req, res) => {
	res.json({ message: "This is a super secret message" });
});

module.exports = app;
