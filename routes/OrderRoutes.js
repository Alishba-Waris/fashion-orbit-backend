const express = require('express');
const Order = require('../controllers/OrderController');

const router = express.Router();

router.post('/userorder', Order);

module.exports = router;

