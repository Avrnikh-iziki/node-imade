
const express = require('express');
const authrization = require('../config/jwttoken')
const router = express.Router();
const orders = require('../controller/orders')

router.get('/', orders.allorders)
    .post('/', orders.addorder)

router.put('/:order_id', authrization, orders.updateorder)
    .delete('/:order_id', authrization, orders.deleteorder)

router.get('/order/:customer_id', orders.user_orders)

module.exports = router