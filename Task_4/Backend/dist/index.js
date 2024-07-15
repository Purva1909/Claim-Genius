"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const studentRoute_1 = __importDefault(require("./routes/studentRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 7070;
app.use(express_1.default.json());
app.use('/student', studentRoute_1.default);
app.get('/test', (req, res) => {
    res.status(200).send('<h1> Mysql APP </h1>');
});
db_1.default.query('SELECT 1').then(() => {
    console.log('My sql db connected');
    app.listen(PORT, () => {
        console.log(`Server Running  on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map