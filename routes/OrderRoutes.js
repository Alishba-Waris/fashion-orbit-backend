const express = require('express');
const {createOrder, getOrderDetails} = require('../controllers/OrderController');

const router = express.Router();

router.post('/userorder', createOrder);
router.get('/orderdetails', getOrderDetails);

module.exports = router;

