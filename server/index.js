const express = require('express');
const cookieParser = require('cookie-parser');
require('./database/mongoose');
const app = express();

const { User } = require('./models/user');
const auth = require('./middleware/auth');

// Middlewares for setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.json({ hello: 'this is from ndp blog' });
});

app.get('/api/user/auth', auth, (req, res) => {
	const { _id, email, firstname, lastname, role } = req.user;
	res.status(200).json({
		isAuth: true,
		_id,
		email,
		firstname,
		lastname,
		role,
	});
});

app.post('/api/users/register', async (req, res) => {
	const user = new User(req.body);
	await user.save();
	res.status(200).json({ success: true });
});

app.post('/api/user/login', async (req, res) => {
	// find email
	const user = await User.findCridentials(req.body);

	res.cookie('x_auth', user.token).status(200).json({
		loginSuccess: true,
	});
});

app.get('/api/user/logout', auth, async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			{ _id: req.user._id },
			{ token: '' }
		);
		await user.save();
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ success: false, err });
	}
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port ${port}`));
