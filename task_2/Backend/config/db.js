const mysql = require('mysql2/promise');


const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'admin',
    database: 'sys'
});
module.exports = mysqlPool;
