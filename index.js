const express = require('express');
const cookieParser = require('cookie-parser');
require('./database/mongoose');
const { User } = require('./models/user');
const app = express();

// Middlewares for setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.post('/api/users/register', async (req, res) => {
	const user = new User(req.body);
	await user.save();
	res.status(200).json({ success: true });
});

app.post('/api/user/login', async (req, res) => {
	// find email
	const user = await User.findCridentials(req.body);

	res.cookie('x-auth', user.token).status(200).json({
		loginSuccess: true,
	});
});

app.listen(3000);
