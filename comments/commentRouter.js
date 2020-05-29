const router = require('express').Router();
const db = require('./comment-model');

router.get('/', (req, res) => {
	db
		.getComments()
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
});

router.get('/:id', (req, res) => {
	db
		.findById(req.params.id)
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
});

router.delete('/:id', (req, res) => {
	db
		.remove(req.params.id)
		.then((comments) => {
			if (comments) {
				res.status(200).json({ message: 'The comment has been removed' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Unable to delete the comment' });
		});
});

router.put('/:id', (req, res) => {
	const changes = req.body;
	db
		.update(req.params.id, changes)
		.then((comment) => {
			if (comment) {
				res.status(200).json(comment);
			} else {
				res.status(404).json({ message: 'The comment could not be found' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'An error occured while updating the comment', error });
		});
});

module.exports = router;
