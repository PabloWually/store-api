const express = require('express');

const router = express.Router();

router.get('/:category_id/products/:products_id', (req,res) => {
	const { category_id, products_id } = req.params;
	res.json({
		category_id,
		products_id,
	});
});

module.exports = router;