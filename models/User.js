// importing required files and packages
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// instance method for password comparison
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// defining columns
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // on every user creation,encrypting the password using bcrypt
      beforeCreate: async (newUserData) => {
        if (newUserData.password)
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
//I do not need this
      // beforeUpdate: async (updatedUserData) => {
      //   updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      //   return updatedUserData;
      // },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
