'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class UserTenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
      this.belongsTo(models.Tenant)
      this.belongsTo(models.Group)
    }
  };
  UserTenant.init({
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    tenantId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    groupId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isCurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserTenant',
    underscored: true,
  });
  sequelizePaginate.paginate(UserTenant)
  return UserTenant;
};