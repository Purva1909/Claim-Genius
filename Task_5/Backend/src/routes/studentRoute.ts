import express from "express";
import {addStudents,deleteStudent,updateStudent,movePage,fileUpload,fetch_Image} from "../controllers/studentController";
import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { verifyToken } from "../middlewares/auth";
const router :Router = express.Router();
const storage = multer.diskStorage({
    destination: './src/image/',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
})
function checkFileType(file:Express.Multer.File, cb:multer.FileFilterCallback) {
    const filetypes = /jpeg|pdf|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only jpeg, pdf, jpg, png is accepted)'));
    }
  }
router.post("/insert",verifyToken,upload.single('myFile'),addStudents);
router.delete('/delete/:ID',verifyToken,deleteStudent);
router.put('/update/:id',verifyToken,upload.single('myFile'),updateStudent);
router.get("/pagination",verifyToken, movePage);
router.post("/upload",verifyToken ,upload.array('file',8), fileUpload);
router.get("/fetchimg",verifyToken, fetch_Image);
export default router;
