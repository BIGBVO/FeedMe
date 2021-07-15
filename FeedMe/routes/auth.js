const express = require('express')
const authContoller = require('../controllers/authController')
const router = express.Router()

const preverification = require("../middleware/preverification")
const phoneVerification = require("../middleware/phoneVerification")


router.post('/register', preverification, authContoller.register)
router.post('/login', authContoller.login)
router.post('/verify', authContoller.verify)
router.post('/check', phoneVerification, authContoller.check)
router.post('/cancel', authContoller.cancel)





module.exports = router