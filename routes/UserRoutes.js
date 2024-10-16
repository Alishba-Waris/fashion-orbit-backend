// UserRoutes.js
const express = require('express');
const { signUp } = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', signUp);

module.exports = router;
