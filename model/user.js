const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('User', userSchema);
