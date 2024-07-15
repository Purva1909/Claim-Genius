"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
router.post("/insert", studentController_1.addStudents);
router.delete('/delete/:ID', studentController_1.deleteStudent);
router.put('/update/:id', studentController_1.updateStudent);
router.get("/pagination", studentController_1.movePage);
exports.default = router;
//# sourceMappingURL=studentRoute.js.map