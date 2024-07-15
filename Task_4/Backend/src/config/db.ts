import mysql from 'mysql2/promise';


const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'admin',
    database: 'sys'
});
 export default  mysqlPool;