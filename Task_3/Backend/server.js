const express = require('express');
const dotenv = require('dotenv');
const mysqlPool = require('./config/db');

dotenv.config();

const app = express();

app.use(express.json());


app.use('/student' , require ('./routes/studentRoute'));
app.get('/test', (req ,res) => {
    res.status(200).send('<h1> Mysql APP </h1>');
}); 

const PORT = process.env.PORT || 7000;

 mysqlPool.query('SELECT 1').then(() => {
     console.log('My sql db connected');
    app.listen(PORT, () => {
         console.log(`Server Running ON PORT ${process.env.PORT}`); 
      });
 })

 .catch((error) => {
     console.log(error)
 });
