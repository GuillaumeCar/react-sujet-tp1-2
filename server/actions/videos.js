module.exports.getVideos = db => (req, res, next) => {
	db.all(
		'select id, title, description, thumbnail from videos ORDER BY created_at DESC',
		[],
		handleDbResult(res)
	);
};

module.exports.getVideo = db => (req, res, next) => {
	db.get(
		'select * from videos where id = ?',
		[req.params.id],
		handleDbResult(res)
	);
};

module.exports.postVideo = db => (req, res, next) => {
	const { title, description, thumbnail } = req.body,
		randomVideoNumber = 1 + Math.floor(Math.random() * 6);

	db.run(
		'INSERT INTO videos (title, description, thumbnail, file) VALUES (?,?,?,?)',
		[title, description, thumbnail, `video${randomVideoNumber}.mp4`],
		function (err, result) {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				id: this.lastID,
			});
		}
	);
};

module.exports.postLike = db => (req, res, next) => {
	db.run(
		`UPDATE videos SET
		likes = likes +1
		WHERE id = ?`,
		[req.params.id],
		function (err, result) {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				success: true,
			});
		}
	);
};
module.exports.postDislike = db => (req, res, next) => {
	db.run(
		`UPDATE videos SET
		dislikes = dislikes +1
		WHERE id = ?`,
		[req.params.id],
		function (err, result) {
			if (err) {
				res.status(400).json({ error: err.message });
				return;
			}
			res.json({
				success: true,
			});
		}
	);
};

const handleDbResult = res => (err, result) => {
	if (err) {
		res.status(400).json({ error: err.message });
		return;
	}
	res.json(result);
};
