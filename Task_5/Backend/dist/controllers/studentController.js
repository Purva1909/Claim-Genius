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
exports.fetch_Image = exports.fileUpload = exports.movePage = exports.updateStudent = exports.deleteStudent = exports.addStudents = void 0;
const queries_1 = __importDefault(require("../services/queries"));
const path_1 = __importDefault(require("path"));
const addStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { First_Name, Last_Name, DOB, Mobile_No, Address } = req.body;
        const myFile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        console.log(myFile);
        if (!First_Name || !Last_Name || !DOB || !Mobile_No || !Address) {
            return res.status(500).send({
                success: false,
                message: 'Please provide every fields'
            });
        }
        yield queries_1.default.insertStudent(First_Name, Last_Name, DOB, Mobile_No, Address);
        res.status(201).send({
            success: true,
            message: 'New students record created',
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
        const idStudent = req.params.ID;
        const studentId = parseInt(idStudent);
        const ID = yield queries_1.default.checkId(studentId);
        if (ID.length == 0) {
            res.status(400).send({
                success: false,
                message: 'Id mentioned is wrong',
            });
            return;
        }
        if (!studentId) {
            res.status(404).send({
                success: false,
                message: "Please provide id or valid id",
            });
            return;
        }
        yield queries_1.default.delStudent(studentId);
        res.status(200).send({
            success: true,
            message: "Deleted successfully",
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
    var _b;
    try {
        const idStudent = req.params.id;
        const studentId = parseInt(idStudent);
        console.log(studentId);
        const id = yield queries_1.default.checkId(studentId);
        if (id.length == 0) {
            res.status(400).send({
                success: false,
                message: 'Id mentioned is wrong',
            });
            return;
        }
        if (!studentId) {
            res.status(404).send({
                success: false,
                message: 'Provided Id is wrong',
            });
            return;
        }
        const { First_Name, Last_Name, DOB, Mobile_No, Address } = req.body;
        const myFile = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        yield queries_1.default.updateStudent(First_Name, Last_Name, DOB, Mobile_No, Address, myFile, studentId);
        res.status(200).send({
            success: true,
            message: 'Student Details Updated',
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
        console.log(data);
        res.status(200).send({
            success: true,
            data: data,
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
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['authorization'];
        const file = req.files;
        let multiple_images = '';
        if (!file) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            });
        }
        else {
            for (const imagee of file) {
                multiple_images = multiple_images + imagee.filename + ',';
            }
            const parseJwt = (token) => {
                try {
                    if (token)
                        return JSON.parse(atob(token.split('.')[1]));
                }
                catch (e) {
                    return null;
                }
            };
            const userID = parseJwt(token);
            yield queries_1.default.documentuploaded(userID.data1.userID, multiple_images);
            return res.status(201).send({
                success: true,
                message: 'New file uploaded',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in uploading files",
        });
    }
});
exports.fileUpload = fileUpload;
const fetch_Image = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['authorization'];
        const userID = req.body.p_token.data1.userID;
        console.log(path_1.default.join(__dirname, 'image'));
        if (!userID) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Id or Provide user id properly'
            });
        }
        const data = yield queries_1.default.fetchImage(userID);
        let data11 = [];
        for (let i = 0; i < data.length; i++) {
            data11.push(data[i].file.split(',').slice(0, -1));
        }
        let data2 = [];
        for (let i = 0; i < data11.length; i++) {
            data2.push(...data11[i]);
        }
        const file_url = [];
        for (let i = 0; i < data2.length; i++) {
            data2[i] = `http://localhost:7070/image/` + data2[i];
        }
        return res.status(200).send({
            success: true,
            message: "Successfully fetched Users",
            data: data2,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in Get Image API',
            error
        });
    }
});
exports.fetch_Image = fetch_Image;
