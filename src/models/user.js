'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    comparePassword(password) {
      return bcrypt.compareSync(password, this.password)
    }

    static associate(models) {
      this.hasMany(models.UserTenant)
      this.belongsToMany(models.Role, { through: models.UserRole })
      this.belongsToMany(models.Group, { through: models.UserTenant })
      this.belongsToMany(models.Tenant, { through: models.UserTenant })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activationCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    indexes: [{ unique: true, fields: ['email'] }]
  });
  return User;
};