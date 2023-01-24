const express = require('express');
const ProductService = require('./../services/product.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema.js')

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
	const products = await service.find()
	res.json(products);
});

router.get('/filter', (req, res) => {
	res.send('Im a filter');
});

router.get('/:id',
	validatorHandler(getProductSchema, 'params'),
	async(req, res, next) =>{
	try {
		const { id } = req.params;
		const product = await service.findById(id);
		res.json(product);
	} catch (error) {
		next(error);
	}
});

router.post('/', 
	validatorHandler(createProductSchema, 'body'),
	async (req, res) => {
	const body = req.body;
	const resp = await service.create(body);
	res.status(201).json(resp);
});

router.patch('/:id',
	validatorHandler(getProductSchema, 'params'),
	validatorHandler(updateProductSchema, 'body'),
	async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const resp = await service.update(id, body);
		res.json(resp);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const resp = await service.delete(id);
	res.json(resp);
});

module.exports = router
