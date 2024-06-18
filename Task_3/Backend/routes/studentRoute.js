const express = require("express");
const {addStudents,deleteStudent,updateStudent,movePage,} = require("../controllers/studentController");
const router = express.Router();
const  {studentvali} = require('../schema/joivalidation')

router.post("/insert",addStudents);
router.delete('/delete/:id',studentvali,deleteStudent);
router.put('/update/:id',studentvali,updateStudent);
router.get("/pagination", movePage)



module.exports = router;
