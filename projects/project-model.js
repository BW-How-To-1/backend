const db = require('../data/dbConfig');

module.exports = {
	getProjects,
	add,
	find,
	findById,
	update,
	remove
};

function getProjects() {
	return db('projects');
}

function add(project) {
	return db('projects').insert(project);
}

function find(id) {
	return db('projects').where({ id });
}

function findById(id) {
	return db('projects').where({ id }).first();
}

function update(id, changes) {
	return db('projects').where({ id }).update(changes);
}

function remove(id) {
	return db('projects').where({ id }).del();
}
