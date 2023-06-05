'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.Customer,{
        foreignKey: 'customerId',
        as: 'customer'
      })

      models.Address.belongsTo(models.Locality, 
        {
          as: 'locality',
          foreignKey: 'localityId'
        });
    }
  }
  Address.init({
    street: DataTypes.STRING,
    outNumber: DataTypes.STRING,
    intNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};