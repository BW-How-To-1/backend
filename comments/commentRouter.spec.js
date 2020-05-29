const supertest = require('supertest');
const router = require('express').Router();
const db = require('../data/dbConfig');

const server = require('../api/server');

let token;

describe('post /login', () => {
	it('should login and return code 200', () => {
		return supertest(server)
			.post('/api/auth/login')
			.send({ username: 'test6', password: 'test6' })
			.then((response) => {
				console.log(response.body);
				token = response.body.token;
				expect(response.status).toBe(200);
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

describe('get /comments', () => {
	it('should return a list of comments', () => {
		return supertest(server).get('/comments').set('Authorization', token).then((response) => {
			expect(response.status).toBe(200);
		});
	});
});

describe('put /comments/:id', () => {
	console.log(token);
	it('should return comment by id', async () => {
		await db('comments').truncate();
		await supertest(server)
			.put('/comments/1')
			.set('Authorization', token)
			.send({ comments: 'some test comment' })
			.then((response) => {
				console.log(response.body);
				expect(response.status).toBe(200);
			});
	});
});

describe('delete /comments/:id', () => {
	it('should remove comment', async () => {
		await db('comments');
		await supertest(server).delete('/comments/4').set('Authorization', token).then((response) => {
			expect(response.status).toBe(200);
		});
	});
});
