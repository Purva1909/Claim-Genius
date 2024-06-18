const db = require("../config/db");


const insertStudent = async (First_Name, Last_Name, DOB, Mobile_No, Address)=>{
const data = await db.query(`INSERT INTO registration_form (First_Name, Last_Name, DOB, Mobile_No, Address) VALUES (?,?,?,?,?)`,[First_Name, Last_Name, DOB, Mobile_No, Address]);
}

const delStudent = async(studentId) => {
      await db.query("DELETE FROM registration_form WHERE ID= ?",[studentId])
}

const updateStudent = async (First_Name, Last_Name, DOB, Mobile_No, Address,studentId)=>{
    await db.query(`UPDATE registration_form SET First_Name=?, Last_Name=?, DOB=?, Mobile_No=?, Address=? WHERE ID=?`,[First_Name, Last_Name, DOB, Mobile_No, Address, studentId])
}

const pagination = async (fetchStudent, colName,sortMethod,intPageNo,intdataNo) => {
    const calc = (intPageNo - 1) * intdataNo;
    const data = await db.query(`
        SELECT * FROM registration_form WHERE First_Name LIKE ? OR Last_Name LIKE ? OR DOB LIKE ? OR Mobile_No LIKE ? OR Address LIKE ? ORDER BY ${colName || 'ID'} ${sortMethod || "desc"} LIMIT ? OFFSET ?`, [`%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, intdataNo, calc]
         );
         return (data);
}

const total = async (fetchStudent) => {
    const [totalPage] = await db.query(`SELECT COUNT(*) as count FROM registration_form WHERE First_Name like '%${fetchStudent || ""}%' OR Last_Name like '%${fetchStudent || ""}%' OR DOB like '%${fetchStudent || ""}%' OR Mobile_No like '%${fetchStudent || ""}%' OR Address like '%${fetchStudent || ""}%'`);
    return(totalPage);
}

const checkId = async(studentId)=>{
    const [data] = await db.query(`SELECT * from registration_form WHERE ID = ${studentId}`);
    return [data];
}


module.exports = {insertStudent, delStudent, updateStudent, pagination, total,checkId}