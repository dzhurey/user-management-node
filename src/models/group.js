'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.GroupPermissionAccess)
      this.belongsTo(models.Tenant)
    }
  };
  Group.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tenantId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'Group',
    underscored: true,
  });
  sequelizePaginate.paginate(Group)
  return Group;
};