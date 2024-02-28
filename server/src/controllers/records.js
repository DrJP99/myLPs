const recordsRouter = require('express').Router();
const Record = require('../models/record');
const Artist = require('../models/artist');
const fs = require('fs');

recordsRouter.get('/', async (req, res) => {
	const records = await Record.find({}).populate('artist', {
		name: 1,
		origin: 1,
	});
	res.json(records);
});

recordsRouter.get('/:id', async (req, res) => {
	const record = await Record.findById(req.params.id).populate('artist', {
		name: 1,
		origin: 1,
	});
	res.json(record);
});

recordsRouter.post('/', async (req, res) => {
	const { title, artist, year, cover, genre, spotifyId } = req.body;

	const user = req.user;
	if (!user) {
		return res
			.status(401)
			.json({ error: 'token missing or invalid' })
			.end();
	}

	const albumArtist = await Artist.findOne({ name: artist });
	if (!albumArtist) {
		return res.status(400).json({ error: 'Invalid artist' });
	}

	let myCover = null;
	if (cover) {
		let img = fs.readFileSync(cover.path);
		let encode_img = img.toString('base64');
		myCover = {
			data: new Buffer.from(encode_img, 'base64'),
			contentType: 'image/png',
		};
	}

	const newRecord = new Record({
		title: title,
		artist: albumArtist.id,
		year: year,
		genre: genre,
		spotifyId: spotifyId,
		cover: myCover,
	});

	albumArtist.records = albumArtist.records.concat(newRecord.id);
	await albumArtist.save();

	const savedRecord = await newRecord.save();

	res.status(201).json(
		await savedRecord.populate('artist', {
			name: 1,
			origin: 1,
		}),
	);
});

recordsRouter.delete('/:id', async (req, res, next) => {
	const user = req.user;
	if (!user) {
		return res
			.status(401)
			.json({ error: 'token missing or invalid' })
			.end();
	}

	const record = await Record.findById(req.params.id).catch((e) => {
		return res.status(404).json({ error: 'record not found' }).end();
	});

	await Record.findByIdAndDelete(req.params.id);
	res.status(204).end();
});

module.exports = recordsRouter;
