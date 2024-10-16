const express = require('express');

const {SignUp} = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', SignUp);

module.exports = router;