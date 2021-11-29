require('dotenv').config()

const env = {
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_NODE: process.env.EMAIL_NODE,
    PASS_NODE: process.env.PASS_NODE,
    PORT: process.env.PORT,
};
module.exports = env