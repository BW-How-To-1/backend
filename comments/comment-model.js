const db = require('../data/dbConfig');

module.exports = {
	find,
	findById,
	add,
	update,
	remove
};

function find() {
	return db('comments');
}

function findById(id) {
	return db('comments').where({ id }).first();
}

function add(comment) {
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
