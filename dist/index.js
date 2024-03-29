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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const routes = require('./src/routes/Routes');
const PORT = 3003;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
    optionsSuccessStatus: 200
}));
// mongoose.connect(
//     'mongodb+srv://animesh-dey98:99YMUC4CD06Inl2W@cluster0.vhmqo.mongodb.net/experiments',
// )
//     .then(resolve => { console.log("MongoDB Connected") })
//     .catch(reject => { console.error("MongoDB Connection Failed") })
app.use('/', routes);
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const packageJsonPath = path_1.default.join(__dirname, 'package.json').replace('dist/', '');
    const packageJsonData = fs_1.default.readFileSync(packageJsonPath, 'utf8');
    const { version } = JSON.parse(packageJsonData);
    res.send({ success: true, status: "Live", listeningPort: PORT, project: "testing", version });
}));
app.listen(PORT, () => {
    console.log(`Server is Listning on Port: ${PORT}`);
});
//https://tan-fierce-dolphin.cyclic.cloud/
