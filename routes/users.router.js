const express = require('express');
const UserService = require('./../services/users.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema.js')

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res , next) => {
	try {
		const users = await service.find();
		res.json(users);
	} catch (error) {
		next(error)
	}

});

module.exports = router
