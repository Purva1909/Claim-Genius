"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movePage = exports.updateStudent = exports.deleteStudent = exports.addStudents = void 0;
const queries_1 = __importDefault(require("../services/queries"));
const addStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { First_Name, Last_Name, DOB, Mobile_No, Address } = req.body;
        if (!First_Name || !Last_Name || !DOB || !Mobile_No || !Address) {
            return res.status(500).send({
                success: false,
                message: 'Please provide every fields'
            });
        }
        yield queries_1.default.insertStudent(First_Name, Last_Name, DOB, Mobile_No, Address);
        res.status(201).send({
            success: true,
            message: 'New student record created',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occur create student API',
            error
        });
    }
});
exports.addStudents = addStudents;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idStudent = req.params.id;
        const studentId = parseInt(idStudent);
        const ID = yield queries_1.default.checkId(studentId);
        if (ID.length == 0) {
            return res.status(400).send({
                success: false,
                message: 'Id mentioned is wrong'
            });
        }
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Please provide id or valid id"
            });
        }
        yield queries_1.default.delStudent(studentId);
        res.status(200).send({
            success: true,
            message: "Deleted successfully"
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in delete student",
            error
        });
    }
});
exports.deleteStudent = deleteStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idStudent = req.params.id;
        const studentId = parseInt(idStudent);
        console.log(studentId);
        const ID = yield queries_1.default.checkId(studentId);
        if (ID.length == 0) {
            return res.status(400).send({
                success: false,
                message: 'Id mentioned is wrong'
            });
        }
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: 'Provided Id is wrong'
            });
        }
        const { First_Name, Last_Name, DOB, Mobile_No, Address } = req.body;
        yield queries_1.default.updateStudent(First_Name, Last_Name, DOB, Mobile_No, Address, studentId);
        res.status(200).send({
            success: true,
            message: 'Student Details Updated'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update student API',
            error
        });
    }
});
exports.updateStudent = updateStudent;
const movePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNo, dataNo, fetchStudent, sortMethod, colName } = req.query;
    const intPageNo = parseInt(pageNo) || 1;
    const intdataNo = parseInt(dataNo) || 5;
    try {
        const data = yield queries_1.default.pagination(fetchStudent, colName, sortMethod, intPageNo, intdataNo);
        const totalPage = yield queries_1.default.total(fetchStudent);
        res.status(200).send({
            success: true,
            data: data[0],
            fetchtotal: totalPage
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in pagination API',
            error
        });
    }
});
exports.movePage = movePage;
//# sourceMappingURL=studentController.js.map