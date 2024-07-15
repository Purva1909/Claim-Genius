import db from "../config/db";
import sql from "../services/queries";
import { Request, Response} from 'express';
import type {DataType, ResponseApi,Student,User} from '../type/type'
import { Token } from "typescript";
import { parse } from "dotenv";
import { string } from "joi";
import path from 'path';

    export const addStudents = async(req: Request,res: Response<ResponseApi>) =>{
      try{
          const {First_Name, Last_Name, DOB, Mobile_No, Address} = req.body as Student;
          const myFile = req.file?.filename;
          console.log(myFile);
          if(!First_Name || !Last_Name || !DOB || !Mobile_No || !Address ){
              return res.status(500).send({
                  success: false,
                  message: 'Please provide every fields'
              });
              }
         
       
        await sql.insertStudent (First_Name, Last_Name, DOB, Mobile_No, Address)
          res.status(201).send({
              success: true,
              message: 'New students record created',
              
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
                message: 'Id mentioned is wrong',
            });
            return;
        }

          if(!studentId){
              res.status(404).send({
                  success: false,
                  message: "Please provide id or valid id",
              });
              return;
          }
          await sql.delStudent(studentId);
          res.status(200).send({
              success: true,
              message: "Deleted successfully",
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
                  message: 'Id mentioned is wrong',
              });
              return
          }
  
          if(!studentId){
               res.status(404).send({
                  success: false,
                  message: 'Provided Id is wrong',
  
              });
              return
          }
          const {First_Name, Last_Name, DOB, Mobile_No, Address} = req.body as Student;
          const myFile = req.file?.filename;
        await sql.updateStudent (First_Name, Last_Name, DOB, Mobile_No, Address,myFile,studentId)
          res.status(200).send({
              success: true,
              message: 'Student Details Updated',
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


export const fileUpload = async(req:Request, res:Response)=>{
    try{
        const token = req.cookies['authorization'];
        const file   = req.files as Express.Multer.File[];
        
        let multiple_images=''
        if(!file){
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            });
        }
        else{
            for (const imagee of file){
                multiple_images = multiple_images+ imagee.filename +',';
            }
            const parseJwt = (token:string|undefined) => {
                try {
                    if(token)
                  return JSON.parse(atob(token.split('.')[1]));
                } catch (e) {
                  return null;
                }
            };
            const userID = parseJwt(token);
            await sql.documentuploaded(userID.data1.userID, multiple_images);
            return res.status(201).send({
                success: true,
                message: 'New file uploaded',   
            });
        }
    } catch(error){
        console.log(error);
        
        return res.status(400).send({
            success:false,
            message: "Error in uploading files",
        })
    }
}



export const fetch_Image = async(req:Request, res:Response)=>{
    try{
        const token = req.cookies['authorization'];
        const userID = req.body.p_token.data1.userID;
        console.log(path.join(__dirname, 'image'));
        
        if(!userID){
            return res.status(404).send({
                success: false,
                message: 'Invalid Id or Provide user id properly'

            });
        }
        const data = await sql.fetchImage(userID)
        
        let data11 = []
        for(let i=0; i<data.length;i++){
            data11.push(data[i].file.split(',').slice(0, -1));

        }

        let data2:string[] = []
        for(let i=0; i<data11.length;i++){
            data2.push(...data11[i])
        }
        const file_url :string[] = [];
        for(let i =0;i<data2.length;i++) {
            data2[i] =`http://localhost:7070/image/`+data2[i];
        }


        return res.status(200).send({
            success: true,
            message : "Successfully fetched Users",
            data: data2,
        })
        
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in Get Image API',
            error
        });
    }
}