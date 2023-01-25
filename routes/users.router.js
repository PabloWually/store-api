const express = require('express');
const UserService = require('./../services/users.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema.js')

const router = express.Router();
const service = new UserService();

router.post('/',
	validatorHandler(createUserSchema, 'body'),
	async (req, res, next) => {
	try {
		const body = req.body;
		const rta = await service.create(body)
		res.status(201).json(rta)	
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res , next) => {
	try {
		const users = await service.find();
		res.json(users);
	} catch (error) {
		next(error)
	}

});

module.exports = router
