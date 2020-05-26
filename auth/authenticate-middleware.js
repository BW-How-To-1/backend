const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		const secret = process.env.JWT_SECRET || 'thisisthesecretkey';
		jwt.verify(token, secret, (error, decodedToken) => {
			if (error) {
				res.status(401).json({ message: 'Unable to authenticate ' });
			} else {
				req.jwt = decodedToken;
				next();
			}
		});
	} else {
		res.status(400).json({ message: 'Please provide the correct information' });
	}
};
