const express = require('express');
const cookieParser = require('cookie-parser');
require('./database/mongoose');
const { User } = require('./models/user');
const app = express();

// Middlewares for setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res) => {
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) return res.json({ suscess: false, err });
	});

	return res.status(200).json({
		suscess: true,
	});
});

app.listen(3000);
