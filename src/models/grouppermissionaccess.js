'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class GroupPermissionAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Group)
      this.belongsTo(models.Permission)
      this.belongsTo(models.Access)
    }
  };
  GroupPermissionAccess.init({
    groupId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'GroupPermissionAccess',
    underscored: true,
  });
  sequelizePaginate.paginate(GroupPermissionAccess)
  return GroupPermissionAccess;
};