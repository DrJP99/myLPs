const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// A user is an administrator and can create, read, update, and delete records
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minLength: 3,
		unique: true,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

module.exports = mongoose.model('User', userSchema);
