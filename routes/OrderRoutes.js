const express = require('express');
const {createOrder, getOrderDetails, getRecentOrder} = require('../controllers/OrderController');

const router = express.Router();

router.post('/userorder', createOrder);
router.get('/orderdetails', getOrderDetails);
router.get('/recentorder', getRecentOrder);

module.exports = router;

