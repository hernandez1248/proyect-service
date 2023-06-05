'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Locality.belongsTo(models.City, 
        {
          as: 'city',
          foreignKey: 'cityId'
        });

        models.Locality.hasMany(models.Address,
          {
            as: "address",
          })
    }
  }
  Locality.init({
    name: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    cityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Locality',
  });
  return Locality;
};