import express from 'express';
import dotenv from 'dotenv';
import mysqlPool from './config/db';
import router from './routes/studentRoute';
import router1 from './routes/userRoute';
import cookieParser = require('cookie-parser');
const path = require('path');
dotenv.config();

const app = express();
const PORT = 7070;

app.use(express.json());
app.use(cookieParser())

app.use('/image', express.static(path.join(__dirname,'../src/','image')))
app.use('/student' , router);
app.use('/user',router1)
app.get('/test', (req ,res) => {
    res.status(200).send('<h1> Mysql APP </h1>');
}); 
 mysqlPool.query('SELECT 1').then(() => {
     console.log('My sql db connected');
    app.listen(PORT, () => {
         console.log(`Server Running  on port ${PORT}`);
         console.log(path.join(__dirname,'../src/','image'));
        });
 })

 .catch((error) => {
     console.log(error)
 });