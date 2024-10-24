const express = require('express');
const { signUp, logIn, getUserInfo } = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/userinfo/:id', getUserInfo);

module.exports = router;
