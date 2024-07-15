import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'admin',
    database: 'sys'
});
 export default  mysqlPool;