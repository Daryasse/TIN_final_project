const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
router.get('/', orderController.showOrderList);
router.get('/add', orderController.showOrderForm);
router.get('/edit/:IdOrder', orderController.showOrderEdit);
router.get('/details/:IdOrder', orderController.showOrderDetails);
router.post('/add', orderController.addOrder);
router.post('/edit', orderController.updateOrder);
router.get('/delete/:IdOrder', orderController.deleteOrder);
module.exports = router;