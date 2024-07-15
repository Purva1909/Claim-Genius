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
exports.logout = exports.login = exports.signup = void 0;
const userqueries_1 = require("../services/userqueries");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        console.log({ name, email, password });
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const data = yield (0, userqueries_1.checkAccount)(email);
        if (data.length) {
            return res.status(400).send({
                success: false,
                message: "Account exist already",
            });
        }
        yield (0, userqueries_1.addUser)(name, email, password);
        return res.status(201).send({
            success: true,
            message: 'New account created',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in sign up API',
            error
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const data = yield (0, userqueries_1.obtainUser)(email, password);
        console.log(data);
        if (data.length) {
            const data1 = data[0];
            setUserID(data1.userID);
            const secret = process.env.secret || ' ';
            console.log('secret: ', secret);
            jsonwebtoken_1.default.sign({ data1 }, secret, { expiresIn: '1h' }, (err, token) => {
                res.cookie("authorization", token, {
                    httpOnly: true,
                });
                return res.status(200).json({
                    success: true,
                    message: 'Successfully login',
                    token
                });
            });
        }
        else {
            res.clearCookie("authorization");
            return res.status(200).json({
                success: false,
                message: 'Login unsuccessfull',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in login API',
            error
        });
    }
});
exports.login = login;
function setUserID(userID) {
    const file_user_id = userID;
}
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("authorization");
        res.status(200).send({
            success: true,
            message: "Logged Out Successfuly"
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in logout"
        });
    }
});
exports.logout = logout;
