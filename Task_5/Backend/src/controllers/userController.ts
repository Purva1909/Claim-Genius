import { Request,Response } from "express";
import { addUser, obtainUser,checkAccount } from "../services/userqueries";
import  type {UserLogin} from "../type/type";
import jwt from 'jsonwebtoken';
// import sql from "../services/userqueries";

export const signup = async(req: Request,res: Response) => {
    try{
        const{name,email,password} = req.body as UserLogin;
        console.log({name,email,password})
        if(!name || !email || !password){
            return res.status(400).send({
                success:false,
                message:'Please provide all fields'
            });
        }
        const data = await checkAccount(email);
        if(data.length){
            return res.status(400).send({
                success: false,
                message: "Account exist already",
            })
        }
        await addUser(name, email, password);
        return res.status(201).send({
            success:true,
            message: 'New account created',
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in sign up API',
            error
        });
    }
}

export const login = async(req: Request, res: Response) =>{
    try{
        const {email,password} = req.body as UserLogin;
        console.log(email,password)
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const data = await obtainUser(email, password);
        console.log(data)
        if(data.length){
            const data1=data[0]
            setUserID(data1.userID)
            const secret = process.env.secret ||' ';
            console.log('secret: ', secret);

            jwt.sign({data1}, secret, {expiresIn:'1h'}, (err, token) => {
                res.cookie("authorization", token,{
                    // document.cookie = "authorization=your_jwt_token; path=/; HttpOnly"
                    httpOnly: true,
                })
                // JSON.parse(atob(token.split('.')[1]));
                return res.status(200).json({
                    success:true,
                    message: 'Successfully login',
                    token 
                });
            })
        }

        else{
            res.clearCookie("authorization")
            return res.status(200).json({
              success: false,
              message: 'Login unsuccessfull',
            });       
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message: 'Error in login API',
            error
        });
    }
}

function setUserID(userID:number){
    const file_user_id = userID;
}

export const logout = async (req: Request,res: Response) =>{
    try{
        res.clearCookie("authorization")
        res.status(200).send({
            success:true,
            message:"Logged Out Successfuly"
        })
    }catch(error){
        res.status(400).send({
            success:false,
            message: "Error in logout"
        })
    }
}