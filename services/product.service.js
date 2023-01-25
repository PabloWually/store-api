const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool.js')

class ProductService{
	
	constructor(){
		this.products = [];
		this.generateData();
		this.pool = pool;
		this.pool.on('error', (err) => console.error(err));
	}

	generateData() {
		const limit = 100
		for (let index = 0; index < limit; index++) {
			this.products.push({
				id:  faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.imageUrl(),
				isBlock: faker.datatype.boolean(),
			});
		}
	}

	async create(body) {
		const product = {
			id:  faker.datatype.uuid(),
			...body,
		}

		this.products.push(product);
		return product;
	}

	async find() {
		try {
			const query = 'SELECT * FROM task';
			const rta = await this.pool.query(query)
			return rta.rows;
		} catch (error) {
			console.error(error);			
		}
}

	async findById(id) {
		const product = this.products.find(item => item.id === id);
		if(!product){
			throw boom.notFound('Product not Founded');
		}
		if(product.isBlock){
			throw boom.conflict('Product is blocked')
		}
		return product;
	}

	async update(id, body) {
		const product = this.products.find(item => item.id === id);
		if (!product) {
			throw boom.notFound('product not found') 
		}
		
		product.name = body.name || product.name;
		product.price = body.price || product.price;
		product.image = body.image || product.image;
		return product;
	}

	async delete(id) {
		const index = this.products.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Product not found');
		}
		this.products.splice(index,1);
		return { id };
	}
}

module.exports = ProductService;
