const artistsRouter = require('express').Router();
const Artist = require('../models/artist');
const fs = require('fs');
const Image = require('../../utils/image');

artistsRouter.get('/', async (req, res, next) => {
	const artists = await Artist.find({}).populate('records', {
		title: 1,
		year: 1,
		genre: 1,
		cover: 1,
	});
	res.json(artists);
});

artistsRouter.get('/:id', async (req, res, next) => {
	const artist = await Artist.findById(req.params.id).populate('records', {
		title: 1,
		year: 1,
		genre: 1,
		cover: 1,
	});
	if (artist) {
		res.json(artist);
	} else {
		res.status(404).end();
	}
});

artistsRouter.get('/:id/records', async (req, res, next) => {
	const artist = await Artist.findById(req.params.id).populate('records', {
		title: 1,
		year: 1,
		genre: 1,
	});
	if (artist) {
		res.json(artist.records);
	} else {
		res.status(404).end();
	}
});

artistsRouter.post('/', async (req, res, next) => {
	const { name, origin, desc, spotifyId } = req.body;
	const { portrait } = req.files;

	const user = req.user;
	if (!user) {
		return res
			.status(401)
			.json({ error: 'token missing or invalid' })
			.end();
	}

	if (!portrait) {
		return res.status(400).json({ error: 'must include portrait image' });
	}

	const newArtist = new Artist({
		name: name,
		origin: origin,
		desc: desc,
		spotifyId: spotifyId,
		records: [],
		portrait: await Image.compressImg(portrait),
	});

	const savedArtist = await newArtist.save().catch((err) => {
		res.status(400).json({ error: err.message });
	});

	res.status(201).json(savedArtist);
});

artistsRouter.delete('/:id', async (req, res, next) => {
	const user = req.user;
	if (!user) {
		return res
			.status(401)
			.json({ error: 'token missing or invalid' })
			.end();
	}

	await Artist.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

module.exports = artistsRouter;
