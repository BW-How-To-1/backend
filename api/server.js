const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('../auth/authenticate-middleware');
const authRouter = require('../auth/authenticate');
const projectRouter = require('../projects/projectRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
	res.send('Hello World');
});

server.use('/api/auth', authRouter);
server.use('/projects', auth, projectRouter);

module.exports = server;
