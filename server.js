const express = require('express'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	morgan = require('morgan'),
	PORT = process.env.PORT || 5001,
	app = express();

const { MONGO_URI } = require('./config');

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
	.then(() => {
		app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
	})
	.catch(err => console.log(err));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	next();
});

const authRoute = require('./routes/auth');

app.use('/api/auth', authRoute);
