const supertest = require('supertest');
const router = require('express').Router();
const db = require('../data/dbConfig');

const server = require('../api/server');

let token;

describe('post /register', () => {
	it('should not register if no username and password entered', () => {
		db('users').truncate();
		return supertest(server).post('/api/auth/register').then((response) => {
			expect(response.status).toBe(400);
		});
	});
	it('should register if a username and password is entered', async () => {
		await db('users').truncate();
		await supertest(server)
			.post('/api/auth/register')
			.send({ username: 'test6', password: 'test6' })
			.then((response) => {
				expect(response.status).toBe(201);
			});
	});
});

describe('post /login', () => {
	it('should login and return code 200', () => {
		return supertest(server)
			.post('/api/auth/login')
			.send({ username: 'test6', password: 'test6' })
			.then((response) => {
				token = response.body.token;
				expect(response.status).toBe(200);
			})
			.catch((error) => {
				console.log(error);
			});
	});
	it('should return 400 if username is not correct', () => {
		return supertest(server).post('/api/auth/login').send({ username: '', password: '' }).then((response) => {
			expect(response.status).toBe(401);
		});
	});
});

describe('get /projects', () => {
	it('should return a list of projects', () => {
		return supertest(server).get('/projects').set('Authorization', token).then((response) => {
			expect(response.status).toBe(200);
		});
	});
});

describe('post /projects', () => {
	it('should add a post to the project ', () => {
		return supertest(server)
			.post('/projects')
			.set('Authorization', token)
			.send({ title: 'projectTest2', bodyText: 'descriptionTest2', author: 'authorTest1' })
			.then((response) => {
				expect(response.status).toBe(201);
			});
	});
});

describe('put /projects/:id', () => {
	it('should allow changes to the project', () => {
		return supertest(server)
			.put('/projects/3')
			.set('Authorization', token)
			.send({ title: 'projectTest' })
			.then((response) => {
				expect(response.status).toBe(200);
			});
	});
});

// describe('delete /projects/:id', () => {
// 	it('should allow to delete the project', () => {
// 		return supertest(server).delete('/projects/2').set('Authorization', token).then((response) => {
// 			expect(response.status).toBe(200);
// 		});
// 	});
// });
