const express = require('express')

const route = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

route.get('/', checkAuth, OrdersController.orders_get_all)

route.post('/', checkAuth, OrdersController.orders_create_order)

route.get('/:orderId', checkAuth, OrdersController.orders_get_order)

route.delete('/:orderId', checkAuth , OrdersController.orders_delete_order)

module.exports = route