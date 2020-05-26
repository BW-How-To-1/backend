const db = require('../data/dbConfig');

module.exports = {
	add,
	get,
	getBy,
	insert
};

function add(body) {
	return db('users').insert(body);
}

function get() {
	return db('users');
}

function getBy(filter) {
	return db('users').where(filter);
}

async function insert(user) {
	const [ id ] = await db('users').insert(user, 'id');
	return findById(id);
}

function findById(id) {
	return db('users').where({ id }).first();
}
