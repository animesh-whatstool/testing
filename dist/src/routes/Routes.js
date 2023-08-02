"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestingController_1 = require("../contollers/TestingController");
const router = express_1.default.Router();
router.post('/test/url', TestingController_1.testing);
module.exports = router;
