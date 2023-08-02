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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testing = void 0;
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
        return res.send(500).send({ status: false, message: error.message });
    }
});
exports.testing = testing;
