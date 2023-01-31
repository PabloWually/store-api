const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService{
  constructor(){}

  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find(){
    const rta = await models.Order.findAll();
    return rta;
  }

  async findOne(id) {
    const rta = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ]
    });
    return rta
  }

  async findByUser(userId){
    const rta = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ]
    });
    return rta;
  }

}

module.exports = OrderService