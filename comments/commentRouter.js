const express = require('express').Router();
const db = require('./comment-model');

const restricted = require('../auth/authenticate-middleware');

module.exports = router;
