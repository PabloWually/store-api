const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')
const bcrypt = require('bcrypt');

class UserService{
	constructor() {}

	async create(data){
		const hash = await bcrypt.hash('data.password', 10);
		const rta = await models.User.create({
			...data,
			password: hash
		});
		delete rta.dataValues.password;
		return rta;
	}

	async find(){
		const rta = await models.User.findAll({
			include: ['customer']
		});
		return rta;
	}

	async findById(id){
		const user = await models.User.findByPk(id, {
			include: ['customer']
		});
		if (!user) {
      throw boom.notFound('user not found');
    }
		return user;
	}

	async findByEmail(email){
		const user = await models.User.findOne({
			where: { email }
		});
		if (!user) {
      throw boom.notFound('user not found');
    }
		return user;
	}
}

module.exports = UserService;
