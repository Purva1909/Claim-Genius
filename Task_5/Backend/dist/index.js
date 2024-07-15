"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const studentRoute_1 = __importDefault(require("./routes/studentRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cookieParser = require("cookie-parser");
const path = require('path');
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 7070;
app.use(express_1.default.json());
app.use(cookieParser());
app.use('/image', express_1.default.static(path.join(__dirname, '../src/', 'image')));
app.use('/student', studentRoute_1.default);
app.use('/user', userRoute_1.default);
app.get('/test', (req, res) => {
    res.status(200).send('<h1> Mysql APP </h1>');
});
db_1.default.query('SELECT 1').then(() => {
    console.log('My sql db connected');
    app.listen(PORT, () => {
        console.log(`Server Running  on port ${PORT}`);
        console.log(path.join(__dirname, '../src/', 'image'));
    });
})
    .catch((error) => {
    console.log(error);
});
