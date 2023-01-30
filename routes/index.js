const express = require('express');
const productsRouter = require('./products.router.js');
const usersRouter = require('./users.router.js');
const categoryRouter = require('./category.router.js');
const customerRouter = require('./customer.router');
const orderRouter = require('./order.router');
const authRouter = require('./auth.router');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/products', productsRouter);
	router.use('/users', usersRouter);
	router.use('/category', categoryRouter);
	router.use('/customer',  customerRouter);
	router.use('/order', orderRouter);
	router.use('/auth', authRouter);
}

module.exports = routerApi
