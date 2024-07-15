import jwt from 'jsonwebtoken';
import type {UserLogin} from '../type/type'

const secret='puru1909'


export function set_user(user:UserLogin[]){
    return jwt.sign(user, secret);
}

export function get_user(token:string){
    if(!token) return null;
    return jwt.verify(token, secret);
}