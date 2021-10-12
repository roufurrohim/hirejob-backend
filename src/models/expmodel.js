const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../config/db')


const Exp = connection.define(
  'work_experience',
  {
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_work: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_work: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
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

module.exports = Exp