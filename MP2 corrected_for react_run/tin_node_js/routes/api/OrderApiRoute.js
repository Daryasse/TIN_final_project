const express = require('express');
const router = express.Router();

const API = require('../../api/OrderAPI');

router.get('/', API.getOrders);
router.get('/:id', API.getOrderById);
router.post('/', API.createOrder);
router.put('/:id', API.updateOrder);
router.delete('/:id', API.deleteOrder);

module.exports = router;