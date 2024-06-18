const db = require("../config/db");
const sql = require("../services/queries");


     const addStudents = async(req,res)=>{
      try{
          const {First_Name, Last_Name, DOB, Mobile_No, Address} = req.body;
          if(!First_Name || !Last_Name || !DOB || !Mobile_No || !Address ){
              return res.status(500).send({
                  success: false,
                  message: 'Please provide every fields'
              });
              }
         
       
        await sql.insertStudent (First_Name, Last_Name, DOB, Mobile_No, Address)
          if(!data){
              return res.status(404).send({
                  success: false,
                  message: 'error occur insert query'
              });
          }
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
   const deleteStudent = async (req,res)=>{
      try{
          const studentId = req.params.id;
          
          const ID = await sql.checkId(studentId);

          if(ID[0].length==0){
            return res.status(400).send({
                success: false,
                message: 'Id mentioned is wrong'
            })
        }

          if(!studentId){
              return res.status(404).send({
                  success: false,
                  message: "Please provide id or valid id"
              });
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
  
  const updateStudent =async (req,res)=>{
      try{
          const studentId = req.params.id;
          console.log(studentId);
          const ID = await sql.checkId(studentId);
          if(ID[0].length==0){
              return res.status(400).send({
                  success: false,
                  message: 'Id mentioned is wrong'
              })
          }
  
          if(!studentId){
              return res.status(404).send({
                  success: false,
                  message: 'Invalid Id or Provide Student id'
  
              })
          }
          const {First_Name, Last_Name, DOB, Mobile_No, Address} = req.body;
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


const movePage = async (req, res) => {
    const { pageNo, dataNo, fetchStudent, sortMethod, colName } = req.query;
    const intPageNo = parseInt(pageNo) || 1;
    const intdataNo = parseInt(dataNo) || 5;

    try {
        
       const data = await sql.pagination (fetchStudent, colName,sortMethod,intPageNo,intdataNo)
       const totalPage = await sql.total(fetchStudent)
        res.status(200).send({
            success: true,
            data: data[0],
            fetchtotal: totalPage[0].count,
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
module.exports = {addStudents, deleteStudent, updateStudent, movePage };

