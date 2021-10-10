const { Sequelize, DataTypes} = require("sequelize");
const db = require('../config/db')

const Users = db.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING,
              
        },
        password: {
            type: DataTypes.NUMBER,

        },
        no_telp: {
            type: DataTypes.NUMBER,

        },
        image: {
            type: DataTypes.STRING,

        },
        special_skill: {
            type: DataTypes.STRING,

        },
        descriptions: {
            type: DataTypes.STRING,

        },
        workplace: {
            type: DataTypes.STRING,

        },
        sector: {
            type: DataTypes.STRING,

        },
        city: {
            type: DataTypes.STRING,

        },
        ig: {
            type: DataTypes.STRING,

        },
        github: {
            type: DataTypes.STRING,

        },
        gitlab: {
            type: DataTypes.STRING,

        },
        linkedin: {
            type: DataTypes.STRING,

        },
        status: {
            type: DataTypes.NUMBER,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Users;