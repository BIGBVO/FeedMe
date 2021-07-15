const express = require("express")
const router = express.Router()
const app = express()

const foodController = require("../controllers/foodController")
const verificationUser = require("../middleware/verification")
const verificationAdmin = require("../middleware/verificationAdmin")

//no middleware? how can we secure the api calls then? - commented by Hao
router.get("/", verificationUser, foodController.getFood)
router.get("/getFoodIcon/:uniqueID", verificationUser, foodController.getIcon)
router.get("/showFood/:barcode", verificationUser, foodController.getFoodByBarcode)


module.exports = router
