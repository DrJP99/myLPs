const artistsRouter = require('express').Router();
const Artist = require('../models/artist');

artistsRouter.get('/', async (req, res, next) => {
	const artists = await Artist.find({});
	res.json(artists);
});

artistsRouter.get('/:id', async (req, res, next) => {
	const artist = await Artist.findById(req.params.id).populate('records', {
		title: 1,
		year: 1,
		genre: 1,
	});
	if (artist) {
		res.json(artist);
	} else {
		res.status(404).end();
	}
});

artistsRouter.post('/', async (req, res, next) => {
	const { name, origin, desc, spotifyId } = req.body;

	const newArtist = new Artist({
		name: name,
		origin: origin,
		desc: desc,
		spotifyId: spotifyId,
		records: [],
	});

	const savedArtist = await newArtist.save().catch((err) => {
		res.status(400).json({ error: err.message });
	});

	res.status(201).json(savedArtist);
});

module.exports = artistsRouter;
