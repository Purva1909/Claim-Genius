import express from "express";
import {addStudents,deleteStudent,updateStudent,movePage} from "../controllers/studentController";
const router = express.Router();


router.post("/insert",addStudents);
router.delete('/delete/:ID',deleteStudent);
router.put('/update/:id',updateStudent);
router.get("/pagination", movePage)

export default   router;