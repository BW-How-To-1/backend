const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/user-model');
const { isValid } = require('../users/user-service');

router.post('/register', (req, res) => {
	const credentials = req.body;
	if (isValid(credentials)) {
		const rounds = process.env.BCRYPT_ROUNDS || 10;
		const hash = bcryptjs.hashSync(credentials.password, rounds);
		credentials.password = hash;

		Users.add(credentials)
			.then((user) => {
				res.status(201).json({ data: user });
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});
	} else {
		res.status(400).json({
			message: 'Please provide username and password'
		});
	}
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	Users.getBy({ username: username })
		.first()
		.then((user) => {
			if (user && bcryptjs.compareSync(password, user.password)) {
				const token = createToken(user);
				res.status(200).json({ message: 'Welcome to our API', token });
			} else {
				res.status(401).json({ message: 'Invalid credentials' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: err.message });
		});
});

function createToken(user) {
	const secret = process.env.JWT_SECRET || 'thisisthesecretkey';
	const payload = {
		sub: user.id,
		username: user.username,
		role: user.role
	};

	const options = {
		expiresIn: '1d'
	};

	return jwt.sign(payload, secret, options);
}

module.exports = router;
