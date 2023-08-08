"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestingController_1 = require("../contollers/TestingController");
const router = express_1.default.Router();
router.post('/test/url', TestingController_1.testing);
router.post('/create_function', TestingController_1.createFunction);
router.post('/eval_function', TestingController_1.evalFunction);
router.post('/chatbot_qualified', TestingController_1.fbAdschatBotQualifiedWebhook);
module.exports = router;
