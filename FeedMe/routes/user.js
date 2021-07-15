const express = require('express')
const router = express.Router()

const userController = require("../controllers/userController")
const verification = require("../middleware/verification")
const preverification = require("../middleware/preverification")

router.get('/profile', verification, userController.showProfile)
router.get('/profile/add', verification, userController.updatePreferences)
router.post('/reset', preverification, userController.updatePassword)
router.post('/add_nutrition', verification, userController.addNutrition)
router.post('/remove_nutrition', verification, userController.removeNutrition)
router.get('/list_nutrition', verification, userController.listNutritionID)
router.post('/updatePhone', preverification, userController.updatePhoneNo)
router.post('/updateEmail', verification, userController.updateEmail)

module.exports = router
