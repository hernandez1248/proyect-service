'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasOne(models.Address,{
        foreignKey: 'customerId',
        as: 'address'
      })
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    RFC: DataTypes.STRING,
    email: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};