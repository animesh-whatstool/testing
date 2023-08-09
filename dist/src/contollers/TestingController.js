"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.fbAdschatBotQualifiedAppointmentWebhook = exports.fbAdschatBotQualifiedWebhook = exports.evalFunction = exports.createFunction = exports.testing = void 0;
const General_1 = __importDefault(require("../models/General"));
const axios_1 = __importDefault(require("axios"));
const momentTz = __importStar(require("moment-timezone"));
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
        axios_1.default.post('https://whatstool-new-testing.de.r.appspot.com/webhook/v1/fb_ads_chatbot_qualified', {
            mobile: req.body.mobile,
        })
            .then(res => console.log(res.data))
            .catch(err => console.error(err.message));
        return res.status(200).send({ status: true, message: 'success', data: true });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.fbAdschatBotQualifiedWebhook = fbAdschatBotQualifiedWebhook;
const fbAdschatBotQualifiedAppointmentWebhook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = momentTz.tz('Asia/Kolkata');
        const tomorrowDate = currentDate.clone().add(1, 'day');
        const tomorrow = tomorrowDate.format('ddd MMM DD YYYY');
        const tz = ':00:00 GMT+0530 (IST)';
        const time_map = {
            "10.00 - 11.00 AM": { start: `${tomorrow} 10${tz}`, end: `${tomorrow} 11${tz}` },
            "11.00 - 12.00 PM": { start: `${tomorrow} 11${tz}`, end: `${tomorrow} 12${tz}` },
            "12.00 - 01.00 PM": { start: `${tomorrow} 12${tz}`, end: `${tomorrow} 13${tz}` },
            "01.00 - 02.00 PM": { start: `${tomorrow} 13${tz}`, end: `${tomorrow} 14${tz}` },
            "02.00 - 03.00 PM": { start: `${tomorrow} 14${tz}`, end: `${tomorrow} 15${tz}` },
            "03.00 - 04.00 PM": { start: `${tomorrow} 15${tz}`, end: `${tomorrow} 16${tz}` },
            "04.00 - 05.00 PM": { start: `${tomorrow} 16${tz}`, end: `${tomorrow} 17${tz}` },
            "05.00 - 06.00 PM": { start: `${tomorrow} 17${tz}`, end: `${tomorrow} 18${tz}` },
            "06.00 - 07.00 PM": { start: `${tomorrow} 18${tz}`, end: `${tomorrow} 19${tz}` }
        };
        const params = {
            time_slot: time_map[req.body.time_slot],
            mobile: req.body.mobile,
            fs_contact_id: req.body.fs_contact_id
        };
        if (!params.time_slot) {
            return res.status(400).send({ status: false, message: `Invalid time slot : ${req.body.time_slot}` });
        }
        axios_1.default.post('https://whatstool-new-testing.de.r.appspot.com/webhook/v1/fb_ads_create_meeting', {
            mobile: params.mobile,
            fs_contact_id: params.fs_contact_id,
            from_date: params.time_slot.start,
            end_date: params.time_slot.end
        })
            .then(res => console.log(res.data))
            .catch(err => console.error(err.message));
        console.log({
            mobile: params.mobile,
            from_date: params.time_slot.start,
            end_date: params.time_slot.end
        });
        return res.status(200).send({ status: true, message: 'success', data: true });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
});
exports.fbAdschatBotQualifiedAppointmentWebhook = fbAdschatBotQualifiedAppointmentWebhook;
