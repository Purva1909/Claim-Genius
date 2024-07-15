import express,{Request, Response} from 'express';
import {Router} from 'express';
import { signup, login,logout} from '../controllers/userController';
const router1:Router = express.Router();
router1.post('/signup',signup);
router1.post('/login',login);
router1.post('/logout',logout);

export default router1;   