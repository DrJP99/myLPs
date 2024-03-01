const recordsRouter = require('express').Router();
const Record = require('../models/record');
const Artist = require('../models/artist');
const fs = require('fs');
const Image = require('../../utils/image');

recordsRouter.get('/', async (req, res) => {
	const records = await Record.find({}).populate('artist', {
		name: 1,
		origin: 1,
		portrait: 1,
	});
	res.json(records);
});

recordsRouter.get('/:id', async (req, res) => {
	const record = await Record.findById(req.params.id).populate('artist', {
		name: 1,
		origin: 1,
		portrait: 1,
	});
	res.json(record);
});

recordsRouter.post('/', async (req, res) => {
	const { title, artist, year, genre, spotifyId, comment } = req.body;
	const { cover } = req.files;

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

	if (!cover) {
		return res.status(400).json({ error: 'Must include cover image' });
	}

	const newRecord = new Record({
		title: title,
		artist: albumArtist.id,
		year: year,
		genre: genre,
		spotifyId: spotifyId,
		comment: comment !== '' ? comment : undefined,
		cover: cover ? await Image.compressImg(cover) : undefined,
	});

	albumArtist.records = albumArtist.records.concat(await newRecord.id);
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
