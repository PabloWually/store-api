'use strict';

const { UserSquema, USER_TABLE} = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSquema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropAllEnums(USER_TABLE);
  }
};
