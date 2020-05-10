const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose
	.connect('mongodb://localhost:27017/react-blog', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB is connected'))
	.catch(() => console.error(err));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(5000);
