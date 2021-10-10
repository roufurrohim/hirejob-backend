require('dotenv').config()

const env = {
    dbUsername: process.env.db_username,
    dbPassword: process.env.db_password,
    JWT_SECRET: process.env.JWT_SECRET,
};
module.exports = env