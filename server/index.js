// Create express app
const express = require('express');
const db = require('./database.js');
const bodyParser = require('body-parser');
const formidable = require('formidable');

const {
	getVideos,
	getVideo,
	postVideo,
	postLike,
	postDislike,
} = require('./actions/videos.js');
const { getComments, postComment } = require('./actions/comments.js');

const app = express();

// Server port
const HTTP_PORT = 8080;
// Start server
app.listen(HTTP_PORT, () => {
	console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT));
});
app.use(bodyParser.json({ type: '*/*' }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.get('/api/videos', getVideos(db));
app.get('/api/videos/:id', getVideo(db));
app.post('/api/videos', postVideo(db));

app.get('/api/videos/:id/comments', getComments(db));
app.post('/api/videos/:id/comments', postComment(db));
app.post('/api/videos/:id/likes', postLike(db));
app.post('/api/videos/:id/dislikes', postDislike(db));

app.post('/api/upload', (req, res, next) => {
	const form = formidable({ multiples: true });

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		res.json({ fields, files });
	});
});

// Root endpoint
app.get('/', (req, res, next) => {
	res.json({ message: 'Ok' });
});

// Insert here other API endpoints

// Default response for any other request
app.use(function (req, res) {
	res.status(404);
});
