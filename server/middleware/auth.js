const { User } = require('../models/user');

const auth = async (req, res, next) => {
	try {
		const token = req.cookies.x_auth;
		const user = await User.findByToken(token);
		req.user = user;
		next();
	} catch (err) {
		res.status(400).json({ isAuth: false, err: err.message });
	}
};

module.exports = auth;
