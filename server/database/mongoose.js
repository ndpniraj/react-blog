const mongoose = require('mongoose');
const config = require('../config/key');

module.exports = mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('DB is connected'))
	.catch(() => console.error(err));
