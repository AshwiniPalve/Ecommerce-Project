
//import mysql2
const mysql = require('mysql2')

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    port: 3306,
    database: 'ecommerce1',
    waitforConnection:true,
    connectionLimit:10,
    queueLimit:0,
    
})
module.exports = pool

