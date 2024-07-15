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
const db_1 = __importDefault(require("../config/db"));
const insertStudent = (First_Name, Last_Name, DOB, Mobile_No, Address) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.query(`INSERT INTO registration_form (First_Name, Last_Name, DOB, Mobile_No, Address) VALUES (?,?,?,?,?)`, [First_Name, Last_Name, DOB, Mobile_No, Address]);
});
const delStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`DELETE FROM registration_form WHERE ID = ?`, [studentId]);
});
const updateStudent = (First_Name, Last_Name, DOB, Mobile_No, Address, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`UPDATE registration_form SET First_Name=?, Last_Name=?, DOB=?, Mobile_No=?, Address=? WHERE ID=?`, [First_Name, Last_Name, DOB, Mobile_No, Address, studentId]);
});
const pagination = (fetchStudent, colName, sortMethod, intPageNo, intdataNo) => __awaiter(void 0, void 0, void 0, function* () {
    const calc = (intPageNo - 1) * intdataNo;
    const [data] = yield db_1.default.query(`
        SELECT * FROM registration_form WHERE First_Name LIKE ? OR Last_Name LIKE ? OR DOB LIKE ? OR Mobile_No LIKE ? OR Address LIKE ? ORDER BY ${colName || 'ID'} ${sortMethod || "desc"} LIMIT ? OFFSET ?`, [`%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, `%${fetchStudent || ""}%`, intdataNo, calc]);
    console.log(data);
    return data;
});
const total = (fetchStudent) => __awaiter(void 0, void 0, void 0, function* () {
    const [totalPage] = yield db_1.default.query(`SELECT COUNT(ID) as count FROM registration_form WHERE First_Name like '%${fetchStudent || ""}%' OR Last_Name like '%${fetchStudent || ""}%' OR DOB like '%${fetchStudent || ""}%' OR Mobile_No like '%${fetchStudent || ""}%' OR Address like '%${fetchStudent || ""}%'`);
    const [{ count }] = totalPage;
    return count;
});
const checkId = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(studentId);
    const [data] = yield db_1.default.query(`SELECT * from registration_form WHERE ID = ? `, [studentId]);
    return [data];
});
exports.default = { insertStudent, delStudent, updateStudent, pagination, total, checkId };
//# sourceMappingURL=queries.js.map