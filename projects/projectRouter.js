const router = require('express').Router();
const db = require('./project-model');

// const restricted = require('../auth/authenticate-middleware');

router.get('/', (req, res) => {
	db
		.getProjects()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
});

router.get('/:id', (req, res) => {
	db
		.findById(req.params.id)
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: error.message });
		});
});

router.post('/', (req, res) => {
	db
		.add(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
});

router.delete('/:id', (req, res) => {
	db
		.remove(req.params.id)
		.then((project) => {
			if (project) {
				res.status(200).json({ message: 'The project has been removed' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Unable to delete the project' });
		});
});

router.put('/:id', (req, res) => {
	const changes = req.body;
	db
		.update(req.params.id, changes)
		.then((project) => {
			if (project) {
				res.status(200).json(project);
			} else {
				res.status(404).json({ message: 'The project could not be found' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'An error occured while updating the project' });
		});
});

module.exports = router;
