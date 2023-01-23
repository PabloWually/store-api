const express = require('express');
const ProductService = require('./../services/product.service.js')

const router = express.Router();
const service = new ProductService();

router.get('/', (req, res) => {
	const products = service.find()
	res.json(products);
});

router.get('/filter', (req, res) => {
	res.send('Im a filter');
})

router.get('/:id', (req,res) =>{
	const { id } = req.params;
	const product = service.findById(id);
	res.json(product);
});

router.post('/', (req, res) => {
	const body = req.body;
	const resp = service.create(body);
	res.status(201).json({
		message: 'created',
		id: resp,
	});
});

router.patch('/:id', (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const resp = service.update(id, body);
	res.json(resp);
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const resp = service.delete(id);
	res.json(resp);
});

module.exports = router
