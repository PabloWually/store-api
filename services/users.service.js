const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres.js');

class UserService{
	constructor() {}

	async find(){
		const client = await getConnection();
		const rta = await client.query('SELECT * FROM task');
		return rta.rows;
	}
}

module.exports = UserService;
