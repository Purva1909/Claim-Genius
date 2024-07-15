import db from "../config/db";
import { UserLogin} from '../type/type';

export const addUser = async (name: string, email: string, password: string): Promise<void> => {
    const data = await db.query(`INSERT INTO user_table (name, email, password) VALUES (?,?,?)`, [name, email, password]);
}


export const obtainUser = async (email: string, password: string): Promise<UserLogin[]> => {
    const [data] = await db.query(`SELECT * FROM user_table WHERE email=? and password=?`, [email, password]);
    return data as UserLogin[];
}

export const checkAccount = async (email: string): Promise<UserLogin[]> => {
    const [data] = await db.query(`SELECT * FROM user_table WHERE email=?`, [email]);
    return data as UserLogin[];
}
