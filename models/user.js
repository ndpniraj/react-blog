const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/key');

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

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

userSchema.statics.findCridentials = async ({ email, password }) => {
	const user = await User.findOne({ email: email });
	if (!user) throw new Error('user not found!');

	const isMatch = bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error('password does not match!');

	const token = jwt.sign(user._id.toHexString(), config.SECRET_KEY);
	user.token = token;
	await user.save();
	return user;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
