'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserRole.init({
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    underscored: true
  });
  return UserRole;
};