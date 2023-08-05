import express from 'express'
import { createFunction, evalFunction, testing } from '../contollers/TestingController'
const router = express.Router()


router.post('/test/url', testing)
router.post('/create_function', createFunction)
router.post('/eval_function', evalFunction)


module.exports = router