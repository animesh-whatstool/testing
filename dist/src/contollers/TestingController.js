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
exports.fbAdschatBotQualifiedWebhook = exports.evalFunction = exports.createFunction = exports.testing = void 0;
const General_1 = __importDefault(require("../models/General"));
const axios_1 = __importDefault(require("axios"));
const testing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).send({
            "type": "text",
            "text": {
                "body": `Congratulations🎉🎉🎉! Your slot has been booked. \n Service Name- ${"sName"}\n Booked Date- ${"bDate"}\n Booked Time- ${"bTime"}\n Address- ${"bAdd"}`
            }
        });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.testing = testing;
const createFunction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saveData = {
            name: req.body.name,
            code: req.body.code
        };
        const cloud_function = yield General_1.default.create(saveData);
        return res.status(200).send({ status: true, message: 'success', data: cloud_function });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.createFunction = createFunction;
const evalFunction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            name: req.body.name,
            param_1: req.body.param_1,
            param_2: req.body.param_2,
        };
        const func = yield General_1.default.findOne({ name: data.name });
        const userDefinedFunction = eval(`(${func.code})`);
        const sum = userDefinedFunction(data.param_1, data.param_2);
        return res.status(200).send({ status: true, message: 'success', data: sum });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.evalFunction = evalFunction;
const fbAdschatBotQualifiedWebhook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default.post('https://whatstool-new-testing.de.r.appspot.com/webhook/v1/fb_ads_chatbot_qualified', { mobile: req.body.data.contact.mobile })
            .then(res => console.log(res.data))
            .catch(err => console.error(err.message));
        return next({ success: true });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.fbAdschatBotQualifiedWebhook = fbAdschatBotQualifiedWebhook;
