"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyToken(req, res, next) {
    const new_user = {
        email: '',
        password: ''
    };
    const secret = process.env.secret || '';
    const token = req.cookies['authorization'];
    console.log('Cookies:', req.cookies);
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "token Not Found"
        });
    }
    else {
        try {
            const p_token = jsonwebtoken_1.default.verify(token, secret);
            req.body.p_token = p_token;
            next();
        }
        catch (error) {
            return res.status(403).send({
                success: false,
                message: "token is not Valid"
            });
        }
    }
}
exports.verifyToken = verifyToken;
