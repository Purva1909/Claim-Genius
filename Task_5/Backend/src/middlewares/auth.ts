import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserLogin} from '../type/type'
import { Request, Response, NextFunction } from 'express';
dotenv.config();

export function verifyToken(req:Request,res:Response, next:NextFunction) {
    const new_user  = {
        email:'',
        password:''
    } as UserLogin;
    const secret = process.env.secret || '';
    const token = req.cookies['authorization'];
    console.log('Cookies:', req.cookies);
    if (!token){
        return res.status(401).send({
            success:false,
            message:"token Not Found"
        })
    }
    else{
        try{
            const p_token = jwt.verify(token, secret)
            req.body.p_token = p_token;
            next();
        }catch(error){
            return res.status(403).send({
                success:false,
                message: "token is not Valid"
            })
        }
    }
}
