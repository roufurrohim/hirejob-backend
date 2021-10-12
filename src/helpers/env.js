require('dotenv').config()

const env = {
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    JWT_SECRET  : process.env.JWT_SECRET,
    EMAIL_NODE  : process.env.EMAIL_NODE,
    PASS_NODE   : process.env.PASS_NODE
};
module.exports = env