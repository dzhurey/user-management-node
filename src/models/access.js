'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class Access extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Access.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Access',
    underscored: true,
  });
  sequelizePaginate.paginate(Access)
  return Access;
};