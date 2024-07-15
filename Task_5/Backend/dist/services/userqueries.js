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
exports.checkAccount = exports.obtainUser = exports.addUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const addUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.query(`INSERT INTO user_table (name, email, password) VALUES (?,?,?)`, [name, email, password]);
});
exports.addUser = addUser;
const obtainUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(`SELECT * FROM user_table WHERE email=? and password=?`, [email, password]);
    return data;
});
exports.obtainUser = obtainUser;
const checkAccount = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(`SELECT * FROM user_table WHERE email=?`, [email]);
    return data;
});
exports.checkAccount = checkAccount;
