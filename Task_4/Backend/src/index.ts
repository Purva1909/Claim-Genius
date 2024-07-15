import express from 'express';
import dotenv from 'dotenv';
import mysqlPool from './config/db';
import router from './routes/studentRoute'

dotenv.config();

const app = express();
const PORT = 7070;

app.use(express.json());


app.use('/student' , router);
app.get('/test', (req ,res) => {
    res.status(200).send('<h1> Mysql APP </h1>');
}); 

// const PORT = process.env.PORT || 7000;

 mysqlPool.query('SELECT 1').then(() => {
     console.log('My sql db connected');
    app.listen(PORT, () => {
         console.log(`Server Running  on port ${PORT}`); 
      });
 })

 .catch((error) => {
     console.log(error)
 });

