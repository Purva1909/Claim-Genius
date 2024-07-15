import db from "../config/db";
import type {Student,fetchUser} from '../type/type'

const insertStudent = async (First_Name:string, Last_Name:string, DOB:string, Mobile_No:string, Address:string)=>{
const data = await db.query(`INSERT INTO registration_form (First_Name, Last_Name, DOB, Mobile_No, Address) VALUES (?,?,?,?,?,?)`,[First_Name, Last_Name, DOB, Mobile_No, Address]);
}

const delStudent = async(studentId:number):Promise<void> => {
      await db.query(`DELETE FROM registration_form WHERE ID = ?`,[studentId])
}


const updateStudent = async (First_Name:string, Last_Name:string, DOB:string, Mobile_No:string, Address:string,myFile: string | undefined, studentId: number):Promise<void>=>{
    await db.query(`UPDATE registration_form SET First_Name=?, Last_Name=?, DOB=?, Mobile_No=?, Address=?, myFile=? WHERE ID=?`,[First_Name, Last_Name, DOB, Mobile_No, Address,myFile, studentId])
}

const pagination = async (fetchStudent:string, colName:string, sortMethod:string, intPageNo:number, intdataNo:number):Promise<Student[]> => {
    const calc = (intPageNo - 1) * intdataNo;
    const [data] = await db.query(`
        SELECT * FROM registration_form WHERE First_Name LIKE ? OR Last_Name LIKE ? OR DOB LIKE ? OR Mobile_No LIKE ? OR Address LIKE ? OR myFile LIKE ? ORDER BY ${colName || 'ID'} ${sortMethod || "desc"} LIMIT ? OFFSET ?`, [`%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`,`%${fetchStudent || ""}%`, `%${fetchStudent}%`, intdataNo, calc]
         );
         console.log(data);
         return data as Student[];
}

const total = async (fetchStudent:string):Promise<number> =>{
    const [totalPage]= await db.query(`SELECT COUNT(ID) as count FROM registration_form WHERE First_Name like '%${fetchStudent || ""}%' OR Last_Name like '%${fetchStudent || ""}%' OR DOB like '%${fetchStudent || ""}%' OR Mobile_No like '%${fetchStudent || ""}%' OR Address like '%${fetchStudent || ""}%' OR myFile like '%${fetchStudent}%'`);
    const [{count}] = totalPage as {count: number}[];
    return count;
}

const checkId = async(studentId:number)=>{
    console.log(studentId)
    const [data] = await db.query(`SELECT * from registration_form WHERE ID = ? `, [studentId]);
    return [data];
}
const documentuploaded = async (userID: number,file: string) => {
const data= await db.query ('INSERT INTO file_upload (userID,file) VALUES (?,?)',[userID,file]);
return data;
} 
const fetchImage = async (userID:number):Promise<fetchUser[]>=>{
    const [data] = await db.query(`SELECT file from file_upload where userID = ? `, [userID]);
    
    return data as fetchUser[];
}
const updateImage = async (userID:number , file:string) => {
    const [data] = await db.query('UPDATE user_table SET file = ? WHERE userID =?', [file,userID])
}
export default  {insertStudent, delStudent, updateStudent, pagination, total, checkId,documentuploaded,fetchImage,updateImage}