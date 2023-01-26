'use strict';
const {ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model')
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE)
  }
};
