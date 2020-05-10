const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	firstname: {
		type: String,
		trim: true,
		maxlength: 50,
		required: 'First name required!',
	},
	lastname: {
		type: String,
		trim: true,
		required: 'Last name required!',
	},
	email: {
		type: String,
		trim: true,
		required: 'Email is required!',
		unique: 'This email is already in use!',
	},
	password: {
		type: String,
		trim: true,
		required: 'Password is required!',
		minlength: 5,
	},
	role: {
		type: Number,
		default: 0,
	},
	token: {
		type: String,
	},
	tokenExp: {
		type: Number,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
