const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './db.sqlite';

let db = new sqlite3.Database(DBSOURCE, err => {
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err;
	} else {
		db.run(createVideoQuery, err => {
			if (!err) {
				// Table just created, creating some rows
				populateVideo(db);
			}
		});
		db.run(createCommentsQuery, err => {
			if (!err) {
				// Table just created, creating some rows
				populateComments(db);
			}
		});
	}
});

const createVideoQuery = `CREATE TABLE videos (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	title text,
	description text,
	file text,
	thumbnail text,
	likes NUMERIC DEFAULT 0,
	dislikes NUMERIC DEFAULT 0
)`;
const createCommentsQuery = `CREATE TABLE comments (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	video_id INT NOT NULL,
	content text NOT NULL
)`;

function populateVideo() {
	const insert =
		'INSERT INTO videos (id, created_at, title, description, file, thumbnail, likes, dislikes) VALUES (?,?,?,?,?,?,?,?)';

	db.run(insert, [
		1,
		'2020-05-28 13:40:31',
		'Le Top 10 des frameworks JS',
		"Vous n'en croirez pas vos yeux",
		'video1.mp4',
		'L8KQIPCODV8',
		10,
		4,
	]);
	db.run(insert, [
		2,
		'2020-05-21 08:08:30',
		'5 bonnes raisons de ne pas fuir cette formation',
		'Vous allez halluciner ! Cliquez vite !',
		'video2.mp4',
		'umyvrlx0ma8',
		11,
		5,
	]);
	db.run(insert, [
		3,
		'2020-04-23 09:59:14',
		'Les plus grands secrets des développeurs React',
		'Cliquez et découvrez avant les autres ces astuces incroyables !',
		'video3.mp4',
		'L1ijLaihN2A',
		12,
		6,
	]);
	db.run(insert, [
		4,
		'2020-04-21 14:19:15',
		'Votre DSI ne veut pas que vous voyiez cette vidéo !',
		'Les experts sont formels : cette méthode de développement mystérieuse va changer votre vie.',
		'video4.mp4',
		'XIVDN9cxOVc',
		13,
		7,
	]);
	db.run(insert, [
		5,
		'2020-03-21 15:27:33',
		'Les gens vous supplieront de développer leur appli !',
		'Visionnez cette vidéo au plus vite et apprenez les 1022 méthodes de développement les plus rentables.',
		'video5.mp4',
		'E9ANYNkN4Sc',
		14,
		8,
	]);
	db.run(insert, [
		6,
		'2020-02-21 15:32:50',
		'Les 12 techniques imparables pour rater un café',
		'Vous en avez marre de tout réussir ? Ratez aux moins les cafés grâce à cette vidéo inédite !',
		'video6.mp4',
		'uwIJbtLpvV4',
		15,
		9,
	]);
	db.run(insert, [
		7,
		'2020-05-29 15:32:50',
		'Comme lui, multipliez votre productivité par 42 !',
		'Laissez cette étrange liste de conseils vous apporter des lignes de code sans effort. Absolument garanti !',
		'video1.mp4',
		'unRkg2jH1j0',
		145,
		79,
	]);
}
function populateComments(db) {
	const insertQuery =
		'INSERT INTO comments (id, video_id, created_at, content) VALUES (?,?,?,?)';

	db.run(insertQuery, [
		1,
		1,
		'2020-05-16 14:38:30',
		'Superbe ! Ce tp est fantastique.',
	]);
	db.run(insertQuery, [2, 1, '2020-05-16 14:38:34', 'LOL !']);
	db.run(insertQuery, [3, 2, '2020-05-17 19:18:03', 'React FTW !']);
	db.run(insertQuery, [
		4,
		3,
		'2020-05-17 19:19:49',
		"J'arrive pas à voir la vidéo. Je suis sur IE6.",
	]);
	db.run(insertQuery, [
		5,
		4,
		'2020-05-17 19:20:06',
		"Incroyable, j'aurais jamais pensé que ça marcherait...",
	]);
}
module.exports = db;
