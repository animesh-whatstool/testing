import express from 'express'
import { createFunction, evalFunction, fbAdschatBotQualifiedWebhook, testing } from '../contollers/TestingController'
const router = express.Router()


router.post('/test/url', testing)
router.post('/create_function', createFunction)
router.post('/eval_function', evalFunction)
router.post('/chatbot_qualified', fbAdschatBotQualifiedWebhook)


module.exports = router