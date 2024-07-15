"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: './src/image/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
function checkFileType(file, cb) {
    const filetypes = /jpeg|pdf|jpg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb(new Error('Only jpeg, pdf, jpg, png is accepted)'));
    }
}
router.post("/insert", auth_1.verifyToken, upload.single('myFile'), studentController_1.addStudents);
router.delete('/delete/:ID', auth_1.verifyToken, studentController_1.deleteStudent);
router.put('/update/:id', auth_1.verifyToken, upload.single('myFile'), studentController_1.updateStudent);
router.get("/pagination", auth_1.verifyToken, studentController_1.movePage);
router.post("/upload", auth_1.verifyToken, upload.array('file', 8), studentController_1.fileUpload);
router.get("/fetchimg", auth_1.verifyToken, studentController_1.fetch_Image);
exports.default = router;
