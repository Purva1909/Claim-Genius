const express = require("express");
const { getStudents,addStudents,deleteStudent,updateStudent} = require("../controllers/studentController");


const router = express.Router();

router.get("/getall", getStudents);
router.post("/insert",addStudents);
router.delete('/delete/:id',deleteStudent);
router.put('/update/:id', updateStudent)


module.exports = router;
