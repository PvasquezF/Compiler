"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express_1.default.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
// Route files
const index = require('./Routes/index');
const traduccion = require('./Routes/traduccion');
// Mount routers
app.use('/traduccion', traduccion);
app.use('/', index);
app.listen(Number(port), _ => {
    return console.log(`server is listening on ${port}`);
});
