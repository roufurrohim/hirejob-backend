const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db")

const Messages = db.define(
    "messages",
    {
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        msg: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);
module.exports = Messages


