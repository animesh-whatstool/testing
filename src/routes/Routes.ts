import express from 'express'
import { createFunction, evalFunction, fbAdschatBotQualifiedAppointmentWebhook, fbAdschatBotQualifiedWebhook, testing } from '../contollers/TestingController'
const router = express.Router()


router.post('/test/url', testing)
router.post('/create_function', createFunction)
router.post('/eval_function', evalFunction)
router.post('/chatbot_qualified_crm_update', fbAdschatBotQualifiedWebhook)
router.post('/chatbot_qualified_crm_appointment', fbAdschatBotQualifiedAppointmentWebhook)


module.exports = router