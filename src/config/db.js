const mysql = require('mysql2')
const {DB_USERNAME, DB_PASSWORD} = require("../helpers/env")

const connection = mysql.createConnection({
    host    : "",
    user    : DB_USERNAME,
    password: DB_PASSWORD,
    database: "" 
})

connection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("koneksi aman")
    }
})

module.exports = connection