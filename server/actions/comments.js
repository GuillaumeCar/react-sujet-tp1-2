module.exports.getComments = db => (req, res, next) => {
	db.all(
		'select * from comments where video_id = ? ORDER BY created_at DESC',
		[req.params.id],
		handleDbResult(res)
	);
};

module.exports.postComment = db => (req, res, next) => {
	const { content } = req.body;

	db.run(
		'INSERT INTO comments (video_id, content) VALUES (?,?)',
		[req.params.id, req.body.content],
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

const handleDbResult = res => (err, result) => {
	if (err) {
		res.status(400).json({ error: err.message });
		return;
	}
	res.json(result);
};
