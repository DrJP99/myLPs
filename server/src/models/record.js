const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	cover: {
		data: Buffer,
		contentType: String,
	},
	artist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Artist',
		required: true,
	},
	comment: {
		type: String,
		required: false,
	},
	spotifyId: {
		type: String,
		required: false,
	},
});

recordSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Record', recordSchema);
