import express from 'express'
import { testing } from '../contollers/TestingController'
const router = express.Router()


router.post('/test/url', testing)


module.exports = router