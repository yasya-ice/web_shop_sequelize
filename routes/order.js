const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/cart/order', (req, res) => orderController.placeOrder(req, res));

router.get('/orders', (req, res) => orderController.getUserOrders(req, res));

module.exports = router;