const express = require('express')
const router = express.Router()

const adminController = require("../controllers/adminController")
const foodController = require("../controllers/foodController")
const verificationAdmin = require("../middleware/verificationAdmin")

router.get('/', verificationAdmin, adminController.index)
router.get('/showNutrition', verificationAdmin, adminController.showNutrition)
router.post('/show', verificationAdmin, adminController.show)
router.post('/store', verificationAdmin, adminController.store)
router.post('/update', verificationAdmin, adminController.update)
router.post('/storeNutrition', verificationAdmin, adminController.storeNutrition)
router.post('/createFood', verificationAdmin, adminController.createFood)
router.get('/getFood', verificationAdmin, foodController.getFood)
router.post('/addNutritionToFood', verificationAdmin, adminController.addNutritionToFood)
router.delete('/deleteFood/:foodID', verificationAdmin, adminController.deleteFoodByID)
router.delete('/delete', verificationAdmin, adminController.remove)



module.exports = router