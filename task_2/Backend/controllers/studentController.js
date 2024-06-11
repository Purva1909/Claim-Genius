const db = require("../config/db");


  const getStudents = async (req,res) => {
   try{
        const data = await db.query(' SELECT * FROM registration_form');
          if(!data) {
             return res.status(404).send({
                 success:false,
                 message:'No Records Found'
             });
         }
         res.status(200).send({
             success: true,
             message: 'All Students Records',
             data:data[0],
         });
      } catch(error){
         console.log(error);
         res.status(500).send({
             success:false,
             message:"Error in Get all student API",
             error,
         });
       }

     };
     const addStudents = async(req,res)=>{
      try{
          const {First_Name, Last_Name, DOB, Mobile_No, Address} = req.body;
          if(!First_Name || !Last_Name || !DOB || !Mobile_No || !Address ){
              return res.status(500).send({
                  success: false,
                  message: 'Please provide every fields'
              });
              }
         
          const data = await db.query(`INSERT INTO registration_form (First_Name, Last_Name, DOB, Mobile_No, Address) VALUES (?,?,?,?,?)`,[First_Name, Last_Name, DOB, Mobile_No, Address]);
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
          studentId = req.params.id;
          if(!studentId){
              return res.status(404).send({
                  success: false,
                  message: "Please provide id or valid id"
              });
          }
          await db.query("DELETE FROM registration_form WHERE ID= ?",[studentId])
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
          const studentID = req.params.id;
          if(!studentID){
              return res.status(404).send({
                  success: false,
                  message: 'Invalid Id or Provide Student id'
  
              })
          }
          const {First_Name, Last_Name, DOB, Mobile_No, Address} = req.body;
          const data = await db.query(`UPDATE registration_form SET First_Name=?, Last_Name=?, DOB=?, Mobile_No=?, Address=? WHERE ID=?`,[First_Name, Last_Name, DOB, Mobile_No, Address, studentID])
          if(!data){
              return res.status(500).send({
                  success: false,
                  message: 'Error in Update Data'
              });
          }
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
  

    

 module.exports = {getStudents, addStudents, deleteStudent, updateStudent};

