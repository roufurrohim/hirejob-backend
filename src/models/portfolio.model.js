const { Sequelize, DataTypes} = require("sequelize");
const db = require('../config/db')

const Portfolio = db.define(
    "portfolio",
    {
        name_apps: {
            type: DataTypes.STRING,

        },
        link_repo: {
            type: DataTypes.STRING,
              
        },
        type: {
            type: DataTypes.ENUM('mobile','web'),

        },
        image: {
            type: DataTypes.STRING,

        },
        users_id: {
            type: DataTypes.NUMBER,

        }
        
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Portfolio;