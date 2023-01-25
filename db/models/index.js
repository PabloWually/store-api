const { User, UserSquema } = require('./user.model');

function setUpModels(sequelize){
  User.init(UserSquema, User.config(sequelize));
}

module.exports = setUpModels;