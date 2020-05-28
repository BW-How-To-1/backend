const db = require('../data/dbConfig');

module.exports = {
	getComments,
	find,
	findById,
	addComment,
	update,
	remove
};

function getComments() {
	return db('comments')
		.join('projects', 'comments.projects_id', 'projects.id')
		.select('comments.comments', 'projects.title');
}

function findById(id) {
	return db('comments').where({ id }).first();
}

function addComment(comment) {
	return db('comments').insert(comment).then(([ id ]) => {
		return findById(id);
	});
}

function update(changes, id) {
	return db('comments').where({ id }).update(changes).then(() => {
		return findById();
	});
}

function remove(id) {
	return findById(id).then((deleted) => {
		return db('comments').where({ id }).delete().then(() => {
			return deleted;
		});
	});
}
