const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../config/db')


const Skill = connection.define(
  'skill',
  {
    name_skill: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

module.exports = Skill