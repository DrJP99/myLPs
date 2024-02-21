const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const artistSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	origin: {
		type: String,
		required: false,
	},
	desc: {
		type: String,
		required: false,
	},
	spotifyId: {
		type: String,
		required: false,
	},
	records: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Record",
		},
	],
});

artistSchema.plugin(uniqueValidator);

artistSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Artist", artistSchema);
