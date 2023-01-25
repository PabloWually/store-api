const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const role = Joi.string().min(5);

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	image: image.required(),
	role: role.required()
});

const updateProductSchema = Joi.object({
	name: name,
	price: price,
	role: role
});

const getProductSchema = Joi.object({
	id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
