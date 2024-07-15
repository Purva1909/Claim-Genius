import db from "../config/db";
import sql from "../services/queries";
import { Request, Response} from 'express';
import type {DataType, ResponseApi,Student,User} from '../type/type'

    export const addStudents = async(req: Request,res: Response<ResponseApi>) =>{
      try{
          const {First_Name, Last_Name, DOB, Mobile_No, Address} = req.body as Student;
          if(!First_Name || !Last_Name || !DOB || !Mobile_No || !Address ){
              return res.status(500).send({
                  success: false,
                  message: 'Please provide every fields'
              });
              }
         
       
        await sql.insertStudent (First_Name, Last_Name, DOB, Mobile_No, Address)
          res.status(201).send({
              success: true,
              message: 'New student record created',
              
          });
      }
      catch(error){
          console.log(error);
          res.status(500).send({
              success: false,
              message: 'Error occur create student API',
              error
          });
      }
  }
   export const deleteStudent = async (req: Request,res: Response<ResponseApi>):Promise<void>=>{
      try{
          const idStudent :string = req.params.ID;
          const studentId :number= parseInt(idStudent) 
          const ID = await sql.checkId(studentId);

          if (ID.length==0){
             res.status(400).send({
                success: false,
                message: 'Id mentioned is wrong'
            });
            return;
        }

          if(!studentId){
              res.status(404).send({
                  success: false,
                  message: "Please provide id or valid id"
              });
              return;
          }
          await sql.delStudent(studentId);
          res.status(200).send({
              success: true,
              message: "Deleted successfully"
          })
      }
      catch(error){
          res.status(500).send({
              success: false,
              message: "Error in delete student",
              error
          })
      }
  }
  
  export const updateStudent =async (req:Request,res:Response<ResponseApi>):Promise<void>=>{
      try{
          const idStudent = req.params.id;
          const studentId = parseInt(idStudent)  
          console.log(studentId);
          const id = await sql.checkId(studentId);
          if(id.length==0){
               res.status(400).send({
                  success: false,
                  message: 'Id mentioned is wrong'
              });
              return
          }
  
          if(!studentId){
               res.status(404).send({
                  success: false,
                  message: 'Provided Id is wrong'
  
              });
              return
          }
          const {First_Name, Last_Name, DOB, Mobile_No, Address} = req.body as Student;
        await sql.updateStudent (First_Name, Last_Name, DOB, Mobile_No, Address,studentId)
          res.status(200).send({
              success: true,
              message: 'Student Details Updated'
          });
      }
      catch(error){
          console.log(error);
          res.status(500).send({
              success: false,
              message: 'Error in Update student API',
              error
          });
      }
  }


export const movePage = async (req:Request<DataType>, res:Response<ResponseApi>) => {
    const { pageNo, dataNo, fetchStudent, sortMethod, colName } = req.query as DataType ;
    const intPageNo = parseInt(pageNo as string) || 1;
    const intdataNo = parseInt(dataNo as string) || 5;

    try {
        
       const data = await sql.pagination (fetchStudent as string, colName as string,sortMethod as string ,intPageNo as number ,intdataNo as number)
       const totalPage = await sql.total(fetchStudent as string)
       console.log(data);
        res.status(200).send({
            success: true,
            data: data,
            fetchtotal: totalPage
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in pagination API',
            error
        });
    }
};


