const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db")
const Users = require("./users.model")

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
Messages.belongsTo(Users, { as: "senderUsers", foreignKey: "sender" });
Messages.belongsTo(Users, { as: "receiverUsers", foreignKey: "receiver" });

module.exports = Messages