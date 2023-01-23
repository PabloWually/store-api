const faker = require('faker');

class ProductService{
	
	constructor(){
		this.products = [];
		this.generateData();
	}

	generateData() {
		const limit = 100
		for (let index = 0; index < limit; index++) {
		this.products.push({
			id:  faker.datatype.uuid(),
			name: faker.commerce.productName(),
			price: parseInt(faker.commerce.price(), 10),
			image: faker.image.imageUrl(),
		});

	}
}

	create(body) {
		const product = {
			id:  faker.datatype.uuid(),
			...body,
		}

		this.products.push(product);
		return product;
	}

	find() {
		return this.products;
	}

	findById(id) {
		return this.products.find(item => item.id === id);
	}

	update(id, body) {
		const product = this.products.find(item => item.id === id);
		if (!product) {
			throw new Error('Product not found');
		}
			
		product.name = body.name || product.name;
		product.price = body.price || product.price;
		product.image = body.image || product.image;
		return product;
	}

	delete(id) {
		const index = this.products.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Product not found');
		}
		this.products.splice(index,1);
		return { id };
	}
}

module.exports = ProductService;
