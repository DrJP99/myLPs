const recordsRouter = require("express").Router();
const Record = require("../models/record");
const Artist = require("../models/artist");

recordsRouter.get("/", async (req, res) => {
	const records = await Record.find({}).populate("artist", {
		name: 1,
		origin: 1,
	});
	res.json(records);
});

recordsRouter.post("/", async (req, res) => {
	const { title, artist, year, genre, spotifyId } = req.body;

	const albumArtist = await Artist.findOne({ name: artist });
	if (!albumArtist) {
		return res.status(400).json({ error: "Invalid artist" });
	}

	const newRecord = new Record({
		title: title,
		artist: albumArtist.id,
		year: year,
		genre: genre,
		spotifyId: spotifyId,
	});

	albumArtist.records = albumArtist.records.concat(newRecord.id);
	await albumArtist.save();

	const savedRecord = await newRecord.save();

	res.status(201).json(savedRecord);
});

module.exports = recordsRouter;
