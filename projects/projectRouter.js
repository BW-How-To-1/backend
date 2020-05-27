const express = require('express').Router;
const db = require('./project-model');

const restricted = require('../auth/authenticate-middleware');

router.get('/', restricted, (req, res) => {
	db
		.getProjects()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
});

router.get('/:id'),
	restricted,
	(req, res) => {
		db
			.findById(req.params.id)
			.then((project) => {
				if (project) {
					res.status(200).json(project);
				} else {
					res.status(404).json({ message: error.message });
				}
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});
	};

router.post('/', restricted, (req, res) => {
	db
		.add(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
});

router.delete('/:id', restricted, (req, res) => {
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

router.put('/:id', restricted, (req, res) => {
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
